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
    skills: ["React", "Vue.js", "Next.js", "TypeScript", "Responsive UI"],
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
];

const recognition = [
  ["Mobile App Hackathon", "Tagisan ng Talino 2026", "1st Runner Up"],
  ["Research Colloquium", "Innovation recognition", "Best Innovation"],
  ["Mobile App Hackathon", "Tagisan ng Talino 2025", "1st Runner Up"],
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
          <span className="wordmark-mark">KQ</span>
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
          <a href="#experience" onClick={closeMenu}>Experience</a>
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
          <div className="hero-portrait" aria-hidden="true">
            <div className="portrait-grid" />
            <span className="portrait-initials">KQ</span>
            <span className="portrait-caption">Bacolod / PH</span>
          </div>

          <div className="hero-content">
            <p className="eyebrow">Frontend + Mobile Developer / Designer</p>
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

        <section className="experience section-shell section-rule" id="experience" data-reveal>
          <SectionLabel number="02" title="Experience" />
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
          <SectionLabel number="03" title="Capabilities" />
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

        <section className="work section-shell section-rule" id="work" data-reveal>
          <div className="section-heading-row">
            <SectionLabel number="04" title="Selected Work" />
            <p>Project links and case studies coming next.</p>
          </div>
          <div className="project-grid">
            <article className="project-card project-card-featured">
              <div className="project-visual health-visual" aria-hidden="true">
                <span className="visual-label">HEALTH / 01</span>
                <div className="health-window">
                  <div className="health-sidebar" />
                  <div className="health-content"><span /><span /><span /></div>
                </div>
                <div className="health-orbit" />
              </div>
              <div className="project-info">
                <div>
                  <p className="project-type">Frontend Development / 2025—26</p>
                  <h3>AI Healthcare Platform</h3>
                </div>
                <p>
                  A patient-centered product for finding doctors, managing appointments,
                  and navigating healthcare services.
                </p>
                <span className="project-status">Case study soon</span>
              </div>
            </article>

            <article className="project-card">
              <div className="project-visual identity-visual" aria-hidden="true">
                <span className="visual-label">IDENTITY / 02</span>
                <span className="identity-word">FORM</span>
                <span className="identity-symbol">✦</span>
              </div>
              <div className="project-info">
                <div>
                  <p className="project-type">Brand Identity / 2026</p>
                  <h3>Business Liaison Identity</h3>
                </div>
                <p>
                  A professional brand language designed to communicate trust across two
                  connected service offerings.
                </p>
                <span className="project-status">Case study soon</span>
              </div>
            </article>

            <article className="project-card">
              <div className="project-visual salon-visual" aria-hidden="true">
                <span className="visual-label">BEAUTY / 03</span>
                <span className="salon-letter">S</span>
                <div className="salon-line" />
              </div>
              <div className="project-info">
                <div>
                  <p className="project-type">Logo &amp; Graphic Design / 2025</p>
                  <h3>Beauty Lounge Branding</h3>
                </div>
                <p>
                  A feminine, scalable identity prepared for storefront signage,
                  billboards, social media, and print.
                </p>
                <span className="project-status">Case study soon</span>
              </div>
            </article>
          </div>
        </section>

        <section className="recognition section-shell section-rule" data-reveal>
          <SectionLabel number="05" title="Recognition" />
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
