import { useMemo, useState } from "react";

const activityIcons = ["▦", "⌕", "⑂", "◫", "⚙"];

const tabs = [
  { id: "about", file: "about.jsx" },
  { id: "projects", file: "projects.jsx" },
  { id: "experience", file: "experience.jsx" },
  { id: "skills", file: "skills.jsx" },
  { id: "learning", file: "learning-teaching.jsx" },
];

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
    <>
      <div className="about-expanded-layout">
        <main className="about-expanded">
          <section className="code-intro">
            <p>
              <span className="code-pink">import</span> React <span className="code-pink">from</span>{" "}
              <span className="code-green">"react"</span>;
            </p>
            <p>
              <span className="code-pink">const</span> developer = {"{"}
            </p>
            <p>
              &nbsp;&nbsp;name: <span className="code-green">"Paresh Suthar"</span>,
            </p>
            <p>
              &nbsp;&nbsp;role: <span className="code-green">"MERN Stack Developer"</span>,
            </p>
            <p>
              &nbsp;&nbsp;status: <span className="code-green">"Open to Work"</span>
            </p>
            <p>{"};"}</p>
          </section>

          <article className="profile-top-card">
            <div className="profile-top-content">
              <p className="mini-title">ABOUT ME</p>
              <p className="profile-role">MERN Stack Developer</p>
              <h1>Paresh Suthar</h1>
              <p className="profile-location">Ahmedabad, India</p>
              <span className="availability-pill">Available for Work</span>
            </div>
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-ring">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80"
                  alt="Paresh Suthar avatar"
                  className="profile-avatar"
                />
              </div>
            </div>
          </article>

          <article className="bio-card">
            <h2>Developer Bio</h2>
            <p>
              I am a product-focused full-stack developer with strong experience across React, Node.js,
              and MongoDB ecosystems. I build clean interfaces, reliable APIs, and maintainable systems
              that scale with business growth.
            </p>

            <div className="bio-section">
              <h3>Tech Stack</h3>
              <div className="stack-chips">
                {techStack.map((item) => (
                  <span key={item} className="stack-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="social-row">
              <button className="social-btn">Email Me</button>
              <button className="social-btn">GitHub</button>
              <button className="social-btn">LinkedIn</button>
            </div>
          </article>
        </main>

        <aside className="assistant-panel">
          <div className="assistant-header">
            <h2>Paresh AI Assistant</h2>
            <span className="status-chip">Online</span>
          </div>
          <div className="messages">
            {assistantMessages.map((message, index) => (
              <div key={message} className={`bubble ${index % 2 === 1 ? "assistant" : "user"}`}>
                {message}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mobile-about-view">
        <article className="mobile-about-card">
          <div className="mobile-avatar-wrap">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=480&q=80"
              alt="Paresh Suthar avatar"
              className="mobile-avatar"
            />
            <span className="mobile-online-dot" aria-hidden="true" />
          </div>
          <h2>Paresh Suthar</h2>
          <p className="mobile-role">MERN Stack Developer</p>
          <pre className="mobile-code-block">
            <code>
              <span className="code-key">const</span> <span className="code-var">developer</span>{" "}
              <span className="code-op">=</span> {"{"}
              {"\n"}  <span className="code-prop">name</span>: <span className="code-string">"Paresh"</span>,
              {"\n"}  <span className="code-prop">tools</span>: [<span className="code-string">"React"</span>,{" "}
              <span className="code-string">"Node"</span>, <span className="code-string">"MongoDB"</span>],
              {"\n"}  <span className="code-prop">status</span>:{" "}
              <span className="code-string">"Available"</span>
              {"\n"}
              {"}"}
            </code>
          </pre>
          <p className="mobile-bio">
            I build polished full-stack products with thoughtful UX, clean architecture, and
            performance-first implementation.
          </p>
          <div className="mobile-chip-row">
            {techStack.map((item) => (
              <span key={item} className="stack-chip">
                {item}
              </span>
            ))}
          </div>
        </article>
        <button className="mobile-fab" aria-label="Open assistant">
          ?
        </button>
      </div>
    </>
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

  return (
    <div className="app-bg">
      <div className="ide-shell">
        <header className="window-bar">
          <div className="window-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <p className="window-title">portfolio — Visual Studio Code</p>
        </header>

        <div className="ide-body">
          <aside className="activity-bar">
            {activityIcons.map((icon, index) => (
              <button key={icon + index} className="activity-icon" aria-label="activity item">
                {icon}
              </button>
            ))}
          </aside>

          <aside className="explorer">
            <p className="explorer-title">EXPLORER</p>
            <p className="explorer-folder">PORTFOLIO</p>
            <ul className="file-list">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={`file-item ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") setActiveTab(tab.id);
                  }}
                >
                  <span className="file-dot" />
                  {tab.file}
                </li>
              ))}
            </ul>
          </aside>

          <section className="editor">
            <nav className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.file}
                </button>
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
