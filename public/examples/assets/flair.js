// Shared interactions for the "after" demo pages. Everything here is cosmetic: nothing is
// sent anywhere, and the pages work without it.
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Reveal-on-scroll: mark what's already on screen first, then hide the rest until it scrolls in.
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" })
  : null;
if (io) {
  $$("[data-reveal]").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add("in"); else io.observe(el);
  });
  document.documentElement.classList.add("reveal-ready");
}

// Single-choice pickers (chips, days, slots, pets, palettes)
$$("[data-pick]").forEach((group) => {
  group.addEventListener("click", (e) => {
    const item = e.target.closest("button");
    if (!item || item.disabled || !group.contains(item)) return;
    $$("button", group).forEach((b) => { b.classList.toggle("on", b === item); b.setAttribute("aria-pressed", String(b === item)); });
    group.dispatchEvent(new CustomEvent("pick", { detail: item, bubbles: true }));
  });
});

// Live summary text for booking widgets: <x data-summary="#days,#slots">
$$("[data-summary]").forEach((out) => {
  const groups = out.dataset.summary.split(",").map((s) => document.querySelector(s));
  const update = () => { out.textContent = groups.map((g) => g?.querySelector(".on")?.dataset.label || "").filter(Boolean).join(", "); };
  groups.forEach((g) => g?.addEventListener("pick", update));
  update();
});

// "Open now" badge from data-hours="mon-fri 8:30-17:30; sat 9-13" (visitor's local time)
$$("[data-hours]").forEach((el) => {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const now = new Date(), d = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
  const toMin = (t) => { const [h, m = 0] = t.split(":").map(Number); return h * 60 + m; };
  let open = false;
  el.dataset.hours.split(";").forEach((rule) => {
    const [range, time] = rule.trim().split(" ");
    const [a, b = a] = range.split("-").map((x) => days.indexOf(x));
    const inDays = a <= b ? d >= a && d <= b : d >= a || d <= b;
    const [s, e] = time.split("-").map(toMin);
    if (inDays && mins >= s && mins < e) open = true;
  });
  el.classList.add(open ? "is-open" : "is-closed");
  el.querySelector("[data-hours-text]").textContent = open ? "Open now" : "Closed now · book online anytime";
});

// Same-day delivery countdown to a cut-off hour: <x data-cutoff="13">
$$("[data-cutoff]").forEach((el) => {
  const tick = () => {
    const now = new Date(), cut = new Date(now); cut.setHours(+el.dataset.cutoff, 0, 0, 0);
    const left = cut - now;
    if (left <= 0) { el.textContent = "Order now for delivery tomorrow morning"; return; }
    const h = Math.floor(left / 3.6e6), m = Math.floor((left % 3.6e6) / 6e4);
    el.textContent = `Order in ${h ? h + "h " : ""}${m}m for delivery today`;
  };
  tick(); setInterval(tick, 30_000);
});

// Basket counter + toast for shop demos
const count = document.querySelector("[data-cart-count]");
const toast = document.querySelector(".toast");
let n = 0, toastTimer;
$$("[data-add]").forEach((btn) => btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (count) { count.textContent = ++n; count.parentElement.classList.remove("bump"); void count.offsetWidth; count.parentElement.classList.add("bump"); }
  if (toast) {
    toast.textContent = `${btn.dataset.add} added to basket (demo)`;
    toast.classList.add("show"); clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }
}));

// Demo forms never send
$$("form[data-demo]").forEach((form) => form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = form.querySelector("[role=status]");
  if (msg) msg.textContent = "Demo only: this sample form doesn't send anything.";
}));

// Gentle pointer tilt on elements with data-tilt (desktop, motion allowed)
if (matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) {
  $$("[data-tilt]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
}
