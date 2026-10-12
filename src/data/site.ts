// All site copy. Every claim must trace to the Full-Stack CV or the
// Upwork rules file (sections 2 and 6). No invented numbers.

export const profile = {
  name: "Win Moe",
  title: "Win Moe, Full-Stack AI Engineer",
  description:
    "Full-stack AI engineer building production AI products end to end. Ex-Uber data engineer (200M+ records a day), UC Berkeley CS, founder of Workify.",
  greeting: "Hi, I'm Win 👋",
  bio: [
    "I'm a full-stack AI engineer in Sunnyvale, California. I build production AI products end to end: the data pipelines underneath, the LLM and RAG systems in the middle, and the web apps people actually use.",
    "At Uber I built Spark and Kafka pipelines processing 200M+ records a day and cut $290K a year in compute. I've also evaluated frontier-model output for a top AI lab, shipped a multimodal RAG system that's live in two products, and founded Workify. UC Berkeley CS, full-ride Regents' Scholarship.",
  ],
  tagline: ["Full-Stack AI Engineer", "Ex-Uber", "UC Berkeley CS"],
  location: "Sunnyvale, CA",
};

export const links = {
  email: "winmoesuperstar@gmail.com",
  phone: "+1 (510) 988-6909",
  phoneHref: "tel:+15109886909",
  linkedin: "https://www.linkedin.com/in/winmoe",
  github: "https://github.com/winmoee",
  resume: "/resume",
  youtubeId: "G9SIEQqvQkw",
  workify: "https://joinworkify.com",
};

// Résumé viewer page (/resume), modeled on omartamimi.info/resume.html
export const resume = {
  pdf: "/assets/Win_Moe_Resume.pdf",
  fileName: "Win_Moe_Resume.pdf",
  role: "Full-Stack AI Engineer",
  subtitle: "Full-Stack Engineer · Ex-Uber · UC Berkeley CS · Sunnyvale, CA",
};

export interface Logo {
  name: string;
  src: string;
  /** Rendered height in em, tuned so the wordmarks look balanced */
  height: number;
  /** width / height of the artwork */
  ratio: number;
  /** Text shown next to a mark-only logo */
  wordmark?: string;
}

export const previouslyAt: Logo[] = [
  { name: "Uber", src: "/logos/uber.svg", height: 0.95, ratio: 2.857 },
  { name: "Mercor", src: "/logos/mercor.svg", height: 1.1, ratio: 1.1, wordmark: "Mercor" },
  { name: "Yanmar", src: "/logos/yanmar.svg", height: 0.85, ratio: 8.3 },
  { name: "UC Berkeley", src: "/logos/berkeley.svg", height: 1.6, ratio: 3.183 },
];

export const workify = {
  label: "Founder · Workify",
  heading: "One place to run fleet maintenance",
  body: "Workify gives maintenance teams an AI repair assistant that answers from their equipment's service manuals, text and diagrams, plus team accounts, seats and billing plans that grow from one technician to the whole fleet.",
  features: [
    "AI repair chat from service manuals",
    "Reads diagrams, not just text",
    "Team accounts and seats",
    "Individual to Enterprise plans",
  ],
  image: "/images/workify-hero.webp",
};

export interface Media {
  type: "image" | "video";
  src: string;
  alt: string;
  /** Poster frame for videos */
  poster?: string;
  /** Video pixel size, so the player keeps the right shape */
  width?: number;
  height?: number;
}

export interface Project {
  title: string;
  kind: string;
  role: string;
  body: string;
  stack: string[];
  media: Media[];
  badge?: { text: string; tone?: "accent" | "neutral" };
  link?: { href: string; label: string };
}

const shots = (slug: string, alts: string[]): Media[] =>
  alts.map((alt, i) => ({ type: "image", src: `/images/projects/${slug}-${i + 1}.webp`, alt }));

// Project copy follows the descriptions in F:/Ref/Acc_Clients/Win/Portfolios/*/description.md
export const insideWorkify: Project[] = [
  {
    title: "Workify",
    kind: "Fleet Maintenance SaaS with AI Chat",
    role: "Full Stack Developer: Web App, Billing, and AI Chat",
    body: "Workify helps companies run fleet maintenance in one place. The web app has company and team accounts with seats, Individual, Team, and Professional plans plus a custom Enterprise plan, and Stripe billing. It also includes an AI chat that answers repair questions from equipment service manuals, powered by my RAG backend.",
    stack: ["Next.js", "Supabase", "Stripe", "SaaS Development", "AI Model Integration"],
    media: shots("workify", [
      "Workify homepage: one place to run fleet maintenance",
      "Workify insights page for equipment service teams",
      "Workify industries page: municipal and public utilities",
      "Workify maintenance knowledge page: stop searching documents",
      "Workify AI service advisor: from fault code to verified fix",
      "Workify guided repair conversation",
    ]),
    badge: { text: "Live" },
    link: { href: "https://joinworkify.com", label: "Visit joinworkify.com" },
  },
  {
    title: "Multimodal RAG AI Assistant",
    kind: "AI backend for service manuals",
    role: "AI Engineer: built the RAG pipeline and FastAPI backend",
    body: "An AI assistant that answers questions about machine service manuals using both the text and the diagrams in the PDFs. Users can ask in English, Burmese, or Japanese and get answers in the same language. It runs as an always-on FastAPI server that keeps everything in memory for fast responses, and it powers the manual chat in two live products: the Seinn Yaung So marketplace and the Workify app.",
    stack: ["Retrieval Augmented Generation", "LangChain", "FastAPI", "Gemini", "Python", "ChromaDB", "S3"],
    media: [
      { type: "video", src: "/video/rag-demo.mp4", poster: "/images/projects/rag-demo-poster.webp", width: 1000, height: 604, alt: "Demo: asking the RAG viewer why an engine won't start" },
      ...shots("rag", [
        "Multimodal RAG Viewer: question form and retrieval settings",
        "Gemini answer with the retrieved manual diagrams",
        "Debug question generator for testing the pipeline",
      ]),
    ],
    badge: { text: "Live" },
    link: { href: "https://syspare-rag-py.onrender.com/", label: "Open live demo" },
  },
  {
    title: "Seinn Yaung So",
    kind: "Multilingual Marketplace + AI Assistant",
    role: "Full Stack Developer: marketplace site and AI integration",
    body: "A marketplace site for Seinn Yaung So, a farm machinery dealer in Myanmar. Customers browse and list spare parts, view products, and ask questions about machine manuals. I connected the site to my RAG backend, so the AI answers from the real service manuals, diagrams included, in the customer's own language.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "AI Model Integration", "Gemini"],
    media: shots("marketplace", [
      "Seinn Yaung So homepage with farm machinery",
      "Spare parts catalog with search and filters",
      "AI Service Assistant answering from a tractor manual",
    ]),
    badge: { text: "Live" },
    link: { href: "https://seinnyaungso.com/en", label: "Visit site" },
  },
];

export const otherWork: Project[] = [
  {
    title: "Workify Equity",
    kind: "Equity & Vesting Tracker",
    role: "Full Stack Developer",
    body: "A web app that shows employees their stock options, RSUs, and bonus payouts as they vest. It tracks every grant and vesting schedule, shows live pricing, and keeps a tamper-proof history of every change. It shares a database with the main Workify app.",
    stack: ["Next.js", "Supabase", "Tailwind CSS", "Dashboard", "Web Application"],
    media: shots("equity", ["Workify Equity landing page", "Workify Equity dashboard: portfolio value, bonuses and vesting"]),
    link: { href: "https://equity.joinworkify.com", label: "Visit (login required)" },
  },
  {
    title: "Automation Toolkit",
    kind: "Desktop, Web & CLI",
    role: "Full Stack Developer",
    body: "An internal toolkit that automates the team's admin work. One tool converts spreadsheet cost reports into the accounting system's import format. Another researches equipment dealer contacts and drafts outreach emails. The same tools run as a desktop app, a web dashboard, or from the command line.",
    stack: ["TypeScript", "Next.js", "Electrobun", "Automated Workflow", "ETL Pipeline", "Desktop Application"],
    media: [],
    badge: { text: "Internal tool", tone: "neutral" },
  },
  {
    title: "Aeruku",
    kind: "AI Sales Agent · Hackathon 2nd Place",
    role: "Full Stack AI Developer",
    body: "Our team won 2nd place and a $3,000 prize at the Masumi Hackathon in San Francisco. Aeruku is an autonomous AI sales agent that handles outbound sales with minimal human input. It finds leads through Apollo, LinkedIn, and web scraping, writes personalized messages using web context from the Brave API, and adjusts outreach based on engagement.",
    stack: ["AI Agent Development", "CrewAI", "Model Context Protocol (MCP)", "Python", "Next.js"],
    media: [
      {
        type: "video",
        src: "/video/aeruku-demo.mp4",
        poster: "/images/projects/aeruku-demo-poster.webp",
        width: 1280,
        height: 720,
        alt: "Aeruku product demo: finding leads, drafting emails and managing conversations",
      },
      ...shots("aeruku", [
      "Aeruku title slide: smarter reach, stronger ties, deployed on Masumi",
      "More agents incoming: agent collaboration, follow-ups, CRM, copywriting",
      "Who are our customers: B2B sales, hiring, networking, fundraising",
      "Aeruku architecture: Next.js, FastAPI, CrewAI, Composio MCP, Apollo, Gmail",
      ]),
    ],
    badge: { text: "Hackathon · 2nd place" },
  },
];

export interface Stat {
  /** Number to count up to; omit for static text */
  count?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
  caption: string;
}

export const stats: Stat[] = [
  { count: 200, suffix: "M+", caption: "records processed a day" },
  { count: 290, prefix: "$", suffix: "K", caption: "compute saved a year" },
  { text: "1d → <6h", caption: "marketing personalization latency" },
  { text: "1h → <15m", caption: "anomaly detection run time" },
];

export interface Job {
  company: string;
  logo: string;
  role: string;
  dates: string;
  summary: string;
  current?: boolean;
}

export const experience: Job[] = [
  {
    company: "Workify",
    logo: "/logos/workify.png",
    role: "Founder & Engineer",
    dates: "May 2026 – Present",
    summary:
      "Founded a fleet-maintenance platform with an AI manual assistant. Own the product, architecture and engineering end to end.",
    current: true,
  },
  {
    company: "Uber",
    logo: "/logos/uber.svg",
    role: "Software Engineer I, Growth & Marketing Data",
    dates: "May 2025 – Apr 2026",
    summary:
      "Owned end-to-end Spark and Kafka projects for growth and marketing analytics on 2B+ users. Built PySpark ETL pipelines and Kafka topics handling 200M+ real-time location rows a day, cutting personalization latency from 1 day to under 6 hours. Data-validation work saved $290K a year in compute. Recognized by a Staff Engineer for ownership and data-quality initiatives.",
  },
  {
    company: "Mercor",
    logo: "/logos/mercor.svg",
    role: "Software Engineering Domain Expert (Contract)",
    dates: "Dec 2025 – Jan 2026",
    summary:
      "Provided software engineering expertise to improve frontier models for a top AI lab, evaluating and refining complex technical outputs.",
  },
  {
    company: "Uber",
    logo: "/logos/uber.svg",
    role: "Software Engineering Intern, Anomaly Detection",
    dates: "May 2024 – Aug 2024",
    summary:
      "Parallelized Cadence workflows in Go across 370 metric groups, cutting anomaly detection from 1 hour to under 15 minutes. Moved a gRPC API layer from Python to Go.",
  },
  {
    company: "Yanmar",
    logo: "/logos/yanmar.svg",
    role: "Data Engineering Intern, Business Intelligence",
    dates: "May 2023 – Apr 2024",
    summary:
      "Automated Salesforce-to-Snowflake ETL and Power BI dataflows, removing 4 hours of manual reporting a week. Built scrapers covering 560+ competitor models.",
  },
  {
    company: "UC Berkeley Data Lab",
    logo: "/logos/berkeley.svg",
    role: "Undergraduate Research Apprentice",
    dates: "Jul 2022 – Apr 2024",
    summary:
      "Built Python pipelines to clean, segment and analyze 150,000+ unstructured JSON files for network research. Co-built a Swift iOS app (4,500+ lines) used by 1,000+ people.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend & Mobile",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native (Expo)", "Swift / iOS"],
  },
  { group: "Backend", items: ["Python", "FastAPI", "Go", "gRPC", "REST APIs", "Supabase", "PostgreSQL", "Stripe"] },
  {
    group: "AI & LLMs",
    items: ["RAG", "Multimodal retrieval", "Vertex AI (Gemini)", "LangChain", "ChromaDB", "CrewAI", "MCP", "Model evaluation"],
  },
  { group: "Data & Streaming", items: ["Apache Spark", "PySpark", "Kafka", "Snowflake", "SQL", "ETL pipelines", "Power BI"] },
];

export const education = {
  school: "University of California, Berkeley",
  degree: "B.A. Computer Science, 2022 – 2025",
  note: "Regents' Scholarship (full ride)",
};

export const languages = ["English (native)", "Burmese (native)", "Chinese (professional)"];
