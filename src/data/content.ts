export const profile = {
  name: "Aliyan Sami",
  role: "Software Engineer — AI products & backend systems",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  email: "itsaliyansami@gmail.com",
  github: "https://github.com/aliyansami",
  linkedin: "https://www.linkedin.com/in/aliyan-sami-748364215/",
  intro:
    "I build LLM features grounded in real data, and the Django services, queues and payment flows that keep them running in production.",
  about: [
    "I've spent about three years shipping production systems, first at TKXEL on a marketplace and payments platform, and now at Appifest, where I own AI features end to end across three client products at once.",
    "Most of my work sits where models meet software that has to be reliable: retrieval pipelines that keep answers on-source, long-running generation jobs that survive retries, and APIs that log what every call costs.",
  ],
};

export type Project = {
  name: string;
  kind: string;
  year: string;
  context: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "BlueRock",
    kind: "AI tutor for real-estate exam prep",
    year: "2026",
    context: "Appifest",
    summary:
      "A tutor for the BC real-estate licensing exam that answers from the approved curriculum only, not from whatever the model happens to remember.",
    points: [
      "RAG over chunked curriculum content using text-embedding-3-small and vector similarity search, grounding multi-turn conversations.",
      "Guardrails that keep answers on-source and decline off-topic or unsupported questions.",
      "A single AI gateway with structured JSON outputs, token-usage logging and observability hooks for cost and behaviour.",
      "Quiz analytics and explanation rewriting on top of the same retrieval layer.",
    ],
    stack: ["Django", "React", "OpenAI", "Embeddings", "Vector search"],
  },
  {
    name: "GenieVid AI",
    kind: "Short-form video generation",
    year: "2026",
    context: "Appifest",
    summary:
      "Type a topic, get back a rendered vertical short: script, scene art, narration, word-synced captions and music.",
    points: [
      "Async Celery/Redis pipeline for script and image generation, ElevenLabs voiceover and Remotion rendering.",
      "Frame-accurate Remotion compositions, FFmpeg media tooling and Cloudflare R2 delivery for videos and thumbnails.",
      "Per-generation cost budgeting, moderation-aware image retries and IP-safe prompting.",
      "Multi-step creation UI with art-style and caption presets, live progress and playback.",
    ],
    stack: ["React", "Django", "Celery", "Redis", "Remotion", "ElevenLabs"],
  },
  {
    name: "MyStoryStar",
    kind: "Personalised illustrated stories",
    year: "2026",
    context: "Appifest",
    summary:
      "Generates personalised stories with matching illustrations, orchestrated as serverless workflows with GPU inference behind them.",
    points: [
      "LLM story generation, scene planning and downstream media prompts using OpenAI, AWS Lambda and Step Functions.",
      "Error handling, idempotent webhooks and real-time status callbacks for long-running generation jobs.",
      "Containerised GPU inference on RunPod for image and video generation, with Docker Compose for local end-to-end runs.",
      "Django REST API covering auth, orders and cloud storage.",
    ],
    stack: ["Django REST", "OpenAI", "AWS Lambda", "Step Functions", "Docker", "RunPod"],
  },
  {
    name: "Football Card",
    kind: "Collectibles marketplace & payments",
    year: "2024–25",
    context: "TKXEL",
    summary:
      "A buyer–seller marketplace where money, disputes and messaging all had to be right the first time.",
    points: [
      "Stripe PaymentIntent flows end to end: webhook updates, refunds, payout onboarding and duplicate-event safeguards.",
      "Escrow-aware orders and disputes with admin-controlled refunds and seller fund release.",
      "Wallet and ledger APIs for top-ups, withdrawals, balances and history on PostgreSQL.",
      "Firebase real-time messaging between buyers, sellers and admins, and market analytics refreshed by scheduled Celery jobs.",
    ],
    stack: ["Django", "PostgreSQL", "Stripe", "Firebase", "Celery"],
  },
];

export type Role = {
  title: string;
  org: string;
  place: string;
  period: string;
  note: string;
};

export const roles: Role[] = [
  {
    title: "Software Engineer",
    org: "Appifest",
    place: "Remote, Australia",
    period: "Feb 2026 — now",
    note: "AI product features end to end across BlueRock, MyStoryStar and GenieVid AI.",
  },
  {
    title: "Associate Software Engineer",
    org: "TKXEL",
    place: "Lahore, Pakistan",
    period: "Jan 2024 — Jan 2026",
    note: "Payments, escrow, wallets and real-time messaging for Football Card. Part-time during my final semester, full-time from June 2024.",
  },
  {
    title: "BS Computer Science",
    org: "FAST NUCES",
    place: "Lahore, Pakistan",
    period: "2020 — 2024",
    note: "",
  },
];

export const capabilities: { label: string; items: string[] }[] = [
  {
    label: "AI / LLM",
    items: ["OpenAI APIs", "RAG & embeddings", "Vector search", "Structured outputs", "Guardrails", "Cost & usage tracking"],
  },
  {
    label: "Backend",
    items: ["Python", "Django & DRF", "Celery & Redis", "Webhooks", "Stripe", "JWT / RBAC"],
  },
  {
    label: "Data & cloud",
    items: ["PostgreSQL", "Firebase / Firestore", "AWS Lambda", "Step Functions", "Docker", "RunPod"],
  },
  {
    label: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Remotion"],
  },
];
