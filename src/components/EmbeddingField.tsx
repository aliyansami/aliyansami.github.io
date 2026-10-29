import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A small picture of retrieval: a few thousand "chunks" sit in clusters in an
 * embedding space, a query drifts through it, and its k nearest neighbours are
 * linked and highlighted every frame.
 */

const CLUSTERS = 7;
const PER_CLUSTER = 240;
const K = 6;

function gaussian(rand: () => number) {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Seeded so the layout is the same on every visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function readColor(name: string) {
  return new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
}

const vertex = /* glsl */ `
  attribute float aHit;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vHit;
  varying float vDepth;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vHit = aHit;
    vDepth = clamp((-mv.z - 4.0) / 8.0, 0.0, 1.0);
    gl_PointSize = uSize * uPixelRatio * (1.0 + aHit * 2.2) * (9.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vHit;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.38, d);
    vec3 color = mix(uInk, uAccent, vHit);
    float alpha = edge * mix(0.55 - vDepth * 0.35, 1.0, vHit);
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function EmbeddingField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = mulberry32(7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    const group = new THREE.Group();
    scene.add(group);

    // Points
    const count = CLUSTERS * PER_CLUSTER;
    const positions = new Float32Array(count * 3);
    const hits = new Float32Array(count);
    for (let c = 0; c < CLUSTERS; c++) {
      const center = new THREE.Vector3(gaussian(rand), gaussian(rand), gaussian(rand))
        .normalize()
        .multiplyScalar(1.8 + rand() * 0.7);
      const spread = 0.35 + rand() * 0.3;
      for (let i = 0; i < PER_CLUSTER; i++) {
        const idx = (c * PER_CLUSTER + i) * 3;
        positions[idx] = center.x + gaussian(rand) * spread;
        positions[idx + 1] = center.y + gaussian(rand) * spread;
        positions[idx + 2] = center.z + gaussian(rand) * spread;
      }
    }
    // Recentre so the cloud rotates around its own middle
    const centroid = [0, 0, 0];
    for (let i = 0; i < count * 3; i++) centroid[i % 3] += positions[i] / count;
    for (let i = 0; i < count * 3; i++) positions[i] -= centroid[i % 3];

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const hitAttr = new THREE.BufferAttribute(hits, 1);
    hitAttr.setUsage(THREE.DynamicDrawUsage);
    pointsGeo.setAttribute("aHit", hitAttr);

    const uniforms = {
      uSize: { value: 2.8 },
      uPixelRatio: { value: pixelRatio },
      uInk: { value: readColor("--ink") },
      uAccent: { value: readColor("--accent") },
    };
    const pointsMat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    group.add(new THREE.Points(pointsGeo, pointsMat));

    // Query marker and links to its neighbours
    const queryMat = new THREE.MeshBasicMaterial({ color: uniforms.uAccent.value });
    const query = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 20), queryMat);
    group.add(query);

    const ringMat = new THREE.MeshBasicMaterial({
      color: uniforms.uAccent.value,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.175, 48), ringMat);
    group.add(ring);

    const linePositions = new Float32Array(K * 6);
    const lineGeo = new THREE.BufferGeometry();
    const lineAttr = new THREE.BufferAttribute(linePositions, 3);
    lineAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute("position", lineAttr);
    const lineMat = new THREE.LineBasicMaterial({
      color: uniforms.uAccent.value,
      transparent: true,
      opacity: 0.7,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    const nearest = new Int32Array(K);
    const nearestDist = new Float32Array(K);
    const queryPos = new THREE.Vector3();

    function updateNeighbours() {
      nearestDist.fill(Infinity);
      nearest.fill(-1);
      for (let i = 0; i < count; i++) {
        const dx = positions[i * 3] - queryPos.x;
        const dy = positions[i * 3 + 1] - queryPos.y;
        const dz = positions[i * 3 + 2] - queryPos.z;
        const d = dx * dx + dy * dy + dz * dz;
        if (d >= nearestDist[K - 1]) continue;
        let j = K - 1;
        while (j > 0 && nearestDist[j - 1] > d) {
          nearestDist[j] = nearestDist[j - 1];
          nearest[j] = nearest[j - 1];
          j--;
        }
        nearestDist[j] = d;
        nearest[j] = i;
      }
      for (let i = 0; i < count; i++) hits[i] *= 0.9;
      for (let j = 0; j < K; j++) {
        const i = nearest[j];
        hits[i] = 1;
        linePositions.set([queryPos.x, queryPos.y, queryPos.z], j * 6);
        linePositions.set([positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]], j * 6 + 3);
      }
      hitAttr.needsUpdate = true;
      lineAttr.needsUpdate = true;
    }

    // The query wanders slowly through the clusters
    function placeQuery(t: number) {
      queryPos.set(
        Math.sin(t * 0.21) * 2.1,
        Math.sin(t * 0.33 + 1.2) * 1.6,
        Math.cos(t * 0.17) * 2.0,
      );
      query.position.copy(queryPos);
      ring.position.copy(queryPos);
      ring.quaternion.copy(camera.quaternion);
      updateNeighbours();
    }

    let raf = 0;
    let running = false;
    let visible = true;
    const clock = new THREE.Clock();
    let elapsed = 12;

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    function resize() {
      const { width, height } = mount!.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width / height < 1 ? 12.5 : 10;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) renderer.render(scene, camera);
    });
    ro.observe(mount);
    resize();

    // Follow the page's light/dark scheme
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      uniforms.uInk.value = readColor("--ink");
      uniforms.uAccent.value = readColor("--accent");
      queryMat.color.copy(uniforms.uAccent.value);
      ringMat.color.copy(uniforms.uAccent.value);
      lineMat.color.copy(uniforms.uAccent.value);
      if (!running) renderer.render(scene, camera);
    };
    scheme.addEventListener("change", onScheme);

    function frame() {
      raf = requestAnimationFrame(frame);
      elapsed += Math.min(clock.getDelta(), 0.05);
      group.rotation.y = elapsed * 0.04 + pointer.x * 0.25;
      group.rotation.x = -0.15 + pointer.y * 0.15;
      placeQuery(elapsed);
      renderer.render(scene, camera);
    }

    function start() {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      clock.getDelta();
      frame();
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(mount);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    group.rotation.set(-0.15, elapsed * 0.04, 0);
    placeQuery(elapsed);
    renderer.render(scene, camera);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      scheme.removeEventListener("change", onScheme);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      pointsGeo.dispose();
      pointsMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      query.geometry.dispose();
      queryMat.dispose();
      ring.geometry.dispose();
      ringMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="field" aria-hidden="true" />;
}
