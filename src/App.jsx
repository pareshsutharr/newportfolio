import { useMemo, useState } from "react";
import { LuFiles } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { VscDebugAltSmall } from "react-icons/vsc";
import { VscExtensions } from "react-icons/vsc";
import { VscSourceControl } from "react-icons/vsc";
import { VscFile } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const activityIconsTop = [
  { id: "explorer", Icon: LuFiles, label: "Explorer" },
  { id: "search", Icon: IoIosSearch, label: "Search" },
  { id: "sourceControl", Icon: VscSourceControl, label: "Source Control" },
  { id: "runDebug", Icon: VscDebugAltSmall, label: "Run and Debug" },
  { id: "extensions", Icon: VscExtensions, label: "Extensions" },
];

const activityIconsBottom = [
  { id: "account", Icon: FaUserCircle, label: "Account" },
  { id: "settings", Icon: IoMdSettings, label: "Settings" },
];

const tabs = [
  { id: "about", file: "about.jsx" },
  { id: "projects", file: "projects.jsx" },
  { id: "experience", file: "experience.jsx" },
  { id: "skills", file: "skills.jsx" },
  { id: "learning", file: "learning-teaching.jsx" },
];

const explorerFiles = [
  { name: "about.jsx", badge: "JS", kind: "js", tabId: "about" },
  { name: "experience.jsx", badge: "JS", kind: "js", tabId: "experience" },
  { name: "projects.jsx", badge: "JS", kind: "js", tabId: "projects" },
  { name: "skills.jsx", badge: "JS", kind: "js", tabId: "skills" },
  { name: "learning-teaching.jsx", badge: "JS", kind: "js", tabId: "learning" },
  { name: "styles.css", badge: "CSS", kind: "css" },
  { name: "index.html", badge: "HTML", kind: "html" },
  { name: "README.md", kind: "md" },
];

const windowMenuItems = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

const techStack = ["React", "Next.js", "Node.js", "Tailwind", "MongoDB", "TypeScript"];

const assistantMessages = [
  "Hi Paresh, are you currently open to new opportunities?",
  "Yes, available for full-time and freelance MERN roles.",
  "Great. Sharing your profile with hiring teams now.",
];

const skillSections = [
  {
    title: "Frontend Development",
    items: [
      { icon: "⚛", name: "React", sub: "Component UI Systems" },
      { icon: "▲", name: "Next.js", sub: "SSR and App Router" },
      { icon: "◈", name: "Tailwind", sub: "Utility-first Styling" },
      { icon: "TS", name: "TypeScript", sub: "Typed JS at Scale" },
    ],
  },
  {
    title: "Backend & Database",
    items: [
      { icon: "⬢", name: "Node.js", sub: "Runtime and APIs" },
      { icon: "EX", name: "Express", sub: "REST Service Layer" },
      { icon: "DB", name: "MongoDB", sub: "Document Data Model" },
    ],
  },
  {
    title: "Tools & Environment",
    items: [
      { icon: "⌘", name: "Git/GitHub", sub: "Version and CI Flow" },
      { icon: "🐳", name: "Docker", sub: "Containerized Delivery" },
      { icon: "✎", name: "Figma", sub: "Design Collaboration" },
      { icon: "⚡", name: "Postman", sub: "API Validation" },
    ],
  },
];

const projects = [
  {
    title: "Ecommerce Platform",
    description: "Scalable storefront with secure checkout, admin analytics, and dynamic catalog filtering.",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1400&q=80",
    chips: ["React", "Node.js", "MongoDB", "Stripe"],
    details:
      "Implemented role-based dashboards, payment lifecycle hooks, and performance tuning for product discovery.",
  },
  {
    title: "Realtime Chat",
    description: "Socket-based team communication with channels, moderation controls, and presence updates.",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1400&q=80",
    chips: ["React", "Socket.IO", "Express", "Redis"],
    details:
      "Built message persistence with read receipts and integrated media upload with optimized delivery.",
  },
  {
    title: "TaskMaster Pro",
    description: "Collaborative task board with deadlines, assignments, and progress summaries.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=80",
    chips: ["React", "Node.js", "MongoDB", "Tailwind"],
    details:
      "Added kanban drag-drop interactions, recurring tasks, and export-ready reporting pipelines.",
  },
  {
    title: "Learning Hub LMS",
    description: "Course platform featuring lesson tracking, assessment flows, and instructor metrics.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=80",
    chips: ["Next.js", "Prisma", "PostgreSQL", "Docker"],
    details:
      "Designed modular content schemas and delivered streaming-ready video pages with engagement tracking.",
  },
];

const learningItems = [
  { title: "Advanced Next.js", tag: "SSR / RSC", progress: 78 },
  { title: "Three.js Experiences", tag: "Canvas", progress: 61 },
  { title: "AI Product Integrations", tag: "LLM", progress: 72 },
];

const teachingCards = [
  {
    title: "Build Better REST APIs with Node.js",
    description: "Designing robust route layers, validation strategies, and production error handling.",
    meta: "24K views • 1.2K likes",
  },
  {
    title: "React Performance Patterns in Real Projects",
    description: "Memoization, render optimization, and list virtualization in dashboard apps.",
    meta: "18K views • 920 likes",
  },
  {
    title: "MongoDB Data Modeling for SaaS Teams",
    description: "Schema patterns, indexing plans, and query diagnostics for growing products.",
    meta: "13K views • 740 likes",
  },
];

const experiences = [
  {
    role: "Senior MERN Developer",
    company: "TechCorp Inc.",
    range: "2022 - Present",
    bullets: [
      "Led developer productivity dashboard used by 5+ teams.",
      "Optimized backend performance by 40% using query indexing.",
      "Architected microservices using Node.js and Docker.",
    ],
    tags: ["React", "Node.js", "AWS"],
  },
  {
    role: "Full Stack Engineer",
    company: "DevSolutions LLC",
    range: "2020 - 2022",
    bullets: [
      "Built scalable REST APIs using Express.js.",
      "Integrated Stripe payment gateway securely.",
      "Mentored 2 junior developers on MERN stack.",
    ],
    tags: ["Express", "MongoDB"],
  },
  {
    role: "Frontend Developer",
    company: "WebCrafters Agency",
    range: "2019 - 2020",
    bullets: [
      "Developed pixel-perfect responsive UI components.",
      "Collaborated with UX team in Figma to launch features.",
    ],
    tags: ["React", "Tailwind"],
  },
];

function AboutPage() {
  return (
    <div className="about-vscode">
      <section className="about-code-block">
        <div className="about-path-row">
          <p>
            src <span>&gt;</span> pages <span>&gt;</span> about.jsx
          </p>
          <button className="about-properties-btn">Properties</button>
        </div>

        <div className="about-code-grid" aria-label="about.jsx code preview">
          <div className="about-code-line">
            <span className="about-line-no">1</span>
            <p>
              <span className="code-pink">import</span> React <span className="code-pink">from</span>{" "}
              <span className="code-green">'react'</span>;
            </p>
          </div>
          <div className="about-code-line">
            <span className="about-line-no">2</span>
            <p>&nbsp;</p>
          </div>
          <div className="about-code-line">
            <span className="about-line-no">3</span>
            <p>
              <span className="code-pink">const</span> <span className="code-var">developer</span>{" "}
              <span className="code-op">=</span> {"{"}
            </p>
          </div>
          <div className="about-code-line">
            <span className="about-line-no">4</span>
            <p>
              &nbsp;&nbsp;<span className="code-prop">name</span>:{" "}
              <span className="code-string">'Paresh Suthar'</span>,
            </p>
          </div>
          <div className="about-code-line">
            <span className="about-line-no">5</span>
            <p>
              &nbsp;&nbsp;<span className="code-prop">role</span>:{" "}
              <span className="code-string">'MERN Stack Developer'</span>,
            </p>
          </div>
          <div className="about-code-line">
            <span className="about-line-no">6</span>
            <p>
              &nbsp;&nbsp;<span className="code-prop">location</span>:{" "}
              <span className="code-string">'Surat, India'</span>,
            </p>
          </div>
          <div className="about-code-line">
            <span className="about-line-no">7</span>
            <p>
              &nbsp;&nbsp;<span className="code-prop">status</span>: <span className="code-string">'Open to work'</span>,
            </p>
          </div>
          <div className="about-code-line">
            <span className="about-line-no">8</span>
            <p>{"};"}</p>
          </div>
        </div>
      </section>

      <article className="about-hero-card">
        <p className="about-kicker">ABOUT ME</p>
        <div className="about-hero-inner">
          <div className="about-avatar-column">
            <div className="about-avatar-ring">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80"
                alt="Paresh Suthar avatar"
                className="about-hero-avatar"
              />
            </div>
            <span className="about-mern-tag">* MERN</span>
          </div>
          <div className="about-hero-content">
            <h1>
              Paresh
              <br />
              Suthar
            </h1>
            <p>
              Crafting robust web applications with the MERN stack. I transform complex problems
              into elegant, scalable code. Passionate about clean architecture and modern UI/UX.
            </p>
            <div className="about-cta-row">
              <button className="about-cta primary">Download CV</button>
              <button className="about-cta secondary">Contact Me</button>
            </div>
          </div>
        </div>
      </article>

      <section className="about-metrics">
        <article className="about-metric-card">
          <h3>3+</h3>
          <p>YEARS EXP</p>
        </article>
        <article className="about-metric-card">
          <h3>20+</h3>
          <p>PROJECTS</p>
        </article>
        <article className="about-metric-card">
          <h3>100%</h3>
          <p>SATISFACTION</p>
        </article>
      </section>
    </div>
  );
}

function SkillsPage() {
  return (
    <div className="skills-page">
      <header className="code-head">
        <p>// Frontend, backend and tools I work with daily</p>
      </header>
      {skillSections.map((section) => (
        <section key={section.title} className="skill-section">
          <h2>{section.title}</h2>
          <div className="skill-grid">
            {section.items.map((skill) => (
              <article key={skill.name} className="skill-tile">
                <span className="skill-icon">{skill.icon}</span>
                <div>
                  <h3>{skill.name}</h3>
                  <p>{skill.sub}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      <button className="skills-fab" aria-label="Open quick action">
        +
      </button>
    </div>
  );
}

function ProjectsPage({ onSelectProject }) {
  return (
    <div className="projects-page-v2">
      <header className="code-head">
        <p>// importing dependencies</p>
        <p>const Projects = () =&gt; {"{"} return ( &lt;div className="project-grid" /&gt; ); {"}"}</p>
      </header>
      <div className="projects-grid-v2">
        {projects.map((project) => (
          <article key={project.title} className="project-card-v2" onClick={() => onSelectProject(project)}>
            <div className="project-media">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay-actions">
                <button aria-label="View details">◉</button>
                <button aria-label="Expand project">⤢</button>
              </div>
              <h3>{project.title}</h3>
            </div>
            <div className="project-body">
              <p>{project.description}</p>
              <div className="stack-chips">
                {project.chips.map((chip) => (
                  <span key={chip} className="stack-chip">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="project-mini-dots">
                <span className="mini-dot cyan" />
                <span className="mini-dot purple" />
                <span className="mini-dot green" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ExperiencePage() {
  return (
    <div className="experience-page">
      <header className="code-head">
        <p>const ExperienceTimeline = () =&gt; {"("}</p>
      </header>
      <section className="experience-timeline">
        {experiences.map((item) => (
          <article key={item.role} className="experience-item">
            <div className="timeline-node">
              <span />
            </div>
            <div className="experience-card">
              <div className="experience-top">
                <h3>{item.role}</h3>
                <time>{item.range}</time>
              </div>
              <p className="experience-company">{item.company}</p>
              <ul>
                {item.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="stack-chips">
                {item.tags.map((tag) => (
                  <span key={tag} className="stack-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function LearningPage() {
  return (
    <div className="learning-page">
      <section className="learning-column">
        <h2>Currently Learning</h2>
        <div className="learning-list">
          {learningItems.map((item) => (
            <article key={item.title} className="learning-card">
              <div className="learning-top">
                <h3>{item.title}</h3>
                <span>{item.tag}</span>
              </div>
              <div className="progress-shell">
                <div className="progress-fill" style={{ width: `${item.progress}%` }} />
              </div>
              <p>{item.progress}% complete</p>
            </article>
          ))}
        </div>
      </section>

      <section className="teaching-column">
        <h2>Teaching / Sharing</h2>
        <div className="teaching-list">
          {teachingCards.map((video) => (
            <article key={video.title} className="video-card">
              <div className="video-thumb" />
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <span>{video.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("about");
  const [openTabIds, setOpenTabIds] = useState(() => tabs.map((tab) => tab.id));
  const [activeActivity, setActiveActivity] = useState("explorer");
  const [activeExplorerFile, setActiveExplorerFile] = useState("about.jsx");
  const [theme, setTheme] = useState("dark");
  const [openSections, setOpenSections] = useState({
    root: true,
    npm: false,
    timeline: false,
  });
  const [selectedProject, setSelectedProject] = useState(null);

  const statusLine = useMemo(() => {
    if (activeTab === "projects") return "Ln 52, Col 9";
    if (activeTab === "experience") return "Ln 29, Col 6";
    if (activeTab === "skills") return "Ln 30, Col 5";
    if (activeTab === "learning") return "Ln 41, Col 11";
    return "Ln 24, Col 17";
  }, [activeTab]);

  const renderPage = () => {
    if (activeTab === "projects") {
      return <ProjectsPage onSelectProject={setSelectedProject} />;
    }
    if (activeTab === "skills") {
      return <SkillsPage />;
    }
    if (activeTab === "experience") {
      return <ExperiencePage />;
    }
    if (activeTab === "learning") {
      return <LearningPage />;
    }
    return <AboutPage />;
  };

  const handleExplorerFileClick = (item) => {
    setActiveExplorerFile(item.name);
    if (item.tabId) {
      setOpenTabIds((previous) => (previous.includes(item.tabId) ? previous : [...previous, item.tabId]));
      setActiveTab(item.tabId);
    }
  };

  const handleCloseTab = (tabId) => {
    setOpenTabIds((previous) => {
      if (!previous.includes(tabId) || previous.length === 1) return previous;
      const next = previous.filter((id) => id !== tabId);
      if (activeTab === tabId) {
        const closedIndex = previous.indexOf(tabId);
        const fallbackTab = next[Math.min(closedIndex, next.length - 1)] || next[0];
        setActiveTab(fallbackTab || "about");
      }
      return next;
    });
  };

  const toggleSection = (sectionName) => {
    setOpenSections((previous) => ({
      ...previous,
      [sectionName]: !previous[sectionName],
    }));
  };

  const isLightTheme = theme === "light";
  const openTabs = tabs.filter((tab) => openTabIds.includes(tab.id));

  return (
    <div className={`app-bg ${isLightTheme ? "light-theme" : ""}`}>
      <div className="ide-shell">
        <header className="window-bar">
          <nav className="window-menu" aria-label="App menu">
            {windowMenuItems.map((item) => (
              <span key={item} className="window-menu-item">
                {item}
              </span>
            ))}
          </nav>
          <p className="window-title">Paresh Suthar - Visual Studio Code</p>
          <div className="window-bar-right" aria-hidden="true" />
        </header>

        <div className="ide-body">
          <aside className="activity-bar">
            {activityIconsTop.map(({ id, Icon, label }) => (
              <button
                key={id}
                className={`activity-icon ${activeActivity === id ? "active" : ""}`}
                aria-label={label}
                onClick={() => setActiveActivity(id)}
              >
                <Icon />
              </button>
            ))}
            <div className="activity-bar-bottom">
              {activityIconsBottom.map(({ id, Icon, label }) => (
                <button
                  key={id}
                  className={`activity-icon ${activeActivity === id ? "active" : ""}`}
                  aria-label={label}
                  onClick={() => setActiveActivity(id)}
                >
                  <Icon />
                </button>
              ))}
              <button
                className="activity-icon theme-toggle-btn"
                aria-label={isLightTheme ? "Switch to dark theme" : "Switch to light theme"}
                onClick={() => setTheme((previous) => (previous === "dark" ? "light" : "dark"))}
              >
                {isLightTheme ? <IoMoonOutline /> : <IoSunnyOutline />}
              </button>
            </div>
          </aside>

          <aside className="explorer">
            {activeActivity === "explorer" ? (
              <>
                <div className="explorer-header">
                  <p className="explorer-title">EXPLORER</p>
                  <button className="explorer-more" aria-label="More explorer actions">
                    ...
                  </button>
                </div>

                <div className={`explorer-section ${openSections.root ? "open" : ""}`}>
                  <button
                    className="section-toggle"
                    aria-label="Toggle PARESHSUTHAR.DEV"
                    aria-expanded={openSections.root}
                    onClick={() => toggleSection("root")}
                  >
                    <span className="section-caret">{openSections.root ? "v" : ">"}</span>
                    <span>PARESHSUTHAR.DEV</span>
                  </button>
                  {openSections.root && (
                    <ul className="file-list">
                      {explorerFiles.map((item) => (
                        <li key={item.name}>
                          <button
                            className={`file-item ${activeExplorerFile === item.name ? "active" : ""}`}
                            onClick={() => handleExplorerFileClick(item)}
                          >
                            {item.kind === "md" ? (
                              <span className="file-badge md-icon" aria-hidden="true">
                                <VscFile />
                              </span>
                            ) : (
                              <span className={`file-badge ${item.kind}`}>{item.badge}</span>
                            )}
                            <span className="file-name">{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={`explorer-section ${openSections.npm ? "open" : ""}`}>
                  <button
                    className="section-toggle"
                    aria-label="Toggle NPM scripts"
                    aria-expanded={openSections.npm}
                    onClick={() => toggleSection("npm")}
                  >
                    <span className="section-caret">{openSections.npm ? "v" : ">"}</span>
                    <span>NPM SCRIPTS</span>
                  </button>
                  {openSections.npm && <div className="section-content-empty" />}
                </div>

                <div className={`explorer-section ${openSections.timeline ? "open" : ""}`}>
                  <button
                    className="section-toggle"
                    aria-label="Toggle timeline"
                    aria-expanded={openSections.timeline}
                    onClick={() => toggleSection("timeline")}
                  >
                    <span className="section-caret">{openSections.timeline ? "v" : ">"}</span>
                    <span>TIMELINE</span>
                  </button>
                  {openSections.timeline && <div className="section-content-empty" />}
                </div>
              </>
            ) : (
              <div className="explorer-placeholder">
                <p className="explorer-title">{activeActivity.toUpperCase()}</p>
              </div>
            )}
          </aside>

          <section className="editor">
            <nav className="tabs">
              {openTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") setActiveTab(tab.id);
                  }}
                >
                  <span className="tab-badge">JS</span>
                  <span className="tab-label">{tab.file}</span>
                  <button
                    type="button"
                    className={`tab-close ${activeTab === tab.id ? "visible" : ""}`}
                    aria-label={`Close ${tab.file}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleCloseTab(tab.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </nav>

            <div className="editor-content">{renderPage()}</div>
          </section>
        </div>

        <footer className="status-bar">
          <span>main</span>
          <span>UTF-8</span>
          <span>JavaScript React</span>
          <span>{statusLine}</span>
        </footer>
      </div>

      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true">
          <div className="project-modal-card">
            <button className="project-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close">
              ✕
            </button>
            <img src={selectedProject.image} alt={selectedProject.title} />
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.details}</p>
            <div className="stack-chips">
              {selectedProject.chips.map((chip) => (
                <span key={chip} className="stack-chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <button className="project-modal-backdrop" onClick={() => setSelectedProject(null)} aria-label="Close" />
        </div>
      )}
    </div>
  );
}

export default App;





