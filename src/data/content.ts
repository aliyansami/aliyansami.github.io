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
  slug: string;
  name: string;
  kind: string;
  year: string;
  context: string;
  summary: string;
  points: string[];
  stack: string[];
  /** Screenshot count in public/work/<slug>/, named 1.jpg, 2.jpg, ... */
  shots: number;
  tint: string;
};

export const projects: Project[] = [
  {
    slug: "folio",
    name: "Folio",
    kind: "AI document Q&A for teams",
    year: "2026",
    context: "Own product",
    summary:
      "Upload your policies, contracts and manuals, ask questions in plain English, and get answers that cite the exact page they came from.",
    points: [
      "Reads PDF, Word, Markdown and Excel files, splits them into passages and indexes them for search.",
      "Answers come only from your documents. If the answer isn't there, Folio says so instead of guessing.",
      "Every claim links to the page and paragraph it came from, so nobody has to take the AI's word for it.",
      "Document library, usage insights and workspace settings for teams.",
    ],
    stack: ["React", "Python", "OpenAI", "RAG", "Vector search"],
    shots: 5,
    tint: "#12b76a",
  },
  {
    slug: "helpdeck",
    name: "Helpdeck",
    kind: "AI customer-support inbox",
    year: "2026",
    context: "Own product",
    summary:
      "A shared support inbox for online stores where AI drafts each reply from the customer's order and your help articles, and an agent approves it.",
    points: [
      "Pulls in the customer's orders and courier tracking, so replies are based on what actually happened.",
      "AI drafts with a confidence level and the sources used. Agents can send, edit or regenerate them.",
      "Knowledge base, automations, reports and multiple channels (email and website chat widget).",
      "Internal notes, assignment, and open, waiting and snoozed queues for the team.",
    ],
    stack: ["React", "Python", "OpenAI", "REST APIs", "Webhooks"],
    shots: 5,
    tint: "#7c5cff",
  },
  {
    slug: "saudi-creative-streams",
    name: "Saudi Creative Streams",
    kind: "Art marketplace & creative community",
    year: "2026",
    context: "Web platform",
    summary:
      "A bilingual Arabic–English platform that helps Saudi artists show and sell their work and connect with collectors.",
    points: [
      "Art Market with primary and secondary sales, NFTs, and prints and souvenirs.",
      "Search, sorting and filters across categories such as calligraphy, painting and sculpture, and dozens of formats.",
      "Art-Connect for meeting creatives, Art-Bid for auctions and Art-Learn for courses.",
      "Artist profiles with likes and view counts on every artwork.",
    ],
    stack: ["React", "REST APIs", "Auth", "Arabic / English"],
    shots: 3,
    tint: "#ff4d6d",
  },
  {
    slug: "coin-bounce",
    name: "Coin Bounce",
    kind: "Crypto news, prices & blogging",
    year: "2024",
    context: "MERN project",
    summary:
      "A crypto community app with the latest news, live prices for the top coins, and a blog where members publish their own posts.",
    points: [
      "Live table of the top 10 cryptocurrencies by market cap, with price, 24-hour change and market cap.",
      "Home feed of the latest crypto news.",
      "Members can write, edit and delete their own blog posts and comment on others'.",
      "Sign-up and login with JWT access and refresh tokens protecting every route.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    shots: 5,
    tint: "#0ea5e9",
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
    note: "AI product features end to end for three client platforms: an AI tutor, a story generator and a video generator.",
  },
  {
    title: "Associate Software Engineer",
    org: "TKXEL",
    place: "Lahore, Pakistan",
    period: "Jan 2024 — Jan 2026",
    note: "Payments, escrow, wallets and real-time messaging for a marketplace platform. Part-time during my final semester, full-time from June 2024.",
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
