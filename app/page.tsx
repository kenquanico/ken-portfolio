"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

const experiences = [
  {
    year: "2026",
    title: "Student ID Validator",
    company: "STI College",
    type: "Campus IT Support",
    mark: "STI",
    skills: ["Systems Support", "Identity Validation", "IT Operations"],
    description:
      "Supported student ID activation and entrance verification, campus IT systems, laboratory maintenance, and workstation readiness.",
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
      "Built a cohesive visual identity and marketing system for a dual-service real estate and government liaison company.",
    date: "Mar — May",
  },
  {
    year: "2025",
    title: "Frontend Developer",
    company: "Healthcare Startup",
    type: "Product Engineering",
    mark: "HC",
    skills: ["React", "TypeScript", "Healthcare UX"],
    description:
      "Developed responsive interfaces for an AI-powered healthcare platform, including doctor discovery, appointments, calendars, and medical directories.",
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
      "Designed a modern salon identity with scalable assets for signage, billboards, social media, and print.",
    date: "May",
  },
];

const skillGroups = [
  {
    index: "A",
    title: "Web Engineering",
    skills: ["JavaScript", "TypeScript", "React", "Vue.js", "Next.js", "Tailwind CSS", "Responsive Systems", "Accessibility"],
  },
  {
    index: "B",
    title: "Mobile Engineering",
    skills: [
      "React Native",
      "Cross-platform Apps",
      "API Integration",
      "Product Prototyping",
      "Performance",
    ],
  },
  {
    index: "C",
    title: "Generative AI",
    skills: ["AI Integrations", "Generative AI", "Machine Learning", "Deep Learning", "Intelligent Products"],
  },
  {
    index: "D",
    title: "Backend & Cloud",
    skills: ["PHP", "Laravel", "PostgreSQL", "REST APIs", "Cloud Platforms", "API Development"],
  },
];

const recognition = [
  ["Mobile App Hackathon", "Tagisan ng Talino 2026", "1st Runner-Up"],
  ["Research Colloquium", "Product and research innovation", "Best Innovation"],
  ["Mobile App Hackathon", "Tagisan ng Talino 2025", "1st Runner-Up"],
];

const certifications = [
  {
    title: "Software Engineering",
    issuer: "TestDome",
    logo: "/logos/testdome.svg",
    url: "https://www.testdome.com/certificates/dbd71a053d964a0386188d4355eff557",
  },
  {
    title: "Machine Learning",
    issuer: "TestDome",
    logo: "/logos/testdome.svg",
    url: "https://www.testdome.com/certificates/d76421f240084614854a9fc03a05920f",
  },
  {
    title: "TypeScript",
    issuer: "TestDome",
    logo: "/logos/testdome.svg",
    url: "https://www.testdome.com/certificates/25a7d6e6fdb14b3e88badc0fd991a09f",
  },
  {
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM",
    logo: "/logos/ibm.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/XRM1DC81TF5M",
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    logo: "/logos/ibm.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/KWPYK654VX9N",
  },
  {
    title: "Programming with JavaScript",
    issuer: "Meta",
    logo: "/logos/meta.svg",
    url: "https://www.coursera.org/account/accomplishments/verify/GVCKP54JB3Q4",
  },
  {
    title: "Google Cloud Generative AI Leader",
    issuer: "Google Cloud",
    logo: "/logos/google-cloud.svg",
    url: "https://www.coursera.org/account/accomplishments/specialization/I2INLZ6FCOMH",
  },
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

const sampleProjects = [
  {
    name: "Pathway Dark",
    category: "Landing Page",
    logo: "/project-logos/pathway-dark.svg",
    description:
      "Optimized landing page build with responsive sections, fast-loading UI patterns, clear conversion flow, and polished visual hierarchy.",
    url: "https://pathway-dark.vercel.app/",
  },
  {
    name: "Pathway Mauve",
    category: "Landing Page",
    logo: "/project-logos/pathway-mauve.svg",
    description:
      "Mobile-first marketing page focused on clean spacing, accessible contrast, SEO-friendly structure, and smooth cross-device presentation.",
    url: "https://pathway-mauve-one.vercel.app/",
  },
  {
    name: "FutureSphere",
    category: "Product Website",
    logo: "/project-logos/futuresphere.svg",
    description:
      "Modern product site with strong information architecture, performance-conscious layout, responsive content blocks, and high-impact brand storytelling.",
    url: "https://futuresphere-two.vercel.app/",
  },
  {
    name: "Vaultflow",
    category: "SaaS Website",
    logo: "/project-logos/vaultflow.svg",
    description:
      "SaaS-style interface demonstrating clear feature communication, scalable sections, conversion-focused CTAs, and production-ready responsive behavior.",
    url: "https://vaultflow-smoky.vercel.app/",
  },
  {
    name: "JustHome",
    category: "Real Estate Website",
    logo: "/project-logos/justhome.svg",
    description:
      "Real estate experience built for browsing clarity, mobile usability, visual trust, fast scanning, and structured property-focused content.",
    url: "https://justhome-five.vercel.app/",
  },
  {
    name: "TasteNet",
    category: "Food Website",
    logo: "/project-logos/tastenet-actual.svg",
    description:
      "Restaurant and discovery UI with appetite-driven visuals, intuitive navigation, mobile-first layout, and strong user flow from browse to action.",
    url: "https://tastenet-nine.vercel.app/",
  },
  {
    name: "Uifry",
    category: "Finance App Website",
    logo: "/project-logos/uifry.svg",
    description:
      "Finance app landing page emphasizing clean UI systems, SEO-ready page structure, responsive pricing/content sections, and credible product presentation.",
    url: "https://uifry-one-tan.vercel.app/",
  },
  {
    name: "DRAPÉ",
    category: "E-commerce Website",
    logo: "/project-logos/drape.svg",
    description:
      "Rebranded fashion storefront with product-led discovery, responsive shopping flows, accessible navigation, and a polished conversion-focused experience.",
    url: "https://drape-shop.vercel.app/product/8",
  },
];

const featuredProject = sampleProjects.find((project) => project.name === "DRAPÉ")!;
const remainingProjects = sampleProjects.filter((project) => project.name !== featuredProject.name);
const homepageProjects = ["DRAPÉ", "Uifry", "Vaultflow"].map(
  (name) => sampleProjects.find((project) => project.name === name)!,
);
const homepageCertifications = [
  certifications.find((certificate) => certificate.issuer === "Google Cloud")!,
  certifications.find((certificate) => certificate.issuer === "Meta")!,
  certifications.find((certificate) => certificate.issuer === "IBM" && certificate.title.includes("Artificial Intelligence"))!,
];
const githubMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function projectLogoClass(name: string) {
  if (name === "FutureSphere") return " project-logo-light-source";
  if (name === "DRAPÉ") return " project-logo-dark-source";
  return "";
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
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [githubActivity, setGithubActivity] = useState<Array<{ date: string; count: number; level: number } | null>>(
    Array.from({ length: 53 * 7 }, () => null),
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("ken-portfolio-theme");
    const initial =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;

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

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("ken-portfolio-theme", nextTheme);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Ken Aldrey Quanico, home">
          <span className="wordmark-mark" aria-hidden="true">
            <img src="/images/profile-icon.png" alt="" />
          </span>
          <span className="wordmark-name">Ken Quanico</span>
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
          <a href="/stack" onClick={closeMenu}>Stack</a>
          <a href="/projects" onClick={closeMenu}>Projects</a>
          <a href="/experience" onClick={closeMenu}>Experience</a>
          <a href="/certifications" onClick={closeMenu}>Certifications</a>
        </nav>

        <button
          className="theme-toggle"
          type="button"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "dark"}
          onClick={toggleTheme}
        >
          <span className="theme-dot" aria-hidden="true" />
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
      </header>

      <main id="main" className={pathname === "/" ? "main-home" : "main-detail"}>
        {pathname === "/" && <section className="hero section-shell" id="top" aria-label="Introduction">
          <div className="hero-portrait">
            <img
              className="portrait-photo"
              src="/images/ken-portrait.jpg"
              alt="Portrait of Ken Aldrey Quanico"
            />
            <span className="portrait-caption">Bacolod / PH</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow">Web Developer</p>
            <p className="hero-name">Ken Aldrey Quanico</p>
            <p className="hero-statement">I’m a Web Developer. I build modern web applications, and these days I’m focused on generative AI.</p>
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
                  <div className="project-badges"><span className="project-rank">0{index + 1} / Featured</span><span>{project.category}</span></div>
                  <div className="deck-project-name"><img className={`project-logo${projectLogoClass(project.name)}`} src={project.logo} alt="" /><span>{project.name}</span></div>
                  <p>{project.description}</p>
                  <span className="deck-action">View project ↗</span>
                </a>
              ))}
            </div> : <><article className="project-spotlight">
              <div className="spotlight-main">
                <img className={`project-logo project-logo-large${projectLogoClass(featuredProject.name)}`} src={featuredProject.logo} alt={`${featuredProject.name} logo`} />
                <div>
                  <div className="project-badges"><span className="project-rank">01 / Featured</span><span>{featuredProject.category}</span></div>
                  <p className="project-title">{featuredProject.name}</p>
                  <p className="project-description">{featuredProject.description}</p>
                </div>
              </div>
              <div className="spotlight-footer"><span>Responsive UI</span><span>Performance</span><span>Product Delivery</span><a href={featuredProject.url} target="_blank" rel="noreferrer">View project ↗</a></div>
            </article>
            <div className="project-list" aria-label="Selected engineering projects">
              {remainingProjects.map((project) => (
                <a className="project-card-row" href={project.url} key={project.url} rel="noreferrer" target="_blank">
                  <div className="project-identity"><img className={`project-logo${projectLogoClass(project.name)}`} src={project.logo} alt="" /><span>{project.name}</span></div>
                  <div><span className="project-type">{project.category}</span><p>{project.description}</p></div>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            </>}
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
            <div className="certification-wall">
              {(pathname === "/" ? homepageCertifications : certifications).map((certificate, index) => (
                <a className="certification-card" href={certificate.url} key={certificate.url} target="_blank" rel="noreferrer" aria-label={`Verify ${certificate.title} certificate`} style={{ "--card-rotation": `${[-2, 1.5, -1, 2, -1.5, 1, -2][index]}deg` } as CSSProperties}>
                  <span className="certification-card-frame" aria-hidden="true" />
                  <img src={certificate.logo} alt={`${certificate.issuer} logo`} />
                  <p className="certification-title">{certificate.title}</p>
                  <p className="certification-issuer">{certificate.issuer}</p>
                  <span className="certification-verify">‹ Verify ›</span>
                </a>
              ))}
            </div>
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

        {pathname === "/recognition" && <section className="recognition section-shell page-section" id="recognition" data-reveal>
          <div className="recognition-page">
            <SectionLabel number="05" title="Recognition" />
            <div className="recognition-list">
              {recognition.map(([title, subtitle, result], index) => (
                <article key={`${title}-${subtitle}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><p className="item-title">{title}</p><p>{subtitle}</p></div>
                  <span className="recognition-result">{result}</span>
                </article>
              ))}
            </div>
          </div>
        </section>}

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

      </main>
    </>
  );
}
