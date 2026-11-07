export const profile = {
  name: "Aliyan Sami",
  role: "Software Engineer · Websites, online stores & AI",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  email: "itsaliyansami@gmail.com",
  github: "https://github.com/aliyansami",
  linkedin: "https://www.linkedin.com/in/aliyan-sami-748364215/",
  photo: "aliyan.jpg",
  intro:
    "I build websites, online stores and AI features for businesses in Australia, the UK, Europe and the US, and the reliable backend systems behind them.",
  about: [
    "Hi, I'm Aliyan. I'm a software engineer with about three years of experience building production systems. I studied Computer Science at FAST NUCES, worked two years at TKXEL on a marketplace that handled real payments, and now work with Appifest, an Australian agency, on AI products for their clients.",
    "Alongside that, I build websites and online stores for small businesses: clinics, practices and independent shops that want to be found online and take bookings or orders without hassle.",
    "I'm a real person you can talk to. Before you pay anything, I'm happy to jump on a video call, show you a free mock-up of your site, and answer every question.",
  ],
};

export const trust: { title: string; text: string }[] = [
  {
    title: "See it before you pay",
    text: "You get a free mock-up of your homepage first. If you don't like it, you owe nothing.",
  },
  {
    title: "Pay in stages, not up front",
    text: "A deposit only after you approve the design, the rest when the site is live and you're happy with it. Every payment comes with a proper invoice.",
  },
  {
    title: "You own everything",
    text: "Your domain, hosting account, content and code are in your name. You're never locked in to me.",
  },
  {
    title: "Verifiable, not anonymous",
    text: "Real name, real face, a public LinkedIn and GitHub, and three years of shipped work you can check below.",
  },
  {
    title: "Clear communication",
    text: "Replies within one working day, progress updates through the build, and video calls whenever you want them.",
  },
  {
    title: "Support after launch",
    text: "30 days of free fixes and small changes after go-live, then optional monthly care if you want it.",
  },
];

export const services: { title: string; for: string; points: string[] }[] = [
  {
    title: "Websites for clinics & health practices",
    for: "Dentists, physios, GPs, chiropractors, vets, therapists",
    points: [
      "Services, team, opening hours and location on a fast, mobile-friendly site",
      "Online booking or enquiry button connected to your existing system",
      "Your Google reviews and Google Business profile linked in",
      "Set up so patients can find you when they search locally",
    ],
  },
  {
    title: "Online stores for shops & brands",
    for: "Boutiques, gift shops, bakeries, beauty and wellness brands",
    points: [
      "Shopify or WooCommerce store with your products, payments and shipping",
      "Click-and-collect or local delivery options",
      "Linked to your Instagram and Facebook so posts can drive sales",
      "A simple dashboard you can run yourself, with training included",
    ],
  },
  {
    title: "AI features & custom software",
    for: "Startups and teams building a product",
    points: [
      "AI chatbots and assistants that answer from your own documents",
      "Django / React web apps, APIs and admin dashboards",
      "Stripe payments, subscriptions and automated workflows",
    ],
  },
];

export const process: { step: string; text: string }[] = [
  { step: "Free 15-min call", text: "Tell me about your business and what you need. No obligation." },
  { step: "Free mock-up", text: "Within 48 hours I send a design of your homepage." },
  { step: "Build", text: "Once you approve it, I build the full site and keep you updated." },
  { step: "Launch & support", text: "We go live together, and you get 30 days of free tweaks." },
];

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
