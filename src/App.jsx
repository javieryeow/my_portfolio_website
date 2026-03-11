import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Education", href: "education" },
  { label: "Skills", href: "skills" },
  { label: "Interests", href: "interests" },
  { label: "Contact", href: "contact" },
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
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [status, setStatus] = useState("loading");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactState, setContactState] = useState({
    loading: false,
    message: "",
    error: false,
  });

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

  function handleSectionNavigation(event, href) {
    event.preventDefault();
    const nextPath = href === "about" ? "/" : `/${href}`;
    window.history.pushState({}, "", nextPath);
    scrollToSection(href);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setContactState({ loading: true, message: "", error: false });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message");
      }

      setContactState({ loading: false, message: data.message, error: false });
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      setContactState({
        loading: false,
        message: error.message,
        error: true,
      });
    }
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
            {portfolio.name}
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
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{portfolio.headline}</p>
            <h1>Hello!</h1>
            <p className="lead">{portfolio.summary}</p>
            <div className="hero-actions">
              <a
                className="button primary"
                href="/projects"
                onClick={(event) => handleSectionNavigation(event, "projects")}
              >
                View projects
              </a>
              <a
                className="button secondary"
                href="/contact"
                onClick={(event) => handleSectionNavigation(event, "contact")}
              >
                Contact me
              </a>
            </div>
            <ul className="stat-row">
              {portfolio.highlights.map((item) => (
                <li key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="profile-card">
            <img
              src={portfolio.profileImage}
              alt={`${portfolio.name} profile`}
              className="profile-image"
            />
            <div className="profile-meta">
              <h2>{portfolio.name}</h2>
              <p>{portfolio.location}</p>
              <a href={`tel:${portfolio.phone.replace(/\s+/g, "")}`}>{portfolio.phone}</a>
              <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
            </div>
            <div className="social-row">
              {portfolio.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section className="section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Internships and research across engineering, ML, and fintech.</h2>
          </div>
          <div className="timeline">
            {portfolio.experience.map((item) => (
              <article className="timeline-card" key={`${item.company}-${item.role}`}>
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
            <h2>Projects with full-stack, data, and product depth.</h2>
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
        </section>

        <section className="section two-column" id="education">
          <div>
            <div className="section-heading">
              <p className="eyebrow">Education</p>
              <h2>Academic foundation built for systems and fintech.</h2>
            </div>
            <div className="timeline">
              {portfolio.education.map((item) => (
                <article className="timeline-card" key={item.school}>
                  <span>{item.period}</span>
                  <h3>{item.school}</h3>
                  <p className="timeline-subtitle">{item.program}</p>
                  <p>{item.details}</p>
                  <strong>{item.result}</strong>
                </article>
              ))}
            </div>
          </div>

          <div id="skills">
            <div className="section-heading">
              <p className="eyebrow">Skills</p>
              <h2>Tools, languages, and ways of working.</h2>
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
          </div>
        </section>

        <section className="section two-column" id="interests">
          <div>
            <div className="section-heading">
              <p className="eyebrow">Beyond code</p>
              <h2>Interests that shape how I build and collaborate.</h2>
            </div>
            <div className="copy-stack">
              {portfolio.interests.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div>
            <div className="section-heading">
              <p className="eyebrow">Recognition</p>
              <h2>Awards and hackathons.</h2>
            </div>
            <ul className="award-list">
              {portfolio.awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Send a message through the backend.</h2>
          </div>
          <div className="contact-layout">
            <div className="contact-copy">
              <p>
                This form posts to an Express endpoint, validates input, and
                returns a response that can later be wired to email, a database,
                or a CRM.
              </p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  rows="5"
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  required
                />
              </label>
              <button
                className="button primary"
                type="submit"
                disabled={contactState.loading}
              >
                {contactState.loading ? "Sending..." : "Send message"}
              </button>
              {contactState.message ? (
                <p
                  className={
                    contactState.error ? "form-message error" : "form-message"
                  }
                >
                  {contactState.message}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
