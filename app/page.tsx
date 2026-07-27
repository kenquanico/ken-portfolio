"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const experiences = [
  {
    year: "2026",
    title: "IT Support Intern",
    company: "STI College",
    type: "Internship",
    mark: "STI",
    skills: ["Systems Support", "Identity Validation", "IT Operations"],
    description:
        "Activated and verified 500+ student IDs during peak enrollment, cutting entrance-line wait times by 40%, while maintaining 30+ lab workstations and resolving 50+ IT support requests to keep campus systems running smoothly.",
    date: "Apr — May",
  },
  {
    year: "2026",
    title: "Freelance Graphic & Logo Designer",
    company: "Small Business Liaison Team",
    type: "Freelance",
    mark: "SL",
    skills: ["Brand Systems", "Visual Design", "Production Assets"],
    description:
        "Designed a complete brand identity system for a dual-service real estate and government liaison company, unifying logo, color, and typography across 15+ deliverables and cutting client design turnaround time by 30% with a reusable, self-service visual system.",
    date: "Mar — May",
  },
  {
    year: "2025",
    title: "Frontend Developer",
    company: "Healthcare Startup",
    type: "Frontend Development",
    mark: "HC",
    skills: ["React", "TypeScript", "Healthcare UX"],
    description:
        "Built responsive interfaces for an AI-powered healthcare platform's doctor discovery, appointments, and calendar features, supporting 1,000+ active users, cutting key page load times by 30%, and shipping 20+ features across sprints in React and TypeScript.",
    date: "Aug — Mar ’26",
  },
  {
    year: "2025",
    title: "Freelance Graphic Designer",
    company: "Small Business Beauty Lounge",
    type: "Freelance",
    mark: "BL",
    skills: ["Brand Identity", "Graphic Design", "Print Systems"],
    description:
        "Designed a modern salon brand identity, building a scalable asset system deployed across signage, billboards, and social media, and delivering print-ready and digital assets across 10+ formats that cut client marketing production time.",
    date: "May",
  },
];

const skillGroups = [
  {
    index: "A",
    title: "Web Development",
    skills: [
      "JavaScript", "TypeScript", "React", "Next.js", "Vue.js",
      "Tailwind CSS", "SCSS", "Styled Components", "Vite", "Webpack", "ESLint", "Prettier",
      "Node.js", "Express.js", "NestJS", "PHP", "Laravel",
      "PostgreSQL", "MySQL", "AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Agile / Scrum",
    ],
  },
  {
    index: "B",
    title: "Mobile Development",
    skills: [
      "React Native", "Expo", "Expo Router", "NativeWind", "TypeScript",
      "Cross-platform Apps", "API Integration", "Product Prototyping",
      "Node.js", "Laravel", "PostgreSQL", "Supabase",
      "AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Agile / Scrum",
    ],
  },
  {
    index: "C",
    title: "AI / Deep Learning / Machine Learning",
    skills: [
      "Python", "TensorFlow", "PyTorch", "YOLOv8", "Transformers",
      "Hugging Face", "LangChain", "LlamaIndex", "OpenAI", "Anthropic", "Mistral", "Llama",
      "On-device Inference", "Claude Code", "Codex", "AutoGPT",
      "Machine Learning", "Deep Learning",
    ],
  },
  {
    index: "D",
    title: "DevOps, Security & Collaboration",
    skills: [
      "Git", "GitHub", "GitLab", "Bitbucket",
      "GitHub Actions", "Jenkins", "GitLab CI", "Terraform", "AWS CloudFormation",
      "Prometheus", "Grafana", "Datadog",
      "JIRA", "Trello", "ClickUp", "Slack", "Discord", "Teams", "Agile / Scrum",
      "AWS IAM", "Azure AD", "Okta", "Auth0", "Cognito",
      "AES", "RSA", "SHA", "GDPR", "SOC 2", "ISO 27001",
    ],
  },
];

const toolsUsed = [
  { name: "VS Code", logo: "https://cdn.simpleicons.org/visualstudiocode" },
  { name: "WebStorm", logo: "https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm.svg" },
  { name: "PyCharm", logo: "https://resources.jetbrains.com/storage/products/company/brand/logos/PyCharm.svg" },
  { name: "PhpStorm", logo: "https://resources.jetbrains.com/storage/products/company/brand/logos/PhpStorm.svg" },
  { name: "Google Colab", logo: "https://cdn.simpleicons.org/googlecolab" },
  { name: "Kaggle", logo: "https://cdn.simpleicons.org/kaggle" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma" },
];

const featuredPost = {
  slug: "building-ai-products-that-earn-trust",
  date: "Jul 27, 2026",
  readTime: "4 min read",
  title: "Building AI Products That Earn Trust.",
  description:
      "A dependable AI feature is more than a capable model. It is the product system that gives the model boundaries, context, proof, and a graceful way to recover.",
};

const blogPosts = [
  {
    ...featuredPost,
    dateLabel: "Jul 2026",
    readLabel: "4 min",
    art: "signal",
  },
  {
    slug: "shipping-an-offline-first-health-companion",
    date: "Jul 18, 2026",
    dateLabel: "Jul 2026",
    readTime: "3 min read",
    readLabel: "3 min",
    title: "Shipping an Offline-First Health Companion",
    description:
        "What building Elio taught me about designing dependable health features for moments when connectivity cannot be assumed.",
    art: "mobile",
  },
  {
    slug: "computer-vision-beyond-the-model",
    date: "Jul 10, 2026",
    dateLabel: "Jul 2026",
    readTime: "3 min read",
    readLabel: "3 min",
    title: "Computer Vision Beyond the Model",
    description:
        "The product work around detection: clear field reports, useful location context, and interfaces people can understand quickly.",
    art: "vision",
  },
  {
    slug: "what-support-work-taught-me-about-systems",
    date: "Jun 28, 2026",
    dateLabel: "Jun 2026",
    readTime: "2 min read",
    readLabel: "2 min",
    title: "What Support Work Taught Me About Systems",
    description:
        "Small operational details often reveal more about reliability than the happy path ever will.",
    art: "systems",
  },
  {
    slug: "designing-interfaces-for-proof",
    date: "Jun 21, 2026",
    dateLabel: "Jun 2026",
    readTime: "4 min read",
    readLabel: "4 min",
    title: "Designing Interfaces for Proof",
    description:
        "Why good product states show what happened, what changed, and what the user can safely do next.",
    art: "proof",
  },
  {
    slug: "a-practical-stack-for-small-teams",
    date: "Jun 12, 2026",
    dateLabel: "Jun 2026",
    readTime: "3 min read",
    readLabel: "3 min",
    title: "A Practical Stack for Small Teams",
    description:
        "How I choose tools that support fast iteration without creating unnecessary maintenance.",
    art: "stack",
  },
  {
    slug: "the-quiet-work-behind-ai-features",
    date: "May 30, 2026",
    dateLabel: "May 2026",
    readTime: "3 min read",
    readLabel: "3 min",
    title: "The Quiet Work Behind AI Features",
    description:
        "Context, permissions, evaluation, and recovery are the less visible parts that make an AI experience useful.",
    art: "nodes",
  },
  {
    slug: "building-for-the-slowest-connection",
    date: "May 18, 2026",
    dateLabel: "May 2026",
    readTime: "2 min read",
    readLabel: "2 min",
    title: "Building for the Slowest Connection",
    description:
        "A short field note on making core product flows resilient, understandable, and forgiving.",
    art: "network",
  },
  {
    slug: "what-brand-systems-teach-developers",
    date: "May 8, 2026",
    dateLabel: "May 2026",
    readTime: "3 min read",
    readLabel: "3 min",
    title: "What Brand Systems Teach Developers",
    description:
        "Consistency is not decoration. It is a reusable decision system that makes the next piece of work easier.",
    art: "brand",
  },
  {
    slug: "choosing-the-smallest-complete-version",
    date: "Apr 26, 2026",
    dateLabel: "Apr 2026",
    readTime: "2 min read",
    readLabel: "2 min",
    title: "Choosing the Smallest Complete Version",
    description:
        "Scope gets clearer when every release is small enough to finish and complete enough to learn from.",
    art: "scope",
  },
];

const certifications = [
  {
    title: "Software Engineering",
    issuer: "TestDome",
    category: "Software Engineering",
    logo: "/logos/testdome.svg",
    url: "https://www.testdome.com/certificates/dbd71a053d964a0386188d4355eff557",
  },
  {
    title: "Machine Learning",
    issuer: "TestDome",
    category: "AI & Machine Learning",
    logo: "/logos/testdome.svg",
    url: "https://www.testdome.com/certificates/d76421f240084614854a9fc03a05920f",
  },
  {
    title: "TypeScript",
    issuer: "TestDome",
    category: "Web Development",
    logo: "/logos/testdome.svg",
    url: "https://www.testdome.com/certificates/25a7d6e6fdb14b3e88badc0fd991a09f",
  },
  {
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM",
    category: "AI & Machine Learning",
    logo: "/logos/ibm.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/XRM1DC81TF5M",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    category: "Software Engineering",
    logo: "/logos/ibm.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/KWPYK654VX9N",
  },
  {
    title: "Programming with JavaScript",
    issuer: "Meta",
    category: "Web Development",
    logo: "/logos/meta.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/GVCKP54JB3Q4",
  },
  {
    title: "Google Cloud Generative AI Leader",
    issuer: "Google Cloud",
    category: "AI & Machine Learning",
    logo: "/logos/google-cloud.svg",
    url: "https://www.coursera.org/account/accomplishments/specialization/I2INLZ6FCOMH",
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    category: "AI & Machine Learning",
    logo: "/logos/ibm.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/1SMIKTNA3V2U",
  },
  {
    title: "Introduction to Cloud Computing",
    issuer: "IBM",
    category: "Cloud & DevOps",
    logo: "/logos/ibm.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/X850H4Q0RM1L",
  },
  {
    title: "Introduction to DevOps",
    issuer: "IBM",
    category: "Cloud & DevOps",
    logo: "/logos/ibm.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/5FK0DTRMVB7U",
  },
  {
    title: "HTML and CSS in depth",
    issuer: "Meta",
    category: "Web Development",
    logo: "/logos/meta.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/S6V22E5T9NAN",
  },
  {
    title: "Version Control",
    issuer: "Meta",
    category: "Web Development",
    logo: "/logos/meta.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/X2QMVEBZ5W7U",
  },
];

const certificationCategories = [
  "AI & Machine Learning",
  "Web Development",
  "Cloud & DevOps",
  "Software Engineering",
];

const documentResources = [
  {
    title: "Resume",
    label: "Engineering Overview",
    description:
        "A concise overview of my full-stack engineering experience, technical capabilities, and selected work.",
    href: "/docs/kenldry-resume.pdf",
    fileName: "kenldry-resume.pdf",
  },
  {
    title: "Capstone Study",
    label: "Final Manuscript",
    description:
        "A complete record of the research, engineering methodology, system implementation, and project outcomes.",
    href: "/docs/itmawd-12b-quanico-final-manuscript.pdf",
    fileName: "itmawd-12b-quanico-final-manuscript.pdf",
  },
];

// Broad discipline label shown as the primary badge (e.g. "AI / DEEP LEARNING", "WEB DEVELOPMENT").
// `category` stays as the more specific project type shown underneath it.
const sampleProjects = [
  {
    name: "Elio",
    label: "AI / Deep Learning",
    category: "Offline-First Health Companion App",
    logo: "/project-logos/elio-icon-v5.png",
    description:
        "Offline-first React Native health app that centralizes medications, health records, and insurance coverage, powered by ElioAI, an on-device AI assistant that helps users manage everyday health tasks.",
    url: "https://www.eliocare.tech",
  },
  {
    name: "AgriVision",
    label: "AI / Deep Learning",
    category: "Computer Vision Capstone",
    logo: "/project-logos/agrivision.png",
    description:
        "Web-based computer-vision ecosystem using an optimized YOLOv8m model to detect 16 rice health conditions and turn GPS-linked field reports into regional outbreak intelligence.",
    url: "https://agrivision-cs.vercel.app/",
  },
  {
    name: "DRAPÉ",
    label: "Web Development",
    category: "E-commerce Platform",
    logo: "/project-logos/drape.svg",
    description:
        "Rebranded fashion storefront with product-led discovery, responsive shopping flows, accessible navigation, and a polished conversion-focused experience.",
    url: "https://drape-shop.vercel.app/product/8",
  },
  {
    name: "Uifry",
    label: "Web Development",
    category: "Fintech Landing Page",
    logo: "/project-logos/uifry.svg",
    description:
        "Finance app landing page emphasizing clean UI systems, SEO-ready page structure, responsive pricing/content sections, and credible product presentation.",
    url: "https://uifry-one-tan.vercel.app/",
  },
  {
    name: "Petal Booth",
    label: "Web Development",
    category: "Interactive Web App",
    logo: "/project-logos/petal-booth.png",
    description:
        "Private in-browser photobooth with a playful camera experience, responsive controls, and a polished flow for capturing memorable moments.",
    url: "https://photobooth-kq.vercel.app/",
  },
  {
    name: "Pathway Dark",
    label: "Web Development",
    category: "Landing Page",
    logo: "/project-logos/pathway-dark.svg",
    description:
        "Optimized landing page build with responsive sections, fast-loading UI patterns, clear conversion flow, and polished visual hierarchy.",
    url: "https://pathway-dark.vercel.app/",
  },
  {
    name: "Pathway Mauve",
    label: "Web Development",
    category: "Landing Page",
    logo: "/project-logos/pathway-mauve.svg",
    description:
        "Mobile-first marketing page focused on clean spacing, accessible contrast, SEO-friendly structure, and smooth cross-device presentation.",
    url: "https://pathway-mauve-one.vercel.app/",
  },
  {
    name: "FutureSphere",
    label: "Web Development",
    category: "Product Website",
    logo: "/project-logos/futuresphere.svg",
    description:
        "Modern product site with strong information architecture, performance-conscious layout, responsive content blocks, and high-impact brand storytelling.",
    url: "https://futuresphere-two.vercel.app/",
  },
  {
    name: "Vaultflow",
    label: "Web Development",
    category: "SaaS Website",
    logo: "/project-logos/vaultflow.svg",
    description:
        "SaaS-style interface demonstrating clear feature communication, scalable sections, conversion-focused CTAs, and production-ready responsive behavior.",
    url: "https://vaultflow-smoky.vercel.app/",
  },
  {
    name: "JustHome",
    label: "Web Development",
    category: "Real Estate Website",
    logo: "/project-logos/justhome.svg",
    description:
        "Real estate experience built for browsing clarity, mobile usability, visual trust, fast scanning, and structured property-focused content.",
    url: "https://justhome-five.vercel.app/",
  },
  {
    name: "TasteNet",
    label: "Web Development",
    category: "Food & Discovery Website",
    logo: "/project-logos/tastenet-actual.svg",
    description:
        "Restaurant and discovery UI with appetite-driven visuals, intuitive navigation, mobile-first layout, and strong user flow from browse to action.",
    url: "https://tastenet-nine.vercel.app/",
  },
];

const projectLabels = ["AI / Deep Learning", "Web Development"];
const homepageProjects = ["Elio", "AgriVision", "DRAPÉ"].map(
    (name) => sampleProjects.find((project) => project.name === name)!,
);
const homepageCertifications = [
  certifications.find((certificate) => certificate.issuer === "Google Cloud")!,
  certifications.find((certificate) => certificate.issuer === "Meta")!,
  certifications.find((certificate) => certificate.issuer === "IBM" && certificate.title.includes("Artificial Intelligence"))!,
];
const githubMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type IconName =
    | "projects"
    | "experience"
    | "stack"
    | "certifications"
    | "blog"
    | "documents"
    | "contact"
    | "theme"
    | "moon"
    | "system"
    | "ask"
    | "sound"
    | "email";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    projects: <><rect x="3" y="4" width="7" height="7" rx="1" /><rect x="14" y="4" width="7" height="7" rx="1" /><rect x="3" y="15" width="7" height="5" rx="1" /><rect x="14" y="15" width="7" height="5" rx="1" /></>,
    experience: <><path d="M9 6V4h6v2" /><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 11h18M10 11v2h4v-2" /></>,
    stack: <><path d="m12 3-9 5 9 5 9-5-9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    certifications: <><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1 7 4.5-2 4.5 2-1-7" /></>,
    blog: <><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    documents: <><path d="M6 2h9l4 4v16H6V2Z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></>,
    contact: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v1" /></>,
    theme: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M20.5 15.4A8.5 8.5 0 0 1 8.6 3.5 8.5 8.5 0 1 0 20.5 15.4Z" />,
    system: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    ask: <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></>,
    sound: <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" /></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  };

  return (
      <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
  );
}

function projectLogoClass(name: string) {
  if (name === "FutureSphere") return " project-logo-light-source";
  if (name === "DRAPÉ") return " project-logo-dark-source";
  return "";
}

const certificationCardPoses = [
  { rotation: -4, translateY: 6 },
  { rotation: 3, translateY: -4 },
  { rotation: -2, translateY: 3 },
  { rotation: 4, translateY: -6 },
  { rotation: -3, translateY: 4 },
  { rotation: 2.5, translateY: -2 },
  { rotation: -3.5, translateY: 5 },
];

function certificationCardStyle(index: number) {
  const pose = certificationCardPoses[index % certificationCardPoses.length];
  return {
    "--rot": `${pose.rotation}deg`,
    "--ty": `${pose.translateY}px`,
  } as CSSProperties;
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
      <div className="section-label">
        <span>{number}</span>
        <p>{title}</p>
      </div>
  );
}

export default function Home() {
  type ThemePreference = "system" | "light" | "dark";
  type ThemeDocument = Document & {
    startViewTransition?: (update: () => void) => { finished: Promise<void> };
  };
  type AskStage = "input" | "analyzing" | "reveal" | "answer";
  type BrowserNavigator = Navigator & {
    connection?: { effectiveType?: string };
    deviceMemory?: number;
    userAgentData?: { platform?: string };
  };
  type NetworkProfile = {
    success?: boolean;
    ip?: string;
    city?: string;
    region?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    connection?: { isp?: string; org?: string };
  };

  const pathname = usePathname();
  const activeBlogPost = blogPosts.find((post) => pathname === `/blog/${post.slug}`);
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [blogView, setBlogView] = useState<"list" | "grid">("list");
  const [askOpen, setAskOpen] = useState(false);
  const [askStage, setAskStage] = useState<AskStage>("input");
  const [askQuestion, setAskQuestion] = useState("");
  const [askMessage, setAskMessage] = useState("what do you want to ask?");
  const audioContextRef = useRef<AudioContext | null>(null);
  const askInputRef = useRef<HTMLInputElement | null>(null);
  const askTimersRef = useRef<number[]>([]);
  const [githubActivity, setGithubActivity] = useState<Array<{ date: string; count: number; level: number } | null>>(
      Array.from({ length: 53 * 7 }, () => null),
  );

  function clearAskTimers() {
    askTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    askTimersRef.current = [];
  }

  function browserName() {
    const agent = navigator.userAgent;
    if (/Edg\//.test(agent)) return "Microsoft Edge";
    if (/Chrome\//.test(agent)) return "Chrome";
    if (/Firefox\//.test(agent)) return "Firefox";
    if (/Safari\//.test(agent)) return "Safari";
    return "your browser";
  }

  function browserVersion() {
    const match = navigator.userAgent.match(/(?:Edg|Chrome|Firefox|Version)\/(\d+)/);
    return match?.[1] || "";
  }

  function answerQuestion(question: string) {
    const normalized = question.toLowerCase();
    if (/(hire|available|work with|contact|email)/.test(normalized)) {
      return "yes — i am available for software development opportunities. email me at nekquanico@gmail.com and tell me what you are building.";
    }
    if (/(stack|technology|technologies|tools)/.test(normalized)) {
      return "my core stack is TypeScript, React, Next.js, Node.js, Python, PostgreSQL, AWS, Docker, and modern AI tooling.";
    }
    if (/(project|portfolio|build|made)/.test(normalized)) {
      return "my selected work covers healthcare, AI products, responsive interfaces, and full-stack applications. open the projects section for the complete breakdown.";
    }
    if (/(experience|background|about you|who are you)/.test(normalized)) {
      return "i am Ken Aldrey Quanico, a software developer focused on dependable web applications, AI software engineering, and useful product experiences.";
    }
    if (/(location|where are you|based)/.test(normalized)) {
      return "i am based in Bacolod, Philippines, and open to remote or collaborative opportunities.";
    }
    return "i don't want to waste tokens on that, search for it yourself :)";
  }

  function openAsk() {
    clearAskTimers();
    setAskQuestion("");
    setAskStage("input");
    setAskMessage("what do you want to ask?");
    setAskOpen(true);
  }

  function closeAsk() {
    clearAskTimers();
    setAskOpen(false);
  }

  async function submitAsk(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = askQuestion.trim();
    if (!question) {
      askInputRef.current?.focus();
      return;
    }

    clearAskTimers();
    setAskStage("analyzing");
    setAskMessage("analyzing…");

    const browserNavigator = navigator as BrowserNavigator;
    let networkProfile: NetworkProfile | null = null;
    const networkController = new AbortController();
    const networkTimeout = window.setTimeout(() => networkController.abort(), 2800);
    try {
      const response = await fetch("https://ipwho.is/", { signal: networkController.signal });
      if (response.ok) networkProfile = await response.json() as NetworkProfile;
    } catch {
      networkProfile = null;
    } finally {
      window.clearTimeout(networkTimeout);
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "your local timezone";
    const localTime = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date());
    const connection = browserNavigator.connection?.effectiveType?.toUpperCase();
    const networkLocationParts = networkProfile?.success !== false
        ? [networkProfile?.city, networkProfile?.region, networkProfile?.country].filter(Boolean)
        : [];
    const networkLocation = networkLocationParts.join(", ");
    const provider = networkProfile?.connection?.isp || networkProfile?.connection?.org;
    const publicIp = networkProfile?.ip;
    const coordinates = typeof networkProfile?.latitude === "number" && typeof networkProfile?.longitude === "number"
        ? `${networkProfile.latitude.toFixed(2)}, ${networkProfile.longitude.toFixed(2)}`
        : "";
    const referrer = document.referrer
        ? (() => {
          try {
            return new URL(document.referrer).hostname.replace(/^www\./, "");
          } catch {
            return "another page";
          }
        })()
        : "a direct visit or private source";
    const platform = browserNavigator.userAgentData?.platform || navigator.platform || "your device";
    const memory = browserNavigator.deviceMemory;
    const processorCores = navigator.hardwareConcurrency;
    const version = browserVersion();
    const messages = [
      "before i answer",
      publicIp ? `your public ip address is ${publicIp}` : "your public ip address was not available",
      provider
          ? `you are connected through ${provider}`
          : "your network provider was not available",
      networkLocation
          ? `your approximate network location is ${networkLocation} — city-level IP data can be imprecise`
          : `your approximate region follows the ${timezone.replaceAll("_", " ")} timezone`,
      coordinates
          ? `your approximate network coordinates are around ${coordinates}`
          : "approximate network coordinates were not available",
      `you are on ${platform}${processorCores ? ` with ${processorCores} processor cores` : ""}${memory ? ` and ${memory}gb of reported memory` : ""}`,
      `you are browsing with ${browserName()}${version ? ` ${version}` : ""} set to ${navigator.language}`,
      `your timezone is ${timezone} and it is around ${localTime} where you are`,
      connection ? `you are on a ${connection} connection` : "your browser did not report a connection type",
      `you arrived here from ${referrer}`,
      "none of this needed a permission prompt",
      "your browser shares this information with every website you open, automatically",
      "so be mindful of what you click, and who you trust online",
      "as for your question",
      answerQuestion(question),
    ];

    messages.forEach((message, index) => {
      const timer = window.setTimeout(() => {
        setAskStage(index === messages.length - 1 ? "answer" : "reveal");
        setAskMessage(message);
      }, 1800 + index * 2600);
      askTimersRef.current.push(timer);
    });
  }

  useEffect(() => {
    const stored = window.localStorage.getItem("ken-portfolio-theme");
    setThemePreference(stored === "light" || stored === "dark" || stored === "system" ? stored : "system");
    setSoundEnabled(window.localStorage.getItem("ken-portfolio-sound") !== "off");
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystemTheme = () => {
      const resolvedTheme = themePreference === "system" ? (media.matches ? "dark" : "light") : themePreference;
      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.dataset.themeMode = themePreference;
    };

    applySystemTheme();
    if (themePreference !== "system") return;

    media.addEventListener("change", applySystemTheme);
    return () => media.removeEventListener("change", applySystemTheme);
  }, [themePreference]);

  useEffect(() => {
    if (!askOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => askInputRef.current?.focus(), 80);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAsk();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [askOpen]);

  useEffect(() => () => clearAskTimers(), []);

  useEffect(() => {
    type SoundCue = "tick" | "press" | "release";
    type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

    const soundProfiles: Record<SoundCue, {
      duration: number;
      volume: number;
      voices: Array<{ from: number; to: number; type: OscillatorType }>;
    }> = {
      tick: {
        duration: .045,
        volume: .03,
        voices: [
          { from: 1080, to: 1480, type: "sine" },
          { from: 620, to: 920, type: "triangle" },
        ],
      },
      press: {
        duration: .075,
        volume: .045,
        voices: [
          { from: 280, to: 180, type: "triangle" },
          { from: 760, to: 480, type: "sine" },
        ],
      },
      release: {
        duration: .085,
        volume: .036,
        voices: [
          { from: 430, to: 720, type: "sine" },
          { from: 860, to: 1180, type: "triangle" },
        ],
      },
    };

    function getAudioContext() {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        return audioContextRef.current;
      }

      const AudioContextClass = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
      if (!AudioContextClass) return null;

      audioContextRef.current = new AudioContextClass();
      return audioContextRef.current;
    }

    function unlockAudio() {
      if (!soundEnabled) return;
      const audio = getAudioContext();
      if (!audio) return;

      if (audio.state === "suspended") void audio.resume();

      // A silent one-sample source unlocks Web Audio during the first iOS touch.
      const source = audio.createBufferSource();
      source.buffer = audio.createBuffer(1, 1, 22050);
      source.connect(audio.destination);
      source.start();
    }

    function playSound(cue: SoundCue) {
      const profile = soundProfiles[cue];
      const audio = getAudioContext();
      if (!audio) return;

      const renderCue = () => {
        const master = audio.createGain();
        const filter = audio.createBiquadFilter();
        const now = audio.currentTime;

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(cue === "press" ? 1800 : 2600, now);
        master.gain.setValueAtTime(.0001, now);
        master.gain.exponentialRampToValueAtTime(profile.volume, now + .006);
        master.gain.exponentialRampToValueAtTime(.0001, now + profile.duration);
        filter.connect(master);
        master.connect(audio.destination);

        profile.voices.forEach((voice, index) => {
          const oscillator = audio.createOscillator();
          oscillator.type = voice.type;
          oscillator.detune.setValueAtTime(index === 0 ? -4 : 7, now);
          oscillator.frequency.setValueAtTime(voice.from, now);
          oscillator.frequency.exponentialRampToValueAtTime(voice.to, now + profile.duration);
          oscillator.connect(filter);
          oscillator.start(now + index * .002);
          oscillator.stop(now + profile.duration);
        });
      };

      if (audio.state === "suspended") {
        void audio.resume().then(renderCue).catch(() => undefined);
      } else {
        renderCue();
      }
    }

    function interactiveTarget(event: PointerEvent) {
      if (!(event.target instanceof Element)) return null;
      const target = event.target.closest<HTMLElement>("a, button");
      return target?.hasAttribute("data-cuelume-silent") ? null : target;
    }

    function playHover(event: PointerEvent) {
      if (!soundEnabled || !(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-cuelume-hover='tick']");
      if (!target || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return;
      playSound("tick");
    }

    function playPress(event: PointerEvent) {
      if (!soundEnabled || !interactiveTarget(event)) return;
      playSound("press");
    }

    function playRelease(event: PointerEvent) {
      if (!soundEnabled || !interactiveTarget(event)) return;
      playSound("release");
    }

    document.addEventListener("touchstart", unlockAudio, { capture: true, passive: true });
    document.addEventListener("pointerover", playHover);
    document.addEventListener("pointerdown", playPress);
    document.addEventListener("pointerup", playRelease);
    return () => {
      document.removeEventListener("touchstart", unlockAudio, { capture: true });
      document.removeEventListener("pointerover", playHover);
      document.removeEventListener("pointerdown", playPress);
      document.removeEventListener("pointerup", playRelease);
    };
  }, [soundEnabled]);

  useEffect(() => () => {
    const audio = audioContextRef.current;
    audioContextRef.current = null;
    if (audio && audio.state !== "closed") void audio.close();
  }, []);

  useEffect(() => {
    const year = new Date().getFullYear();
    fetch(`https://github-contributions-api.jogruber.de/v4/kenquanico?y=${year}`)
        .then((response) => response.json())
        .then((data: { contributions?: Array<{ date: string; count: number; level: number }> }) => {
          const cells: Array<{ date: string; count: number; level: number } | null> = Array.from({ length: 53 * 7 }, () => null);
          const firstDayOffset = new Date(Date.UTC(year, 0, 1)).getUTCDay();
          data.contributions?.forEach((contribution, index) => {
            const cellIndex = firstDayOffset + index;
            if (cellIndex < cells.length) cells[cellIndex] = contribution;
          });
          setGithubActivity(cells);
        })
        .catch(() => undefined);
  }, []);

  function selectTheme(nextPreference: ThemePreference, button: HTMLButtonElement) {
    if (nextPreference === themePreference) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const nextTheme = nextPreference === "system" ? (media.matches ? "dark" : "light") : nextPreference;
    const root = document.documentElement;
    const bounds = button.getBoundingClientRect();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.style.setProperty("--theme-origin-x", `${bounds.left + bounds.width / 2}px`);
    root.style.setProperty("--theme-origin-y", `${bounds.top + bounds.height / 2}px`);
    root.dataset.themeTransition = "active";

    const commitTheme = () => {
      setThemePreference(nextPreference);
      root.dataset.theme = nextTheme;
      root.dataset.themeMode = nextPreference;
      window.localStorage.setItem("ken-portfolio-theme", nextPreference);
    };

    const transitionDocument = document as ThemeDocument;
    if (reduceMotion || !transitionDocument.startViewTransition) {
      commitTheme();
      window.setTimeout(() => delete root.dataset.themeTransition, reduceMotion ? 30 : 700);
      return;
    }

    const transition = transitionDocument.startViewTransition(commitTheme);
    void transition.finished.finally(() => delete root.dataset.themeTransition);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleSound() {
    const next = !soundEnabled;
    setSoundEnabled(next);
    window.localStorage.setItem("ken-portfolio-sound", next ? "on" : "off");
  }

  return (
      <>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <span className="theme-burst" aria-hidden="true" />

        <header className={`site-header${pathname === "/" ? " is-home" : ""}${pathname.startsWith("/blog") ? " is-blog" : ""}`}>
          <a className="wordmark" href="/" aria-label="Ken Aldrey Quanico, home">
            <span className="wordmark-copy">
              <span className="wordmark-name">Ken Quanico</span>
              <span className="wordmark-kicker">Software Developer</span>
            </span>
          </a>

          <button
              className="menu-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            <span className="nav-group">
              <a className={pathname === "/projects" ? "is-active" : ""} href="/projects" onClick={closeMenu} aria-current={pathname === "/projects" ? "page" : undefined}><Icon name="projects" />Projects</a>
              <a className={pathname === "/experience" ? "is-active" : ""} href="/experience" onClick={closeMenu} aria-current={pathname === "/experience" ? "page" : undefined}><Icon name="experience" />Experience</a>
              <a className={pathname === "/stack" ? "is-active" : ""} href="/stack" onClick={closeMenu} aria-current={pathname === "/stack" ? "page" : undefined}><Icon name="stack" />Stack</a>
              <a className={pathname === "/certifications" ? "is-active" : ""} href="/certifications" onClick={closeMenu} aria-current={pathname === "/certifications" ? "page" : undefined}><Icon name="certifications" />Certifications</a>
              <a className={pathname.startsWith("/blog") ? "is-active" : ""} href="/blog" onClick={closeMenu} aria-current={pathname === "/blog" ? "page" : undefined}><Icon name="blog" />Blog</a>
            </span>
            <span className="nav-group nav-group-secondary">
              <a className={pathname === "/documents" ? "is-active" : ""} href="/documents" onClick={closeMenu} aria-current={pathname === "/documents" ? "page" : undefined}><Icon name="documents" />Documents</a>
              <a className={pathname === "/contact" ? "is-active" : ""} href="/contact" onClick={closeMenu} aria-current={pathname === "/contact" ? "page" : undefined}><Icon name="contact" />Contact</a>
            </span>
          </nav>

          <div className="sidebar-footer">
            <button
                className="ask-toggle"
                type="button"
                aria-haspopup="dialog"
                aria-expanded={askOpen}
                onClick={openAsk}
            >
              <Icon name="ask" />
              <span>Ask me anything</span>
            </button>
            <div className="theme-switcher" role="group" aria-label="Theme mode">
              {(["system", "light", "dark"] as const).map((mode) => (
                  <button
                      className={`theme-option${themePreference === mode ? " is-active" : ""}`}
                      type="button"
                      aria-label={`Use ${mode} theme`}
                      aria-pressed={themePreference === mode}
                      title={`${mode[0].toUpperCase()}${mode.slice(1)} theme`}
                      key={mode}
                      onClick={(event) => selectTheme(mode, event.currentTarget)}
                  >
                    <Icon name={mode === "system" ? "system" : mode === "light" ? "theme" : "moon"} />
                  </button>
              ))}
            </div>
            <button
                className="sound-toggle"
                type="button"
                data-sound-toggle=""
                data-cuelume-silent=""
                aria-label={soundEnabled ? "Mute interface sounds" : "Enable interface sounds"}
                aria-pressed={soundEnabled}
                title={soundEnabled ? "Sounds on" : "Sounds off"}
                onClick={toggleSound}
            >
              <svg data-sound-on="" className="ui-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: soundEnabled ? undefined : "none" }}>
                <path d="M5 10v4h3l4 3V7L8 10H5zM16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg data-sound-off="" className="ui-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: soundEnabled ? "none" : undefined }}>
                <path d="M5 10v4h3l4 3V7L8 10H5zM16 10l5 5M21 10l-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a className="nav-email" href="mailto:nekquanico@gmail.com" aria-label="Email Ken Quanico"><Icon name="email" /><span>Email</span></a>
          </div>
        </header>

        {askOpen && (
            <div className="ask-overlay" role="dialog" aria-modal="true" aria-labelledby="ask-title">
              <button className="ask-backdrop" type="button" aria-label="Close Ask me anything" onClick={closeAsk} />
              <div
                  className="ask-content"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (askStage === "input") askInputRef.current?.focus();
                    else closeAsk();
                  }}
              >
                {askStage !== "input" && (
                    <span className="ask-bubble" aria-label={`Question: ${askQuestion}`}>
                      {askQuestion
                          .split(/\s+/)
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                    </span>
                )}

                <div className={`ask-head${askStage === "answer" ? " is-answer" : ""}`} aria-live="polite">
                  {(askStage === "analyzing" || askStage === "reveal") && <span className="ask-loader" aria-label="Analyzing" />}
                  <h2 className={`ask-title${askStage !== "input" ? " is-small" : ""}`} id="ask-title" key={askMessage}>
                    {askMessage}
                  </h2>
                </div>

                {askStage === "input" && (
                    <form className="ask-field" onSubmit={submitAsk}>
                      <input
                          ref={askInputRef}
                          value={askQuestion}
                          onChange={(event) => setAskQuestion(event.target.value)}
                          aria-label="Type your question"
                          autoComplete="off"
                          autoCapitalize="sentences"
                          spellCheck="true"
                      />
                      <button type="submit">Ask ↵</button>
                    </form>
                )}

                <p className="ask-privacy">
                  Coarse network metadata comes from ipwho.is. This site does not store it or request precise location.
                </p>
              </div>
            </div>
        )}

        <main id="main" className={pathname === "/" ? "main-home" : `main-detail${pathname.startsWith("/blog") ? " main-blog" : ""}`}>
          {pathname === "/" && <section className="hero section-shell" id="top" aria-label="Introduction">
            <div className="hero-portrait">
              <img
                  className="portrait-photo"
                  src="/images/ken-portrait.png"
                  alt="Portrait of Ken Aldrey Quanico"
              />
              <button
                  className="mobile-ask-bubble"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={askOpen}
                  onClick={openAsk}
              >
                <Icon name="ask" />
                <span>Ask me anything</span>
              </button>
            </div>

            <div className="hero-content">
              <p className="eyebrow">Software Developer</p>
              <h1 className="hero-name">Ken Aldrey Quanico</h1>
              <p className="hero-statement">I’m a Software Developer. I build modern web applications, and these days I’m focused on AI Software Engineering.</p>
              <p className="hero-intro">
                Right now I’m building new products every day. I enjoy turning rough ideas
                into reliable experiences people can actually use.
              </p>
              <div className="hero-links">
                <a href="https://github.com/kenquanico" target="_blank" rel="noreferrer">github ↗</a>
                <a href="https://www.linkedin.com/in/kenldry" target="_blank" rel="noreferrer">linkedin ↗</a>
                <a href="mailto:nekquanico@gmail.com">email ↗</a>
              </div>
              <div className="availability">
                <span className="availability-dot" aria-hidden="true" />
                Available for opportunities
              </div>
            </div>
          </section>}

          {pathname === "/" && <section className="profile-metrics section-shell" aria-label="Profile summary">
            <div className="profile-metric">
              <span>Focus</span>
              <p>AI / Full Stack</p>
            </div>
            <div className="profile-metric">
              <span>Location</span>
              <p>Bacolod, PH</p>
            </div>
            <div className="profile-metric">
              <span>Availability</span>
              <p>Open to work</p>
            </div>
            <div className="profile-metric">
              <span>Building</span>
              <p>Web + Mobile</p>
            </div>
          </section>}

          {pathname === "/stack" && <section className="capabilities section-shell page-section" id="capabilities" data-reveal>
            <div className="stack-page">
              <SectionLabel number="01" title="Stack" />
              <p className="section-intro">Technologies I use to design, build, and ship modern web, mobile, and AI-powered products.</p>
              <div className="stack-groups">
                {skillGroups.map((group) => (
                    <article className="stack-group" key={group.title}>
                      <div className="stack-group-label"><span>{group.index}</span><p>{group.title}</p></div>
                      <div className="stack-tags">
                        {group.skills.map((skill) => <span className="stack-tag" key={skill}>{skill}</span>)}
                      </div>
                    </article>
                ))}
              </div>

              <div className="tools-section">
                <SectionLabel number="02" title="Tools & Platforms" />
                <p className="section-intro">IDEs, notebooks, and design tools I rely on day to day.</p>
                <div className="tools-wall">
                  {toolsUsed.map((tool) => (
                      <div className="tool-card" key={tool.name}>
                        <img className="tool-logo" src={tool.logo} alt={`${tool.name} logo`} loading="lazy" />
                        <span>{tool.name}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>}

          {(pathname === "/" || pathname === "/projects") && <section className="projects section-shell section-rule page-section" id="projects" data-reveal>
            <div className="projects-page">
              <div className="section-heading-row">
                <SectionLabel number={pathname === "/" ? "01" : "02"} title="Selected Projects" />
                <p>Selected product interfaces demonstrating modern engineering and thoughtful execution.</p>
                {pathname === "/" && <a className="section-see-all" href="/projects">See all ↗</a>}
              </div>
              {pathname === "/" ? <div className="project-deck">
                {homepageProjects.map((project, index) => (
                    <a className={`deck-card deck-card-${index + 1}`} href={project.url} key={project.url} target="_blank" rel="noreferrer">
                      <div className="project-badges">
                        <span className="project-rank">0{index + 1} / Featured</span>
                        <span className="project-label">{project.label}</span>
                        <span>{project.category}</span>
                      </div>
                      <div className="deck-project-name"><img className={`project-logo${projectLogoClass(project.name)}`} src={project.logo} alt="" /><span>{project.name}</span></div>
                      <p>{project.description}</p>
                      <span className="deck-action">View project ↗</span>
                    </a>
                ))}
              </div> : <div className="project-groups">
                {projectLabels.map((label) => (
                    <section className="project-group" key={label} aria-labelledby={`project-${label.toLowerCase().replaceAll(" ", "-").replaceAll("/", "").replaceAll("--", "-")}`}>
                      <div className="project-group-heading">
                        <h2 id={`project-${label.toLowerCase().replaceAll(" ", "-").replaceAll("/", "").replaceAll("--", "-")}`}>{label}</h2>
                        <span>{sampleProjects.filter((project) => project.label === label).length} projects</span>
                      </div>
                      <div className="project-list" aria-label={`${label} projects`}>
                        {sampleProjects.filter((project) => project.label === label).map((project) => (
                            <a className="project-card-row" href={project.url} key={project.url} rel="noreferrer" target="_blank">
                              <div className="project-identity"><img className={`project-logo${projectLogoClass(project.name)}`} src={project.logo} alt="" /><span>{project.name}</span></div>
                              <div>
                                <span className="project-type">{project.category}</span>
                                <p>{project.description}</p>
                              </div>
                              <span className="project-arrow" aria-hidden="true">↗</span>
                            </a>
                        ))}
                      </div>
                    </section>
                ))}
              </div>}
            </div>
          </section>}

          {(pathname === "/" || pathname === "/experience") && <section className="experience section-shell section-rule page-section" id="experience" data-reveal>
            <div className="experience-page">
              <div className="section-page-heading">
                <SectionLabel number={pathname === "/" ? "02" : "03"} title="Experience" />
                {pathname === "/" && <a className="section-see-all" href="/experience">See all ↗</a>}
              </div>
              <p className="section-intro">Selected engineering, product, and design work across technology, healthcare, education, and small business.</p>
              <div className="experience-rail">
                {experiences.map((item, index) => (
                    <article className="experience-entry" key={`${item.title}-${item.date}`}>
                      <div className="experience-mark-rail"><span className="experience-mark">{item.mark}</span>{index < experiences.length - 1 && <span className="experience-line" />}</div>
                      <div className="experience-content">
                        <div className="experience-company-row"><p>{item.company}</p><span>{item.type}</span></div>
                        <p className="experience-role">{item.title}</p>
                        <p className="experience-date">{item.date} · {item.year}</p>
                        <p className="experience-description">{item.description}</p>
                        <div className="experience-skills">{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                      </div>
                    </article>
                ))}
              </div>
            </div>
          </section>}

          {(pathname === "/" || pathname === "/certifications") && <section className="certifications section-shell section-rule page-section" id="certifications" data-reveal>
            <div className="certifications-page">
              <div className="section-page-heading">
                <SectionLabel number={pathname === "/" ? "03" : "04"} title="Certifications" />
                {pathname === "/" && <a className="section-see-all" href="/certifications">See all ↗</a>}
              </div>
              <p className="section-intro">Verified credentials across software engineering, web development, machine learning, and generative AI.</p>
              {pathname === "/" ? (
                  <div className="certification-wall">
                    {homepageCertifications.map((certificate, index) => (
                        <a className="certification-card" href={certificate.url} key={certificate.url} target="_blank" rel="noreferrer" aria-label={`Verify ${certificate.title} certificate`} style={certificationCardStyle(index)} data-cuelume-hover="tick" data-cuelume-press="press" data-cuelume-release="release">
                          <span className="certification-card-frame" aria-hidden="true" />
                          <img src={certificate.logo} alt={`${certificate.issuer} logo`} />
                          <p className="certification-title">{certificate.title}</p>
                          <p className="certification-issuer">{certificate.issuer}</p>
                          <span className="certification-verify">‹ Verify ›</span>
                        </a>
                    ))}
                  </div>
              ) : (
                  <div className="certification-groups">
                    {certificationCategories.map((category) => (
                        <section className="certification-group" key={category} aria-labelledby={`certification-${category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}>
                          <div className="certification-group-heading">
                            <h2 id={`certification-${category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}>{category}</h2>
                            <span>{certifications.filter((certificate) => certificate.category === category).length} credentials</span>
                          </div>
                          <div className="certification-wall">
                            {certifications.filter((certificate) => certificate.category === category).map((certificate, index) => (
                                <a className="certification-card" href={certificate.url} key={certificate.url} target="_blank" rel="noreferrer" aria-label={`Verify ${certificate.title} certificate`} style={certificationCardStyle(index)} data-cuelume-hover="tick" data-cuelume-press="press" data-cuelume-release="release">
                                  <span className="certification-card-frame" aria-hidden="true" />
                                  <img src={certificate.logo} alt={`${certificate.issuer} logo`} />
                                  <p className="certification-title">{certificate.title}</p>
                                  <p className="certification-issuer">{certificate.issuer}</p>
                                  <span className="certification-verify">‹ Verify ›</span>
                                </a>
                            ))}
                          </div>
                        </section>
                    ))}
                  </div>
              )}
            </div>
          </section>}

          {pathname === "/" && <section className="github-section section-shell section-rule" id="github" data-reveal>
            <div className="github-heading">
              <SectionLabel number="04" title="GitHub Activity" />
              <a href="https://github.com/kenquanico" target="_blank" rel="noreferrer">See all ↗</a>
            </div>
            <a className="github-chart" href="https://github.com/kenquanico" target="_blank" rel="noreferrer" aria-label="View Ken Quanico on GitHub">
              <span className="github-months" aria-hidden="true">{githubMonths.map((month) => <span key={month}>{month}</span>)}</span>
              <span className="github-pixel-grid" aria-label="Pixel-style GitHub activity visualization">
              {githubActivity.map((activity, index) => <span className={`github-pixel level-${activity?.level ?? 0}${activity ? "" : " is-empty"}`} key={index} title={activity ? `${activity.date}: ${activity.count} contributions` : undefined} />)}
            </span>
            </a>
          </section>}

          {pathname === "/blog" && <section className="blog section-shell page-section" id="blog" data-reveal>
            <div className="blog-page">
              <div className="blog-index-heading">
                <div>
                  <h1>blog</h1>
                  <p>Thoughts, tutorials, and notes on AI, engineering, and building things.</p>
                </div>
                <div className="blog-view-toggle" role="group" aria-label="Blog layout">
                  <button
                      className={blogView === "list" ? "is-active" : ""}
                      type="button"
                      aria-label="Show posts as a list"
                      aria-pressed={blogView === "list"}
                      onClick={() => setBlogView("list")}
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3.5h2M6 3.5h8M2 8h2M6 8h8M2 12.5h2M6 12.5h8" /></svg>
                  </button>
                  <button
                      className={blogView === "grid" ? "is-active" : ""}
                      type="button"
                      aria-label="Show posts as a grid"
                      aria-pressed={blogView === "grid"}
                      onClick={() => setBlogView("grid")}
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="2.5" width="4" height="4" /><rect x="9.5" y="2.5" width="4" height="4" /><rect x="2.5" y="9.5" width="4" height="4" /><rect x="9.5" y="9.5" width="4" height="4" /></svg>
                  </button>
                </div>
              </div>
              <div className={`blog-list is-${blogView}`}>
                {blogPosts.map((post) => (
                    <a className="blog-card" href={`/blog/${post.slug}`} key={post.slug}>
                      <div className="blog-thumb" data-art={post.art} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="blog-card-copy">
                        <p className="blog-date">{post.dateLabel}</p>
                        <h2>{post.title}</h2>
                        <p className="blog-description">{post.description}</p>
                        <p className="blog-read">Read <span>·</span> {post.readLabel}</p>
                      </div>
                    </a>
                ))}
              </div>
              <nav className="blog-pagination" aria-label="Blog pages">
                <span aria-disabled="true">← prev</span>
                <span>1 / 2</span>
                <a href="/blog?page=2">next →</a>
              </nav>
            </div>
          </section>}

          {activeBlogPost && <article className="blog-article section-shell page-section" data-reveal>
            <a className="blog-back" href="/blog">‹ all posts</a>
            <header className="blog-article-header">
              <p className="blog-meta">{activeBlogPost.date} · {activeBlogPost.readTime}</p>
              <h1>{activeBlogPost.title}</h1>
              <p className="blog-dek">{activeBlogPost.description}</p>
              <div className="blog-author">
                <img src="/images/profile-icon.png" alt="" />
                <span>Ken Aldrey Quanico</span>
              </div>
            </header>

            <div className="blog-cover blog-cover-large" role="img" aria-label="Abstract dotted paths connecting around an AI core">
              <span className="blog-cover-grid" aria-hidden="true" />
              <span className="blog-cover-orbit blog-cover-orbit-one" aria-hidden="true" />
              <span className="blog-cover-orbit blog-cover-orbit-two" aria-hidden="true" />
              <span className="blog-cover-core" aria-hidden="true">AI</span>
            </div>

            <div className="blog-prose">
              {activeBlogPost.slug === featuredPost.slug ? <>
              <p>When a new AI feature feels impressive in a demo but unpredictable in daily use, the model is rarely the only thing that needs attention.</p>
              <p>The real product is the system around it: the context it receives, the actions it may take, the limits it cannot cross, and the evidence it must produce before the interface says the work is complete.</p>

              <h2>Reliability lives outside the model</h2>
              <p>A strong model can reason well and still fail inside a weak product. It can lose an important detail, call the wrong tool, repeat an action, or describe a successful outcome that never happened.</p>
              <p>That does not make the model useless. It means the application needs to turn an uncertain capability into a dependable experience.</p>

              <h2>What the product layer includes</h2>
              <p>The exact shape changes from product to product, but I look for five foundations:</p>
              <ul>
                <li>Clear tool permissions and narrowly defined actions</li>
                <li>Context that stays relevant as a task gets longer</li>
                <li>Verification against the system of record</li>
                <li>Useful recovery when an action fails or needs approval</li>
                <li>Observability that makes decisions and failures understandable</li>
              </ul>
              <p>Imagine an assistant that submits a support ticket. Reaching the final button is not proof. The product should confirm that the ticket exists, capture its identifier, and only then report success.</p>

              <blockquote>A confident answer is not the same as a completed task.</blockquote>

              <h2>Design for proof, not optimism</h2>
              <p>Good AI interfaces expose meaningful state. They tell people when work is queued, when an external service is unavailable, when approval is required, and what changed after an action ran.</p>
              <p>This makes the system feel calmer. Users do not need to guess whether the assistant understood them or whether an important action actually happened.</p>

              <h2>Why smaller systems can win</h2>
              <p>A focused model with the right context and a well-designed workflow can outperform a much larger model dropped into an open-ended prompt. The surrounding product reduces ambiguity before the model ever has to reason about it.</p>
              <p>That is where a lot of practical AI engineering now lives: not in chasing a perfect answer, but in building the conditions that make useful answers repeatable.</p>

              <h2>Closing note</h2>
              <p>The model may be the most visible part of an AI product, but dependability comes from the complete system. The best experiences make capability feel ordinary, clear, and trustworthy.</p>
              </> : <>
                <p>{activeBlogPost.description}</p>
                <p>This field note collects the decisions, tradeoffs, and practical details behind that work. The useful lessons usually appear between the polished result and the system that had to make it dependable.</p>

                <h2>Start with the real constraint</h2>
                <p>Clear constraints make product decisions easier. They help separate what must work on the first release from what can wait, and they expose the cases that deserve the most care.</p>

                <h2>Build the smallest complete loop</h2>
                <p>A focused version should still feel complete: a person can understand the state, finish the core task, and recover when something does not go as planned.</p>

                <blockquote>Small is useful when the learning loop is still complete.</blockquote>

                <h2>Closing note</h2>
                <p>The best systems make careful engineering feel ordinary. The interface stays clear, the behavior is understandable, and the product earns trust one finished interaction at a time.</p>
              </>}
            </div>

            <footer className="blog-article-footer">
              <a href="/blog">‹ all posts</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://kenquanico.com/blog/" + activeBlogPost.slug)}`} target="_blank" rel="noreferrer">Share on LinkedIn ↗</a>
            </footer>
          </article>}

          {pathname === "/documents" && <section className="documents section-shell page-section" id="documents" data-reveal>
            <div className="documents-page">
              <SectionLabel number="06" title="Documents" />
              <div className="document-list">
                {documentResources.map((document) => (
                    <article className="document-row" key={document.href}>
                      <div><p className="document-label">{document.label}</p><p className="item-title">{document.title}</p></div>
                      <p>{document.description}</p>
                      <div className="document-actions" aria-label={`${document.title} actions`}>
                        <a className="text-link" href={document.href} target="_blank" rel="noreferrer">View <span aria-hidden="true">↗</span></a>
                        <a className="text-link" href={document.href} download={document.fileName}>Download <span aria-hidden="true">↓</span></a>
                      </div>
                    </article>
                ))}
              </div>
            </div>
          </section>}

          {pathname === "/contact" && <section className="contact section-shell page-section" id="contact" data-reveal>
            <SectionLabel number="07" title="Contact" />
            <p className="eyebrow">Building a web, mobile, or AI-powered product?</p>
            <p className="contact-statement">Let’s turn the idea into a product people can rely on.</p>
            <a className="contact-email" href="mailto:nekquanico@gmail.com">
              nekquanico@gmail.com <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-footer">
              <p>Bacolod, Western Visayas, Philippines</p>
              <div>
                <a href="https://www.linkedin.com/in/kenldry" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="mailto:nekquanico@gmail.com">Email ↗</a>
              </div>
              <p>© {new Date().getFullYear()} Ken Quanico</p>
            </div>
          </section>}

          {pathname === "/" && <footer className="site-footer section-shell">
            <p>© {new Date().getFullYear()} Ken Quanico · Bacolod, PH</p>
            <div>
              <a href="https://github.com/kenquanico" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/kenldry" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="mailto:nekquanico@gmail.com">Email ↗</a>
            </div>
          </footer>}

        </main>
      </>
  );
}
