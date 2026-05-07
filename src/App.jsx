import { useEffect, useState } from "react";

const navItems = [
  { label: "about", href: "about" },
  { label: "experience", href: "experience" },
  { label: "projects", href: "projects" },
  { label: "skills", href: "skills" },
  { label: "interests", href: "interests" },
];

function getSectionIdFromPath(pathname) {
  if (pathname === "/" || pathname === "") {
    return "about";
  }

  return pathname.replace(/^\/+|\/+$/g, "") || "about";
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const topbar = document.querySelector(".topbar");
    const topbarHeight = topbar?.offsetHeight ?? 0;
    const topbarTopOffset = topbar
      ? Number.parseFloat(window.getComputedStyle(topbar).top) || 0
      : 0;
    const extraOffset = 16;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetScrollY = Math.max(
      sectionTop - topbarHeight - topbarTopOffset - extraOffset,
      0,
    );

    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  }
}

function SocialIcon({ label }) {
  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5v9h-3v-9zm.22-2.78a1.72 1.72 0 1 1-3.44 0 1.72 1.72 0 0 1 3.44 0M20.3 12.35v5.15h-3v-4.8c0-1.2-.43-2.02-1.5-2.02-.82 0-1.3.55-1.52 1.08-.08.19-.1.45-.1.72v5.02h-3v-9h3v1.28c.43-.66 1.18-1.6 2.88-1.6 2.1 0 3.24 1.38 3.24 4.17" />
      </svg>
    );
  }

  if (label === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.14-1.1-1.45-1.1-1.45-.91-.62.07-.6.07-.6 1 .07 1.54 1.04 1.54 1.04.9 1.54 2.35 1.1 2.92.85.09-.65.35-1.1.63-1.35-2.22-.26-4.56-1.11-4.56-4.95 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.84c.85 0 1.7.11 2.5.33 1.9-1.3 2.74-1.03 2.74-1.03.55 1.4.2 2.45.1 2.7.64.7 1.02 1.6 1.02 2.7 0 3.85-2.35 4.68-4.58 4.94.36.31.68.91.68 1.84v2.73c0 .27.18.58.69.48A10 10 0 0 0 12 2" />
      </svg>
    );
  }

  if (label === "Email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25zm2.1.25L12 12.1 18.9 7zM19 8.35l-6.5 4.8a.85.85 0 0 1-1 0L5 8.35v8.9c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75z" />
      </svg>
    );
  }

  return null;
}

function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [status, setStatus] = useState("loading");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const preferredTheme =
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(preferredTheme);
  }, []);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      window.history.replaceState({}, "", "/");
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadPortfolio() {
      try {
        const response = await fetch("/api/portfolio");
        if (!response.ok) {
          throw new Error("Failed to load portfolio data");
        }
        const data = await response.json();
        if (!ignore) {
          setPortfolio(data);
          setStatus("ready");
        }
      } catch (error) {
        if (!ignore) {
          setStatus("error");
        }
      }
    }

    loadPortfolio();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (status !== "ready") {
      return undefined;
    }

    const syncFromLocation = () => {
      window.requestAnimationFrame(() => {
        scrollToSection(getSectionIdFromPath(window.location.pathname));
      });
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);

    return () => {
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, [status]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  function handleSectionNavigation(event, href) {
    event.preventDefault();
    const nextPath = href === "about" ? "/" : `/${href}`;
    window.history.pushState({}, "", nextPath);
    scrollToSection(href);
  }

  if (status === "loading") {
    return <div className="app-shell loading-state">Loading portfolio...</div>;
  }

  if (status === "error" || !portfolio) {
    return (
      <div className="app-shell loading-state">
        Unable to load portfolio data. Start the backend and try again.
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="hero" id="about">
        <nav className="topbar">
          <a
            className="brand"
            href="/"
            onClick={(event) => handleSectionNavigation(event, "about")}
          >
            {"Welcome!"}
          </a>
          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href === "about" ? "/" : `/${item.href}`}
                onClick={(event) => handleSectionNavigation(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            className="theme-toggle"
            type="button"
            onClick={() =>
              setTheme((currentTheme) =>
                currentTheme === "light" ? "dark" : "light",
              )
            }
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === "light" ? (
                <svg viewBox="0 0 24 24">
                  <path d="M20.74 14.08A8.33 8.33 0 0 1 9.92 3.26a.75.75 0 0 0-.96-.92A9.82 9.82 0 1 0 21.66 15a.75.75 0 0 0-.92-.92" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M12 6.25a.75.75 0 0 1-.75-.75V3.75a.75.75 0 0 1 1.5 0V5.5a.75.75 0 0 1-.75.75m0 12.25a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.75a.75.75 0 0 1 .75-.75m5.75-5.75a.75.75 0 0 1 0-1.5H19.5a.75.75 0 0 1 0 1.5zm-12.25 0a.75.75 0 0 1 0-1.5H3.75a.75.75 0 0 1 0 1.5zm9.1 4.16a.75.75 0 0 1 1.06 0l1.24 1.24a.75.75 0 0 1-1.06 1.06l-1.24-1.24a.75.75 0 0 1 0-1.06m-7.96-7.96a.75.75 0 0 1 1.06 0l1.24 1.24a.75.75 0 1 1-1.06 1.06L6.64 10a.75.75 0 0 1 0-1.06m9.2-1.06a.75.75 0 0 1 1.06 1.06L15.66 10a.75.75 0 1 1-1.06-1.06zM8.94 15.84a.75.75 0 0 1 0 1.06L7.7 18.14a.75.75 0 0 1-1.06-1.06l1.24-1.24a.75.75 0 0 1 1.06 0M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7" />
                </svg>
              )}
            </span>
            <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
          </button>
        </nav>

        <div className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow">{portfolio.headline}</p>
            <h1>hey there!</h1>
            <p className="lead">{portfolio.summary}</p>
            <div className="profile-meta">
              <p>currently based in singapore!</p>
              <p>feel free to reach me below:</p>
            </div>
            <div className="social-row">
              {portfolio.socials.map((social) => (
                <a
                  key={social.label}
                  className="social-button"
                  href={social.href}
                  target={
                    social.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    social.href.startsWith("mailto:") ? undefined : "noreferrer"
                  }
                  aria-label={social.label}
                >
                  <span className="social-icon">
                    <SocialIcon label={social.label} />
                  </span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <aside className="profile-card">
            <img
              src={portfolio.profileImage}
              alt={`${portfolio.name} profile`}
              className="profile-image"
            />
            <div className="profile-meta">
              <h2>nice to meet you!</h2>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section className="section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>internships and experiences.</h2>
          </div>
          <div className="timeline">
            {portfolio.experience.map((item) => (
              <article
                className="timeline-card"
                key={`${item.company}-${item.role}`}
              >
                <span>{item.period}</span>
                <h3>{item.company}</h3>
                <p className="timeline-subtitle">{item.role}</p>
                <ul className="detail-list">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>stuff I've built</h2>
          </div>
          <div className="project-grid">
            {portfolio.projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-meta">
                  <span>{project.period}</span>
                  <span>{project.stack.join(" • ")}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
          <div className="projects-cta">
            <p>For more info and other projects:</p>
            <a
              className="projects-cta-button"
              href="https://github.com/javieryeow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Explore my GitHub</span>
              <span aria-hidden="true" className="projects-cta-arrow">
                →
              </span>
            </a>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>tools i use</h2>
          </div>
          <div className="skill-groups">
            {portfolio.skills.map((group) => (
              <section className="skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <div className="chip-row">
                  {group.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="section" id="interests">
          <div>
            <div className="section-heading">
              <p className="eyebrow">Beyond code</p>
              <h2>a bit about me</h2>
            </div>
            <div className="copy-stack">
              {portfolio.interests.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
