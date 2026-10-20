export const profile = {
  name: "Aliyan Sami",
  role: "Backend & AI Engineer",
  tagline: "I build AI-powered products — from robust Django backends to GPU-driven generative image pipelines.",
  location: "Pakistan · Working remotely",
  email: "itsaliyansami@gmail.com",
  github: "https://github.com/Steog83",
  resumeNote: "Open to backend, AI/ML engineering & platform roles.",
  summary:
    "I'm a software engineer focused on the backend and applied AI. I design APIs and distributed workflows that stay reliable under load, and I build generative-image systems that turn research models into real product features. Lately I've been deep in orchestrating serverless GPU pipelines, fine-tuning diffusion models, and shipping identity-preserving image generation at scale.",
};

export const stats = [
  { value: "20+", label: "Production services shipped" },
  { value: "3", label: "AI story products built" },
  { value: "5+", label: "AWS services in production" },
  { value: "∞", label: "Coffees debugged through" },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "SQL", "Bash"],
  },
  {
    group: "Backend",
    items: ["Django", "Django REST Framework", "FastAPI patterns", "JWT / RBAC", "Gunicorn", "REST API design"],
  },
  {
    group: "AI / ML",
    items: ["FLUX", "Stable Diffusion", "LoRA fine-tuning", "Diffusers", "Identity preservation", "Prompt engineering", "fal.ai"],
  },
  {
    group: "Cloud & Infra",
    items: ["AWS S3", "AWS SQS", "AWS Lambda", "Step Functions", "RunPod GPU", "Docker", "CI/CD"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "Supabase", "Redis patterns", "S3 object storage"],
  },
];

export type Project = {
  title: string;
  blurb: string;
  description: string;
  tags: string[];
  highlights: string[];
  accent: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "MyStoryStars",
    blurb: "AI platform that turns a photo into a personalized, illustrated story.",
    description:
      "A production backend that generates fully personalized children's, love, and memorial stories. It orchestrates text and image generation through AWS Step Functions, processes work asynchronously via SQS workers, and renders characters with identity-preserving generative image pipelines.",
    tags: ["Django", "AWS Step Functions", "SQS", "RunPod", "FLUX", "PostgreSQL"],
    highlights: [
      "Designed a multi-stage Step Functions workflow coordinating story, image, and video generation",
      "Built SQS-driven background workers for reliable, retryable long-running AI jobs",
      "Shipped three distinct story products: MyChildStars, MyHeartStars, MyMemoryStars",
    ],
    accent: "#6366f1",
    featured: true,
  },
  {
    title: "Identity-Preserving Image Pipeline",
    blurb: "Serverless GPU image generation with face & identity preservation.",
    description:
      "A RunPod-hosted FLUX pipeline that generates stylized, on-model characters from reference photos. It combines soft face-swap, identity attribute extraction, and head blending so generated subjects stay recognizably themselves across scenes.",
    tags: ["FLUX", "RunPod", "Diffusers", "Docker", "CUDA", "PyTorch"],
    highlights: [
      "Engineered identity preservation via face-swap + attribute extraction + head blending",
      "Containerized a CUDA/PyTorch worker for serverless GPU inference on RunPod",
      "Tuned negative prompts & constraints to lock gender, hair, and likeness consistency",
    ],
    accent: "#22d3ee",
    featured: true,
  },
  {
    title: "LoRA Fine-Tuning Service",
    blurb: "On-demand LoRA training to personalize diffusion models per subject.",
    description:
      "A training + runtime service that fine-tunes LoRA adapters so the image model learns a specific person or character, then loads those adapters at inference time for sharper, more faithful personalization.",
    tags: ["LoRA", "Fine-tuning", "FLUX", "Python", "RunPod"],
    highlights: [
      "Built the train → validate → serve loop for per-subject LoRA adapters",
      "Added LoRA validation to catch bad training runs before they reach production",
      "Integrated adapters into the live generation runtime with minimal cold-start cost",
    ],
    accent: "#a855f7",
  },
  {
    title: "Secure API & Auth Platform",
    blurb: "JWT auth, RBAC middleware, and pre-signed S3 uploads.",
    description:
      "The platform layer behind the product: JWT authentication middleware with role-based access control, subscription management, and secure direct-to-S3 uploads using pre-signed URLs.",
    tags: ["Django", "JWT", "RBAC", "AWS S3", "drf-spectacular"],
    highlights: [
      "Implemented JWT middleware with role-based route protection",
      "Secured file uploads with pre-signed URLs instead of proxying through the API",
      "Documented the API surface with OpenAPI / Swagger",
    ],
    accent: "#f59e0b",
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Backend & AI Engineer",
    org: "Appifest",
    period: "Present",
    points: [
      "Lead backend engineer on MyStoryStars, an AI product generating personalized illustrated stories.",
      "Architected serverless GPU image-generation pipelines (RunPod + FLUX) with identity preservation.",
      "Built distributed AWS workflows using Step Functions, SQS workers, and Lambda for AI job orchestration.",
      "Owned API design, authentication, and cloud storage across the platform.",
    ],
  },
  {
    role: "Software Engineer",
    org: "Independent / Open Source",
    period: "Ongoing",
    points: [
      "Prototype and ship generative-AI tooling, from fine-tuning scripts to inference services.",
      "Explore the frontier of diffusion models, LoRA training, and production ML infrastructure.",
    ],
  },
];
