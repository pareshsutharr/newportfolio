import { useEffect, useMemo, useRef, useState } from "react";
import { LuFiles } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { VscDebugAltSmall } from "react-icons/vsc";
import { VscExtensions } from "react-icons/vsc";
import { VscSourceControl } from "react-icons/vsc";
import { VscFile } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoEllipsisHorizontal, IoMoonOutline, IoSend, IoSunnyOutline } from "react-icons/io5";

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
      { icon: "âš›", name: "React", sub: "Component UI Systems" },
      { icon: "â–²", name: "Next.js", sub: "SSR and App Router" },
      { icon: "â—ˆ", name: "Tailwind", sub: "Utility-first Styling" },
      { icon: "TS", name: "TypeScript", sub: "Typed JS at Scale" },
    ],
  },
  {
    title: "Backend & Database",
    items: [
      { icon: "â¬¢", name: "Node.js", sub: "Runtime and APIs" },
      { icon: "EX", name: "Express", sub: "REST Service Layer" },
      { icon: "DB", name: "MongoDB", sub: "Document Data Model" },
    ],
  },
  {
    title: "Tools & Environment",
    items: [
      { icon: "âŒ˜", name: "Git/GitHub", sub: "Version and CI Flow" },
      { icon: "ðŸ³", name: "Docker", sub: "Containerized Delivery" },
      { icon: "âœŽ", name: "Figma", sub: "Design Collaboration" },
      { icon: "âš¡", name: "Postman", sub: "API Validation" },
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
    title: "PHP Playlist",
    src: "https://www.youtube.com/embed/videoseries?si=vA5DuKB_1VMKlquS&list=PLHyFeSflLq6aZmT6G4emoemU7SNUkBVM8",
    meta: "Playlist â€¢ Created by Paresh",
  },
  {
    title: "JavaScript Playlist",
    src: "https://www.youtube.com/embed/videoseries?si=tnzCalbTqYdiOOIc&list=PLHyFeSflLq6Z8XidX56rMqC1RDcBkngMO",
    meta: "Playlist â€¢ Created by Paresh",
  },
  {
    title: "jQuery Playlist",
    src: "https://www.youtube.com/embed/videoseries?si=gG4tv6KtYGpQ99OW&list=PLHyFeSflLq6Yt_8g9v03LddZDx_7duF8P",
    meta: "Playlist â€¢ Created by Paresh",
  },
  {
    title: "Java Playlist",
    src: "https://www.youtube.com/embed/videoseries?si=wd3EGb6r5S5jnsnx&list=PLHyFeSflLq6ZEkK9g1KCGDh_BM8rAcedK",
    meta: "Playlist â€¢ Created by Paresh",
  },
  {
    title: "JSON Video",
    src: "https://www.youtube.com/embed/vS_hGh9sJKc?si=croa2ZGNILqd08DN",
    meta: "Single Video â€¢ Created by Paresh",
  },
  {
    title: "AJAX Video",
    src: "https://www.youtube.com/embed/4YBE_ElEW_c?si=EVUjVKKkNuUWrJ08",
    meta: "Single Video â€¢ Created by Paresh",
  },
  {
    title: "HTML CSS Full Video",
    src: "https://www.youtube.com/embed/D-abUJUGcpA?si=ktg2f0VovH74Qk_m",
    meta: "Single Video â€¢ Created by Paresh",
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

const profileSummary = {
  name: "Paresh Suthar",
  role: "MERN Stack Developer",
  location: "Surat, India",
  status: "Open to work",
  yearsExperience: "3+ years",
  projectCount: "20+ projects",
  satisfaction: "100% client satisfaction",
  bio: "Crafting robust web applications with the MERN stack and clean, scalable architecture.",
};

const portfolioDocs = [
  { file: "about.jsx", summary: "Profile intro, location, availability status, and quick bio." },
  { file: "experience.jsx", summary: "Work timeline, companies, role impact, and stack tags." },
  { file: "projects.jsx", summary: "Project cards with descriptions, stacks, and implementation details." },
  { file: "skills.jsx", summary: "Frontend, backend, and tooling skills grouped by capability area." },
  { file: "learning-teaching.jsx", summary: "Current learning roadmap and teaching/shared YouTube content." },
  { file: "styles.css", summary: "Full theme and UI styling for the VS Code inspired portfolio layout." },
  { file: "index.html", summary: "Base app mount point and document setup for the portfolio." },
  { file: "README.md", summary: "Project setup and usage information." },
];

function includesAny(value, keywords) {
  return keywords.some((keyword) => value.includes(keyword));
}

function toBulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function getChatbotReply(question) {
  const query = question.toLowerCase().trim();

  if (!query) {
    return {
      text: "Ask me about the CV, projects, skills, experience, or any portfolio tab document.",
      tags: ["#CV", "#Projects", "#Skills"],
    };
  }

  const matchedDoc = portfolioDocs.find((doc) => query.includes(doc.file.toLowerCase()));
  if (matchedDoc) {
    return {
      text: `${matchedDoc.file}\n${matchedDoc.summary}`,
      tags: ["#Docs"],
    };
  }

  if (includesAny(query, ["hi", "hello", "hey"])) {
    return {
      text: "Hello! I can answer from the CV and all tab documents. Ask about profile, skills, projects, experience, learning, or a specific file like about.jsx.",
      tags: ["#Assistant"],
    };
  }

  if (includesAny(query, ["all details", "all detail", "everything", "full cv", "complete cv"])) {
    const skillNames = skillSections.flatMap((section) => section.items.map((item) => item.name));
    const projectNames = projects.map((project) => project.title);
    const experienceRoles = experiences.map((item) => `${item.role} (${item.range})`);
    return {
      text: `Complete CV Snapshot\nName: ${profileSummary.name}\nRole: ${profileSummary.role}\nLocation: ${profileSummary.location}\nStatus: ${profileSummary.status}\nExperience: ${profileSummary.yearsExperience}\nProjects: ${profileSummary.projectCount}\n\nKey Skills\n${toBulletList(skillNames)}\n\nExperience Timeline\n${toBulletList(
        experienceRoles
      )}\n\nProject Portfolio\n${toBulletList(projectNames)}\n\nAvailable Documents\n${toBulletList(
        portfolioDocs.map((doc) => doc.file)
      )}`,
      tags: ["#CV", "#Summary", "#Docs"],
    };
  }

  if (
    includesAny(query, [
      "paresh",
      "cv",
      "resume",
      "about",
      "profile",
      "who is",
      "name",
      "location",
      "status",
      "open to work",
    ])
  ) {
    return {
      text: `${profileSummary.name}\nRole: ${profileSummary.role}\nLocation: ${profileSummary.location}\nStatus: ${profileSummary.status}\nExperience: ${profileSummary.yearsExperience}\nProjects: ${profileSummary.projectCount}\nSatisfaction: ${profileSummary.satisfaction}\n\n${profileSummary.bio}`,
      tags: ["#CV", "#About"],
    };
  }

  if (includesAny(query, ["experience", "work", "career", "company"])) {
    const lines = experiences.map(
      (item) => `${item.role} at ${item.company} (${item.range}) - ${item.bullets[0]}`
    );
    return {
      text: `Experience Summary\n${toBulletList(lines)}`,
      tags: ["#Experience"],
    };
  }

  if (includesAny(query, ["project", "projects", "portfolio", "built", "build"])) {
    const projectLines = projects.map(
      (project) => `${project.title}: ${project.description} [${project.chips.join(", ")}]`
    );
    return {
      text: `Projects\n${toBulletList(projectLines)}`,
      tags: ["#Projects"],
    };
  }

  if (includesAny(query, ["skill", "skills", "stack", "technology", "technologies", "tech"])) {
    const skillLines = skillSections.map((section) => {
      const skillNames = section.items.map((skill) => skill.name).join(", ");
      return `${section.title}: ${skillNames}`;
    });
    return {
      text: `Skills\n${toBulletList(skillLines)}`,
      tags: ["#Skills", "#MERN"],
    };
  }

  if (includesAny(query, ["learning", "teaching", "playlist", "youtube"])) {
    const learningLines = learningItems.map((item) => `${item.title} (${item.progress}% complete)`);
    const teachingLines = teachingCards.slice(0, 4).map((card) => `${card.title} - ${card.meta}`);
    return {
      text: `Learning\n${toBulletList(learningLines)}\n\nTeaching / Sharing\n${toBulletList(
        teachingLines
      )}\n- +${Math.max(teachingCards.length - 4, 0)} more resources`,
      tags: ["#Learning", "#Teaching"],
    };
  }

  if (includesAny(query, ["contact", "hire", "available"])) {
    return {
      text: `${profileSummary.name} is currently ${profileSummary.status.toLowerCase()} for full-time and freelance MERN opportunities.`,
      tags: ["#Contact", "#Availability"],
    };
  }

  const matchedProject = projects.find((project) => query.includes(project.title.toLowerCase()));
  if (matchedProject) {
    return {
      text: `${matchedProject.title}\n${matchedProject.description}\n${matchedProject.details}\nStack: ${matchedProject.chips.join(
        ", "
      )}`,
      tags: ["#ProjectDetail"],
    };
  }

  return {
    text: "I could not map that exactly. Try asking: 'show CV summary', 'skills', 'experience', 'projects', 'learning', or a file name like 'experience.jsx'.",
    tags: ["#Help"],
  };
}

function createChatMessage(role, text, tags = []) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    author: role === "assistant" ? "Paresh AI Assistant" : "Visitor",
    text,
    tags,
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

function AboutPage() {
  return (
    <div className="about-vscode">
      <main className="about-main">
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
                &nbsp;&nbsp;<span className="code-prop">status</span>:{" "}
                <span className="code-string">'Open to work'</span>,
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
      </main>
    </div>
  );
}

function AboutChatbot() {
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState(() => [
    createChatMessage(
      "assistant",
      "Hello! Ask me anything from the CV or tab files: about.jsx, experience.jsx, projects.jsx, skills.jsx, or learning-teaching.jsx.",
      ["#CV", "#Docs"]
    ),
  ]);
  const delayRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isThinking]);

  useEffect(
    () => () => {
      if (delayRef.current) {
        clearTimeout(delayRef.current);
      }
    },
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const userMessage = draft.trim();
    if (!userMessage || isThinking) return;

    setMessages((previous) => [...previous, createChatMessage("user", userMessage)]);
    setDraft("");
    setIsThinking(true);

    const reply = getChatbotReply(userMessage);
    delayRef.current = setTimeout(() => {
      setMessages((previous) => [...previous, createChatMessage("assistant", reply.text, reply.tags)]);
      setIsThinking(false);
    }, 450);
  };

  return (
    <aside className="about-chatbot" aria-label="Paresh AI chatbot">
      <div className="chatbot-appbar">
        <div className="chatbot-brand">
          <FaRobot className="chatbot-brand-icon" aria-hidden="true" />
          <p>Paresh AI</p>
        </div>
        <div className="chatbot-appbar-actions">
          <button className="chatbot-appbar-btn" aria-label="Chat theme">
            <IoMoonOutline />
          </button>
          <button className="chatbot-appbar-btn" aria-label="Chat settings">
            <IoEllipsisHorizontal />
          </button>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-turn ${message.role}`}>
            <div className={`chat-meta ${message.role === "user" ? "user" : ""}`}>
              {message.role === "assistant" ? (
                <>
                  <FaRobot className="chatbot-avatar" aria-hidden="true" />
                  <p>{message.author}</p>
                  <span className="chat-meta-time">{message.time}</span>
                </>
              ) : (
                <>
                  <p>{message.author}</p>
                  <span className="chat-meta-time">{message.time}</span>
                  <span className="chat-user-chip" aria-hidden="true">
                    <FaUserCircle />
                  </span>
                </>
              )}
            </div>
            <div className={`chat-msg ${message.role}`}>
              <p>{message.text}</p>
              {message.tags.length > 0 && (
                <div className="chat-tags">
                  {message.tags.map((tag) => (
                    <span key={`${message.id}-${tag}`}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="chat-turn assistant typing">
            <div className="chat-meta">
              <FaRobot className="chatbot-avatar" aria-hidden="true" />
              <p>Paresh AI Assistant</p>
            </div>
            <div className="chat-msg assistant chat-typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form className="chatbot-input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask about Paresh..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          disabled={isThinking}
        />
        <button type="submit" aria-label="Send message" disabled={isThinking || !draft.trim()}>
          <IoSend />
        </button>
      </form>
    </aside>
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
  const projectGridLineNumbers = Array.from({ length: 28 }, (_, index) => index + 8);

  return (
    <div className="projects-page-v2">
      <header className="projects-code-head">
        <div className="projects-path-row">
          <p>
            src <span>&gt;</span> projects.jsx
          </p>
          <span className="projects-path-meta">Ln 12, Col 45</span>
        </div>
        <div className="projects-code-grid" aria-label="projects.jsx code preview">
          <div className="projects-code-line">
            <span className="projects-code-no">1</span>
            <p>
              <span className="code-pink">import</span> {"{"} <span className="code-var">ProjectCard</span> {"}"}{" "}
              <span className="code-pink">from</span> <span className="code-green">'../components/Card'</span>;
            </p>
          </div>
          <div className="projects-code-line">
            <span className="projects-code-no">2</span>
            <p>
              <span className="code-pink">import</span> {"{"} <span className="code-var">Container</span> {"}"}{" "}
              <span className="code-pink">from</span> <span className="code-green">'../layout/Grid'</span>;
            </p>
          </div>
          <div className="projects-code-line">
            <span className="projects-code-no">3</span>
            <p>&nbsp;</p>
          </div>
          <div className="projects-code-line">
            <span className="projects-code-no">4</span>
            <p className="projects-code-note">// Explore my latest work below</p>
          </div>
          <div className="projects-code-line">
            <span className="projects-code-no">5</span>
            <p>
              <span className="code-pink">const</span> <span className="code-var">Projects</span>{" "}
              <span className="code-op">=</span> <span className="code-op">()</span> <span className="code-op">=&gt;</span>{" "}
              <span className="code-op">{"{"}</span>
            </p>
          </div>
          <div className="projects-code-line">
            <span className="projects-code-no">6</span>
            <p>
              &nbsp;&nbsp;<span className="code-pink">return</span> <span className="code-op">(</span>
            </p>
          </div>
          <div className="projects-code-line">
            <span className="projects-code-no">7</span>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-op">&lt;</span>
              <span className="code-var">Container</span> <span className="code-prop">className</span>
              <span className="code-op">=</span>
              <span className="code-green">"grid-layout"</span>
              <span className="code-op">&gt;</span>
            </p>
          </div>
        </div>
      </header>
      <div className="projects-grid-shell">
        <ol className="projects-grid-lines" aria-hidden="true">
          {projectGridLineNumbers.map((lineNumber) => (
            <li key={lineNumber}>{lineNumber}</li>
          ))}
        </ol>
        <div className="projects-grid-v2">
          {projects.map((project) => (
            <article key={project.title} className="project-card-v2" onClick={() => onSelectProject(project)}>
              <div className="project-media">
                <img src={project.image} alt={project.title} />
                <div className="project-chip-row">
                  {project.chips.slice(0, 2).map((chip) => (
                    <span key={`${project.title}-${chip}`} className="project-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-body">
                <h3>{`<${project.title.replace(/[^a-zA-Z0-9]/g, "")} />`}</h3>
                <p className="project-comment">
                  {`/*\n* ${project.description}\n* ${project.details}\n*/`}
                </p>
                <div className="project-card-foot">
                  <span className="project-foot-link">&lt;&gt; Source</span>
                  <span className="project-foot-link">[] Demo</span>
                  <div className="project-mini-dots">
                    <span className="mini-dot cyan" />
                    <span className="mini-dot purple" />
                    <span className="mini-dot green" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
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
              <div className="video-embed">
                <iframe
                  src={video.src}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
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
  const tabsNav = (
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
            &times;
          </button>
        </div>
      ))}
    </nav>
  );

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

          <section className={`editor ${activeTab === "about" ? "editor-about" : ""}`}>
            {activeTab === "about" ? (
              <div className="editor-about-shell">
                <div className="editor-about-main">
                  {tabsNav}
                  <div className="editor-content">
                    <AboutPage />
                  </div>
                </div>
                <AboutChatbot />
              </div>
            ) : (
              <>
                {tabsNav}
                <div className="editor-content">{renderPage()}</div>
              </>
            )}
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
              âœ•
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






