"use client";

import { useEffect, useState } from "react";

const experiences = [
  {
    year: "2026",
    title: "Student ID Validator",
    company: "STI College",
    description:
      "Supported student ID activation and entrance verification, campus IT systems, laboratory maintenance, and workstation readiness.",
    date: "Apr — May",
  },
  {
    year: "2026",
    title: "Freelance Graphic & Logo Designer",
    company: "Small Business Liaison Team",
    description:
      "Built a cohesive visual identity and marketing system for a dual-service real estate and government liaison company.",
    date: "Mar — May",
  },
  {
    year: "2025",
    title: "Frontend Developer",
    company: "Healthcare Startup",
    description:
      "Developed responsive interfaces for an AI-powered healthcare platform, including doctor discovery, appointments, calendars, and medical directories.",
    date: "Aug — Mar ’26",
  },
  {
    year: "2025",
    title: "Freelance Graphic Designer",
    company: "Small Business Beauty Lounge",
    description:
      "Designed a modern salon identity with scalable assets for signage, billboards, social media, and print.",
    date: "May",
  },
];

const skillGroups = [
  {
    index: "A",
    title: "Frontend",
    skills: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS", "Figma"],
  },
  {
    index: "B",
    title: "Mobile & AI",
    skills: [
      "React Native",
      "AI integrations",
      "Deep learning",
      "Product prototyping",
      "Performance",
    ],
  },
  {
    index: "C",
    title: "Visual Design",
    skills: ["Brand identity", "Logo design", "UI design", "Graphic design", "Design systems"],
  },
  {
    index: "D",
    title: "Backend & Cloud",
    skills: ["PHP", "Laravel", "PostgreSQL", "Cloud platforms", "API development"],
  },
];

const recognition = [
  ["Mobile App Hackathon", "Tagisan ng Talino 2026", "1st Runner Up"],
  ["Research Colloquium", "Innovation recognition", "Best Innovation"],
  ["Mobile App Hackathon", "Tagisan ng Talino 2025", "1st Runner Up"],
];

const certifications = [
  {
    title: "Software Engineering",
    url: "https://www.testdome.com/certificates/dbd71a053d964a0386188d4355eff557",
  },
  {
    title: "Machine Learning",
    url: "https://www.testdome.com/certificates/d76421f240084614854a9fc03a05920f",
  },
  {
    title: "TypeScript",
    url: "https://www.testdome.com/certificates/25a7d6e6fdb14b3e88badc0fd991a09f",
  },
  {
    title: "Introduction to Artificial Intelligence (AI)",
    url: "https://www.coursera.org/account/accomplishments/verify/XRM1DC81TF5M",
  },
  {
    title: "Introduction to Software Engineering",
    url: "https://www.coursera.org/account/accomplishments/verify/KWPYK654VX9N",
  },
  {
    title: "Programming with JavaScript",
    url: "https://www.coursera.org/account/accomplishments/verify/GVCKP54JB3Q4",
  },
  {
    title: "Deep Learning Specialization",
    url: "https://www.coursera.org/account/accomplishments/specialization/I2INLZ6FCOMH",
  },
];

const documentResources = [
  {
    title: "Resume",
    label: "Career Snapshot",
    description:
      "A concise PDF summary of my web development and project experience.",
    href: "/docs/kenldry-resume.pdf",
    fileName: "kenldry-resume.pdf",
  },
  {
    title: "Capstone Study",
    label: "Final Manuscript",
    description:
      "My full capstone manuscript, including the research background, methodology, system work, and results.",
    href: "/docs/itmawd-12b-quanico-final-manuscript.pdf",
    fileName: "itmawd-12b-quanico-final-manuscript.pdf",
  },
];

const sampleProjects = [
  {
    name: "Pathway Dark",
    category: "Landing Page",
    description:
      "Optimized landing page build with responsive sections, fast-loading UI patterns, clear conversion flow, and polished visual hierarchy.",
    url: "https://pathway-dark.vercel.app/",
  },
  {
    name: "Pathway Mauve",
    category: "Landing Page",
    description:
      "Mobile-first marketing page focused on clean spacing, accessible contrast, SEO-friendly structure, and smooth cross-device presentation.",
    url: "https://pathway-mauve-one.vercel.app/",
  },
  {
    name: "FutureSphere",
    category: "Product Website",
    description:
      "Modern product site with strong information architecture, performance-conscious layout, responsive content blocks, and high-impact brand storytelling.",
    url: "https://futuresphere-two.vercel.app/",
  },
  {
    name: "Vaultflow",
    category: "SaaS Website",
    description:
      "SaaS-style interface demonstrating clear feature communication, scalable sections, conversion-focused CTAs, and production-ready responsive behavior.",
    url: "https://vaultflow-smoky.vercel.app/",
  },
  {
    name: "JustHome",
    category: "Real Estate Website",
    description:
      "Real estate experience built for browsing clarity, mobile usability, visual trust, fast scanning, and structured property-focused content.",
    url: "https://justhome-five.vercel.app/",
  },
  {
    name: "TasteNet",
    category: "Food Website",
    description:
      "Restaurant and discovery UI with appetite-driven visuals, intuitive navigation, mobile-first layout, and strong user flow from browse to action.",
    url: "https://tastenet-nine.vercel.app/",
  },
  {
    name: "Uifry",
    category: "Finance App Website",
    description:
      "Finance app landing page emphasizing clean UI systems, SEO-ready page structure, responsive pricing/content sections, and credible product presentation.",
    url: "https://uifry-one-tan.vercel.app/",
  },
  {
    name: "Shop.co",
    category: "E-commerce Website",
    description:
      "E-commerce storefront sample with product-led layout, mobile shopping patterns, accessible navigation, and a conversion-aware browsing experience.",
    url: "https://shopco-kappa-three.vercel.app/",
  },
];

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("ken-portfolio-theme");
    const initial =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
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
        <a className="wordmark" href="#top" aria-label="Ken Aldrey Quanico, home">
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
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#documents" onClick={closeMenu}>Documents</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#certifications" onClick={closeMenu}>Certifications</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
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

      <main id="main">
        <section className="hero section-shell" id="top">
          <div className="hero-portrait">
            <img
              className="portrait-photo"
              src="/images/ken-portrait.jpg"
              alt="Portrait of Ken Aldrey Quanico"
            />
            <span className="portrait-caption">Bacolod / PH</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow">Web Developer / Designer</p>
            <h1>
              I build digital products that feel
              <span className="hero-emphasis">clear, useful, and alive.</span>
            </h1>
            <p className="hero-intro">
              I’m Ken Aldrey Quanico, a developer and visual designer based in Bacolod. I
              turn ideas into responsive web experiences, mobile applications, and
              thoughtful brand systems.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="mailto:nekquanico@gmail.com">
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
              <a
                className="button button-secondary"
                href="https://www.linkedin.com/in/kenldry"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="availability">
              <span className="availability-dot" aria-hidden="true" />
              Open to collaborations and new opportunities
            </div>
          </div>
        </section>

        <section className="about section-shell section-rule" id="about" data-reveal>
          <SectionLabel number="01" title="About" />
          <div className="about-copy">
            <p className="lead">
              I bridge design and implementation to make products that are both
              technically sound and visually polished.
            </p>
            <div className="copy-columns">
              <p>
                My work spans React, TypeScript, React Native, modern frontend
                development, and AI-powered applications. I care about clean,
                maintainable code, accessibility, and performance—the quieter details that
                make an experience dependable.
              </p>
              <p>
                A background in branding, logo design, and graphic design lets me think
                beyond individual screens. I enjoy collaborating across disciplines and
                turning complex needs into interfaces people can understand quickly.
              </p>
            </div>
          </div>
          <aside className="profile-card" aria-label="Profile summary">
            <p className="profile-card-kicker">Profile / 2026</p>
            <div className="profile-monogram">KQ</div>
            <div>
              <p className="profile-name">Ken Aldrey<br />Quanico</p>
              <p className="profile-role">Developer<br />&amp; Designer</p>
            </div>
            <p className="profile-place">10.6765° N<br />122.9509° E</p>
          </aside>
        </section>

        <section className="documents section-shell section-rule" id="documents" data-reveal>
          <SectionLabel number="02" title="Documents" />
          <div className="document-list">
            {documentResources.map((document) => (
              <article className="document-card" key={document.href}>
                <div>
                  <p className="document-label">{document.label}</p>
                  <h3>{document.title}</h3>
                  <p>{document.description}</p>
                </div>
                <div className="document-actions" aria-label={`${document.title} actions`}>
                  <a
                    className="button button-secondary"
                    href={document.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    className="button button-primary"
                    href={document.href}
                    download={document.fileName}
                  >
                    Download <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section-shell section-rule" id="experience" data-reveal>
          <SectionLabel number="03" title="Experience" />
          <div className="timeline">
            {experiences.map((item) => (
              <article className="timeline-item" key={`${item.title}-${item.date}`}>
                <div className="timeline-year">{item.year}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p>{item.description}</p>
                </div>
                <span className="timeline-meta">{item.date}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section-shell section-rule" data-reveal>
          <SectionLabel number="04" title="Capabilities" />
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <p className="skill-index">{group.index}</p>
                <h3>{group.title}</h3>
                <ul>
                  {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          className="certifications section-shell section-rule"
          id="certifications"
          data-reveal
        >
          <SectionLabel number="05" title="Certifications" />
          <div className="certification-list">
            {certifications.map((certificate) => (
              <article className="certification-card" key={certificate.url}>
                <h3>{certificate.title}</h3>
                <a
                  className="certification-link"
                  href={certificate.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${certificate.title} certificate`}
                >
                  View <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="work section-shell section-rule" id="work" data-reveal>
          <div className="section-heading-row">
            <SectionLabel number="06" title="Sample Projects" />
            <p>Live website samples available to open and review.</p>
          </div>
          <div className="project-table" role="table" aria-label="Live sample projects">
            <div className="project-table-head" role="row">
              <span role="columnheader">Project</span>
              <span role="columnheader">Type</span>
              <span role="columnheader">Focus</span>
              <span role="columnheader">Link</span>
            </div>
            {sampleProjects.map((project, index) => (
              <a
                className="project-row"
                href={project.url}
                key={project.url}
                rel="noreferrer"
                role="row"
                target="_blank"
              >
                <span className="project-name" role="cell">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.name}
                </span>
                <span role="cell">{project.category}</span>
                <p className="project-description" role="cell">{project.description}</p>
                <span className="project-link" role="cell">
                  Visit site <span aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="recognition section-shell section-rule" data-reveal>
          <SectionLabel number="07" title="Recognition" />
          <div className="recognition-list">
            {recognition.map(([title, subtitle, result], index) => (
              <article key={`${title}-${subtitle}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{subtitle}</p></div>
                <strong>{result}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section-shell" id="contact" data-reveal>
          <p className="eyebrow">Have a project, role, or idea in mind?</p>
          <h2>Let’s make something<br />worth remembering.</h2>
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
        </section>
      </main>
    </>
  );
}
