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
import snakeCoverImage from "./assets/snake-cover.svg";

const STORAGE_KEYS = {
  theme: "vsPortfolio.theme",
  activeTab: "vsPortfolio.activeTab",
  openTabs: "vsPortfolio.openTabs",
};

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
  { id: "idle", file: "idle.jsx" },
  { id: "game", file: "game.jsx" },
];

const explorerFiles = [
  { name: "about.jsx", badge: "JS", kind: "js", tabId: "about" },
  { name: "experience.jsx", badge: "JS", kind: "js", tabId: "experience" },
  { name: "projects.jsx", badge: "JS", kind: "js", tabId: "projects" },
  { name: "skills.jsx", badge: "JS", kind: "js", tabId: "skills" },
  { name: "learning-teaching.jsx", badge: "JS", kind: "js", tabId: "learning" },
  { name: "idle.jsx", badge: "JS", kind: "js", tabId: "idle" },
  { name: "game.jsx", badge: "JS", kind: "js", tabId: "game" },
  { name: "styles.css", badge: "CSS", kind: "css" },
  { name: "index.html", badge: "HTML", kind: "html" },
  { name: "README.md", kind: "md" },
];

const npmScripts = [
  { name: "dev", command: "vite" },
  { name: "build", command: "vite build" },
  { name: "preview", command: "vite preview" },
];

const windowMenuItems = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

const skillSections = [
  {
    title: "Frontend Development",
    items: [
      { icon: "R", name: "React", sub: "Component UI Systems" },
      { icon: "N", name: "Next.js", sub: "SSR and App Router" },
      { icon: "TW", name: "Tailwind", sub: "Utility-first Styling" },
      { icon: "TS", name: "TypeScript", sub: "Typed JS at Scale" },
    ],
  },
  {
    title: "Backend & Database",
    items: [
      { icon: "ND", name: "Node.js", sub: "Runtime and APIs" },
      { icon: "EX", name: "Express", sub: "REST Service Layer" },
      { icon: "DB", name: "MongoDB", sub: "Document Data Model" },
    ],
  },
  {
    title: "Tools & Environment",
    items: [
      { icon: "GH", name: "Git/GitHub", sub: "Version and CI Flow" },
      { icon: "DK", name: "Docker", sub: "Containerized Delivery" },
      { icon: "FG", name: "Figma", sub: "Design Collaboration" },
      { icon: "PM", name: "Postman", sub: "API Validation" },
    ],
  },
];

const projects = [
  {
    title: "ECommercePlatform",
    description:
      "Full-stack MERN application with Redux state management, Stripe payment gateway integration, and real-time inventory tracking.",
    commentLines: [
      "Full-stack MERN",
      "application with Redux",
      "state management, Stripe",
      "payment gateway",
      "integration, and real-time",
      "inventory tracking.",
    ],
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1400&q=80",
    chips: ["React", "Node"],
    details:
      "Implemented role-based dashboards, secure payment workflows, and real-time inventory monitoring with scalable state management.",
    dotColors: ["#f3c323", "#3d8dff"],
  },
  {
    title: "RealTimeChat",
    description:
      "A socket.io based chat application supporting private rooms, media sharing, and read receipts. Features a mobile-first responsive design.",
    commentLines: [
      "A socket.io based chat",
      "application supporting",
      "private rooms, media",
      "sharing, and read",
      "receipts. Features a",
      "mobile-first responsive",
      "design.",
    ],
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1400&q=80",
    chips: ["Firebase", "Tailwind"],
    details:
      "Built a robust realtime architecture with private channels, notification states, and media delivery optimized for mobile and desktop.",
    dotColors: ["#4a8cff", "#995eff"],
  },
  {
    title: "TaskMaster",
    description:
      "Productivity tool for developers. Kanban boards, time tracking, and Git integration. Uses Supabase for real-time data sync.",
    commentLines: [
      "Productivity tool for",
      "developers. Kanban boards,",
      "time tracking, and Git",
      "integration. Uses Supabase",
      "for real-time data sync.",
    ],
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=80",
    chips: ["Vue", "Supabase"],
    details:
      "Delivered workflow automation with drag-drop kanban interactions, sprint timelines, and realtime collaboration sync.",
    dotColors: ["#2edd87", "#f0c525"],
  },
  {
    title: "NFTMarket",
    description:
      "Web3 marketplace prototype with wallet authentication, collection listings, and secure on-chain metadata retrieval.",
    commentLines: [
      "Web3 marketplace prototype",
      "with wallet auth, curated",
      "collection listings, and",
      "secure metadata retrieval.",
    ],
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&q=80",
    chips: ["Web3", "React"],
    details:
      "Built wallet-connect onboarding, metadata indexers, and interaction flows designed for fast trading and collection discovery.",
    dotColors: ["#39a3ff", "#7b58ff"],
  },
  {
    title: "SocialGrid",
    description:
      "Social app concept with post composer, live reactions, and feed ranking powered by lightweight GraphQL queries.",
    commentLines: [
      "Social app with live feed",
      "updates, creator profiles,",
      "and ranking powered by",
      "lean GraphQL queries.",
    ],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    chips: ["Next.js", "GraphQL"],
    details:
      "Implemented timeline ranking, optimistic updates, and modular APIs for creator posts and community interactions.",
    dotColors: ["#48a7ff", "#db7bff"],
  },
];

const learningItems = [
  { title: "Advanced Next.js", tag: "SSR/RSC", progress: 85, focus: "Mastering Server Actions", icon: "[]", accent: "#448aff" },
  { title: "3D WebGL (Three.js)", tag: "Canvas", progress: 60, focus: "Shaders & Physics", icon: "<>", accent: "#a565f8" },
  { title: "AI Integrations", tag: "LLM", progress: 40, focus: "Agents & Embeddings", icon: "AI", accent: "#2ed47a" },
];

const teachingCards = [
  {
    title: "MERN Stack Basics: From Scratch",
    src: "https://www.youtube.com/embed/videoseries?si=vA5DuKB_1VMKlquS&list=PLHyFeSflLq6aZmT6G4emoemU7SNUkBVM8",
    meta: "Featured Video",
    description: "Complete walkthrough of building a full-stack application using MongoDB, Express, React, and Node.js.",
    thumbnail:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=1280&q=80",
    duration: "12:45",
    views: "12K views",
    likes: "450 likes",
  },
  {
    title: "Redux Toolkit Guide 2024",
    src: "https://www.youtube.com/embed/videoseries?si=tnzCalbTqYdiOOIc&list=PLHyFeSflLq6Z8XidX56rMqC1RDcBkngMO",
    meta: "Featured Video",
    description: "State management does not have to be hard. Learn the modern way to handle state in React.",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1280&q=80",
    duration: "08:20",
    views: "8.5K views",
    likes: "320 likes",
  },
  {
    title: "jQuery Playlist",
    src: "https://www.youtube.com/embed/videoseries?si=gG4tv6KtYGpQ99OW&list=PLHyFeSflLq6Yt_8g9v03LddZDx_7duF8P",
    meta: "Playlist - Created by Paresh",
  },
  {
    title: "Java Playlist",
    src: "https://www.youtube.com/embed/videoseries?si=wd3EGb6r5S5jnsnx&list=PLHyFeSflLq6ZEkK9g1KCGDh_BM8rAcedK",
    meta: "Playlist - Created by Paresh",
  },
  {
    title: "JSON Video",
    src: "https://www.youtube.com/embed/vS_hGh9sJKc?si=croa2ZGNILqd08DN",
    meta: "Single Video - Created by Paresh",
  },
  {
    title: "AJAX Video",
    src: "https://www.youtube.com/embed/4YBE_ElEW_c?si=EVUjVKKkNuUWrJ08",
    meta: "Single Video - Created by Paresh",
  },
  {
    title: "HTML CSS Full Video",
    src: "https://www.youtube.com/embed/D-abUJUGcpA?si=ktg2f0VovH74Qk_m",
    meta: "Single Video - Created by Paresh",
  },
];

const experiences = [
  {
    role: "Senior MERN Developer",
    company: "TechCorp Inc.",
    range: "2022 - Present",
    bullets: [
      "Lead developer for enterprise dashboard used by 50k+ users.",
      "Optimised React performance by 40% using memoization.",
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
      "Integrated Stripe payment gateways securely.",
      "Mentored 2 junior developers on MERN stack.",
    ],
    tags: ["Express", "MongoDB"],
  },
  {
    role: "Frontend Developer",
    company: "WebCreative Agency",
    range: "2019 - 2020",
    bullets: [
      "Developed pixel-perfect responsive UI components.",
      "Collaborated with UX team on Figma to code handoff.",
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
  { file: "idle.jsx", summary: "Interactive code playground with language dropdown and runnable snippets." },
  { file: "game.jsx", summary: "Game zone with playable Nokia Snake and upcoming game slots." },
  { file: "styles.css", summary: "Full theme and UI styling for the VS Code inspired portfolio layout." },
  { file: "index.html", summary: "Base app mount point and document setup for the portfolio." },
  { file: "README.md", summary: "Project setup and usage information." },
];

const extensionPicks = [
  {
    name: "ESLint",
    author: "Microsoft",
    installs: "37M+",
    description: "Lint JavaScript and TypeScript in real time.",
  },
  {
    name: "Prettier",
    author: "Prettier",
    installs: "42M+",
    description: "Auto-format source files on save with stable style rules.",
  },
  {
    name: "Error Lens",
    author: "Alexander",
    installs: "2M+",
    description: "Inline diagnostics directly in the code editor.",
  },
  {
    name: "GitLens",
    author: "GitKraken",
    installs: "31M+",
    description: "Rich Git blame and commit timeline details.",
  },
];

const sourceControlChangesSeed = [
  { id: "1", path: "src/App.jsx", type: "M", note: "Added activity center panels" },
  { id: "2", path: "src/styles.css", type: "M", note: "Styled explorer and command palette" },
  { id: "3", path: "README.md", type: "A", note: "Documented keyboard shortcuts" },
];

const debugProfiles = [
  { id: "react", name: "Launch React App", command: "npm run dev" },
  { id: "preview", name: "Preview Build", command: "npm run preview" },
  { id: "test", name: "Run Unit Tests", command: "npm test" },
];

const languageSnippets = [
  {
    id: "javascript",
    label: "JavaScript",
    extension: "js",
    code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet("Paresh");
console.log(message);`,
    output: "Hello, Paresh!",
  },
  {
    id: "typescript",
    label: "TypeScript",
    extension: "ts",
    code: `type User = {
  name: string;
  active: boolean;
};

const user: User = { name: "Paresh", active: true };
console.log(user.name, user.active);`,
    output: "Paresh true",
  },
  {
    id: "python",
    label: "Python",
    extension: "py",
    code: `def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)

print(factorial(5))`,
    output: "120",
  },
  {
    id: "java",
    label: "Java",
    extension: "java",
    code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java");
  }
}`,
    output: "Hello from Java",
  },
  {
    id: "cpp",
    label: "C++",
    extension: "cpp",
    code: `#include <iostream>
using namespace std;

int main() {
  cout << "C++ demo running" << endl;
  return 0;
}`,
    output: "C++ demo running",
  },
  {
    id: "go",
    label: "Go",
    extension: "go",
    code: `package main
import "fmt"

func main() {
  fmt.Println("Go says hi")
}`,
    output: "Go says hi",
  },
  {
    id: "php",
    label: "PHP",
    extension: "php",
    code: `<?php
$name = "Paresh";
echo "Hello " . $name;
?>`,
    output: "Hello Paresh",
  },
  {
    id: "sql",
    label: "SQL",
    extension: "sql",
    code: `SELECT name, role
FROM developers
WHERE stack = 'MERN'
ORDER BY years_experience DESC;`,
    output: "Query executed successfully (3 rows)",
  },
  {
    id: "html",
    label: "HTML",
    extension: "html",
    code: `<!doctype html>
<html>
  <body>
    <h1>Portfolio Preview</h1>
    <p>Hello from HTML demo.</p>
  </body>
</html>`,
    output: "HTML rendered",
  },
  {
    id: "css",
    label: "CSS",
    extension: "css",
    code: `.card {
  border-radius: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: #fff;
}`,
    output: "Styles applied to .card",
  },
];

function stringifyLogValue(value) {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function runJavaScript(code) {
  const logs = [];
  const consoleProxy = {
    log: (...args) => logs.push(args.map(stringifyLogValue).join(" ")),
    error: (...args) => logs.push(args.map(stringifyLogValue).join(" ")),
    warn: (...args) => logs.push(args.map(stringifyLogValue).join(" ")),
  };

  let runner;
  try {
    runner = new Function("console", code);
  } catch (error) {
    return { ok: false, output: `Compile error: ${error?.message || "Invalid JavaScript syntax."}` };
  }

  try {
    runner(consoleProxy);
    return {
      ok: true,
      output: logs.length > 0 ? logs.join("\n") : "Compiled and executed successfully (no console output).",
    };
  } catch (error) {
    return { ok: false, output: `Runtime error: ${error?.message || "Execution failed."}` };
  }
}

function checkBalancedDelimiters(code) {
  const stack = [];
  const openerToCloser = { "(": ")", "{": "}", "[": "]" };
  const closersToOpeners = { ")": "(", "}": "{", "]": "[" };
  const closers = new Set(Object.keys(closersToOpeners));
  let quote = null;

  for (let index = 0; index < code.length; index += 1) {
    const char = code[index];
    const previous = code[index - 1];

    if (quote) {
      if (char === quote && previous !== "\\") quote = null;
      continue;
    }

    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      continue;
    }

    if (openerToCloser[char]) {
      stack.push(char);
      continue;
    }

    if (closers.has(char)) {
      const expectedOpen = closersToOpeners[char];
      const foundOpen = stack.pop();
      if (foundOpen !== expectedOpen) return `Mismatched delimiter near '${char}'.`;
    }
  }

  if (quote) return "Unclosed string literal found.";
  if (stack.length > 0) return "Unclosed delimiter found.";
  return null;
}

function validateLanguageSyntax(languageId, code) {
  const lines = code.split("\n").map((line) => line.trim()).filter(Boolean);

  if (languageId === "python") {
    const invalidBlockLine = lines.find((line) =>
      /^(def|if|elif|else|for|while|class|try|except|finally)\b/.test(line) && !line.endsWith(":")
    );
    if (invalidBlockLine) return "Python block statements should end with ':'.";
  }

  if (languageId === "sql") {
    const firstLine = lines[0]?.toLowerCase() || "";
    if (!/^(select|insert|update|delete|create|alter|drop|with)\b/.test(firstLine)) {
      return "SQL query should start with a valid SQL keyword.";
    }
    if (!code.trim().endsWith(";")) return "SQL query must end with ';'.";
  }

  if (languageId === "html") {
    const hasOpenHtml = /<html[\s>]/i.test(code);
    const hasCloseHtml = /<\/html>/i.test(code);
    if (hasOpenHtml !== hasCloseHtml) return "Unclosed <html> tag found.";
  }

  return null;
}

function extractSimulatedOutput(languageId, code, fallbackOutput) {
  const lines = code.split("\n");

  if (languageId === "typescript") {
    const logs = lines
      .map((line) => line.match(/console\.log\((.*)\)/)?.[1])
      .filter(Boolean)
      .map((value) => value.replace(/^["'`]|["'`]$/g, ""));
    return logs.length > 0 ? logs.join("\n") : "TypeScript compiled successfully.";
  }

  if (languageId === "python") {
    const prints = lines
      .map((line) => line.match(/print\((.*)\)/)?.[1])
      .filter(Boolean)
      .map((value) => value.replace(/^["'`]|["'`]$/g, ""));
    return prints.length > 0 ? prints.join("\n") : "Python compiled successfully.";
  }

  if (languageId === "java") {
    const prints = lines
      .map((line) => line.match(/System\.out\.println\((.*)\)/)?.[1])
      .filter(Boolean)
      .map((value) => value.replace(/^["'`]|["'`]$/g, ""));
    return prints.length > 0 ? prints.join("\n") : "Java compiled successfully.";
  }

  if (languageId === "cpp") {
    const prints = lines.map((line) => line.match(/cout\s*<<\s*["'](.*?)["']/)?.[1]).filter(Boolean);
    return prints.length > 0 ? prints.join("\n") : "C++ compiled successfully.";
  }

  if (languageId === "go") {
    const prints = lines
      .map((line) => line.match(/fmt\.Println\((.*)\)/)?.[1])
      .filter(Boolean)
      .map((value) => value.replace(/^["'`]|["'`]$/g, ""));
    return prints.length > 0 ? prints.join("\n") : "Go compiled successfully.";
  }

  if (languageId === "php") {
    const echoes = lines.map((line) => line.match(/echo\s+["'](.*?)["']/)?.[1]).filter(Boolean);
    return echoes.length > 0 ? echoes.join("\n") : "PHP compiled successfully.";
  }

  if (languageId === "sql") return "SQL compiled successfully. Query is ready to run.";
  if (languageId === "html") return "HTML compiled successfully. Preview is ready.";
  if (languageId === "css") return "CSS compiled successfully. Stylesheet is valid.";

  return fallbackOutput;
}

function compileAndRunSnippet(snippet, code) {
  const delimiterError = checkBalancedDelimiters(code);
  if (delimiterError) return { ok: false, output: `Compile error: ${delimiterError}` };

  const syntaxError = validateLanguageSyntax(snippet.id, code);
  if (syntaxError) return { ok: false, output: `Compile error: ${syntaxError}` };

  if (snippet.id === "javascript") return runJavaScript(code);
  return { ok: true, output: extractSimulatedOutput(snippet.id, code, snippet.output) };
}

function includesAny(value, keywords) {
  return keywords.some((keyword) => value.includes(keyword));
}

function toBulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function safeLoad(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
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
      text: `Complete CV Snapshot\nName: ${profileSummary.name}\nRole: ${profileSummary.role}\nLocation: ${profileSummary.location}\nStatus: ${profileSummary.status}\nExperience: ${profileSummary.yearsExperience}\nProjects: ${profileSummary.projectCount}\n\nKey Skills\n${toBulletList(skillNames)}\n\nExperience Timeline\n${toBulletList(experienceRoles)}\n\nProject Portfolio\n${toBulletList(projectNames)}\n\nAvailable Documents\n${toBulletList(
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
                &nbsp;&nbsp;<span className="code-prop">name</span>: <span className="code-string">'Paresh Suthar'</span>,
              </p>
            </div>
            <div className="about-code-line">
              <span className="about-line-no">5</span>
              <p>
                &nbsp;&nbsp;<span className="code-prop">role</span>: <span className="code-string">'MERN Stack Developer'</span>,
              </p>
            </div>
            <div className="about-code-line">
              <span className="about-line-no">6</span>
              <p>
                &nbsp;&nbsp;<span className="code-prop">location</span>: <span className="code-string">'Surat, India'</span>,
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
      if (delayRef.current) clearTimeout(delayRef.current);
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
  const lineNumbers = Array.from({ length: 30 }, (_, index) => index + 1);
  const sectionCodeMap = {
    "Frontend Development": { open: "export const FRONTEND_STACK = [", close: "];" },
    "Backend & Database": { open: "const SERVER_SIDE = {", close: "};" },
    "Tools & Environment": { open: "async function loadTools() {", close: "}" },
  };

  return (
    <div className="skills-page-v2">
      <header className="skills-code-head">
        <div className="skills-path-row">
          <p>
            src <span>&gt;</span> components <span>&gt;</span> skills.jsx
          </p>
          <span className="skills-path-meta">Ln 14, Col 42</span>
        </div>
      </header>

      <div className="skills-editor-shell">
        <ol className="skills-line-numbers" aria-hidden="true">
          {lineNumbers.map((lineNo) => (
            <li key={lineNo}>{lineNo}</li>
          ))}
        </ol>

        <div className="skills-editor-content">
          <div className="skills-import-lines">
            <p>
              <span className="code-pink">import</span> <span className="code-op">{"{"}</span>{" "}
              <span className="code-var">motion</span> <span className="code-op">{"}"}</span>{" "}
              <span className="code-pink">from</span> <span className="code-green">&quot;framer-motion&quot;</span>;
            </p>
            <p>
              <span className="code-pink">import</span> <span className="code-op">{"{"}</span>{" "}
              <span className="code-var">SkillCard</span> <span className="code-op">{"}"}</span>{" "}
              <span className="code-pink">from</span> <span className="code-green">&quot;./components/SkillCard&quot;</span>;
            </p>
          </div>

          {skillSections.map((section) => {
            const sectionCode = sectionCodeMap[section.title] || { open: "const SKILLS = [", close: "];" };
            return (
              <section key={section.title} className="skill-section-v2">
                <div className="skill-section-title-row">
                  <h2>{`// ${section.title}`}</h2>
                </div>

                <p className="skill-section-code">{sectionCode.open}</p>

                <div className="skill-grid-v2">
                  {section.items.map((skill) => (
                    <article key={skill.name} className="skill-tile-v2">
                      <span className="skill-icon-v2">{skill.icon}</span>
                      <div className="skill-meta-v2">
                        <h3>{`"${skill.name}"`}</h3>
                        <p>{skill.sub}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <p className="skill-section-code skill-section-code-close">{sectionCode.close}</p>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage({ onSelectProject }) {
  const projectGridLineNumbers = Array.from({ length: 8 }, (_, index) => index + 8);

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
              <span className="code-op">=</span> <span className="code-op">()</span>{" "}
              <span className="code-op">=&gt;</span> <span className="code-op">(</span>
            </p>
          </div>
          <div className="projects-code-line">
            <span className="projects-code-no">6</span>
            <p>
              <span className="code-pink">return</span> <span className="code-op">(</span>
            </p>
          </div>
          <div className="projects-code-line">
            <span className="projects-code-no">7</span>
            <p>
              <span className="code-op">&lt;</span>
              <span className="code-var">Container</span> <span className="code-prop">className</span>
              <span className="code-op">=</span>
              <span className="code-green">&quot;grid-layout&quot;</span>
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
                <h3>{`<${project.title} />`}</h3>
                <p className="project-comment">
                  {`/**\n* ${project.commentLines.join(" ")}\n*/`}
                </p>
                <div className="project-card-foot">
                  <span className="project-foot-link">
                    <span className="project-foot-icon">&lt;&gt;</span> Source
                  </span>
                  <span className="project-foot-link">
                    <span className="project-foot-icon">↗</span> Demo
                  </span>
                  <div className="project-mini-dots">
                    {project.dotColors.map((dotColor, index) => (
                      <span key={`${project.title}-dot-${index}`} className="mini-dot" style={{ backgroundColor: dotColor }} />
                    ))}
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
  const renderBulletText = (point) => {
    const emphasisToken = "40%";
    if (!point.includes(emphasisToken)) return point;
    const [before, after] = point.split(emphasisToken);
    return (
      <>
        {before}
        <span className="experience-emphasis">{emphasisToken}</span>
        {after}
      </>
    );
  };

  return (
    <div className="experience-page-v2">
      <header className="experience-code-head">
        <div className="experience-path-row">
          <p>
            src <span>&gt;</span> pages <span>&gt;</span> experience.jsx
          </p>
          <span className="experience-path-meta">Ln 42, Col 15</span>
        </div>
        <div className="experience-code-grid" aria-label="experience.jsx code preview">
          <div className="experience-code-line">
            <span className="experience-code-no">1</span>
            <p>
              <span className="code-pink">const</span> <span className="code-var">ExperienceTimeline</span>{" "}
              <span className="code-op">=</span> <span className="code-op">()</span> <span className="code-op">=&gt;</span>{" "}
              <span className="code-op">{"{"}</span>
            </p>
          </div>
          <div className="experience-code-line">
            <span className="experience-code-no">2</span>
            <p className="experience-code-note">// Rendering professional journey...</p>
          </div>
          <div className="experience-code-line">
            <span className="experience-code-no">3</span>
            <p>
              <span className="code-pink">return</span> <span className="code-op">(</span>
            </p>
          </div>
        </div>
      </header>

      <section className="experience-timeline-v2">
        {experiences.map((item) => (
          <article key={item.role} className="experience-item-v2">
            <div className="experience-marker-col" />

            <div className="experience-card-v2">
              <div className="experience-top-v2">
                <h3>
                  {item.role}
                </h3>
                <time>{item.range}</time>
              </div>

              <p className="experience-company-v2">{item.company}</p>

              <ul className="experience-points-v2">
                {item.bullets.map((point) => (
                  <li key={point}>{renderBulletText(point)}</li>
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
  const learningLineNumbers = Array.from({ length: 30 }, (_, index) => index + 1);
  const learningTags = ["#typescript", "#performance", "#architecture"];

  return (
    <div className="learning-page-v2">
      <header className="learning-code-head">
        <div className="learning-path-row">
          <p>
            src <span>&gt;</span> pages <span>&gt;</span> learning-teaching.jsx
          </p>
          <span className="learning-path-meta">Ln 42, Col 18</span>
        </div>
      </header>

      <div className="learning-editor-shell">
        <ol className="learning-line-numbers" aria-hidden="true">
          {learningLineNumbers.map((lineNo) => (
            <li key={lineNo}>{lineNo}</li>
          ))}
        </ol>

        <div className="learning-main-grid">
          <section className="learning-column-v2">
            <h2>
              <span>##</span> Currently Learning
            </h2>
            <p className="learning-intro-v2">
              &gt; Deep diving into advanced topics to stay ahead of the curve. Exploring the bleeding edge of web tech.
            </p>

            <div className="learning-list-v2">
              {learningItems.map((item) => (
                <article key={item.title} className="learning-card-v2">
                  <div className="learning-card-top-v2">
                    <span className="learning-icon-v2">{item.icon}</span>
                    <h3>{item.title}</h3>
                    <span className="learning-tag-v2">{item.tag}</span>
                  </div>
                  <div className="learning-progress-shell-v2">
                    <div className="learning-progress-fill-v2" style={{ width: `${item.progress}%`, background: item.accent }} />
                  </div>
                  <div className="learning-card-bottom-v2">
                    <p>{item.focus}</p>
                    <strong>{item.progress}%</strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="learning-topic-tags-v2">
              {learningTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>

          <section className="teaching-column-v2">
            <h2>
              <span>##</span> Teaching / Sharing
            </h2>
            <p className="learning-intro-v2">
              &gt; Sharing knowledge through tutorials and open source contributions. Check out my latest content.
            </p>

            <div className="teaching-list-v2">
              {teachingCards.slice(0, 2).map((video) => (
                <article key={video.title} className="teaching-card-v2">
                  <div className="teaching-thumb-v2">
                    <img src={video.thumbnail} alt={video.title} />
                    <span className="teaching-duration-v2">{video.duration}</span>
                  </div>
                  <div className="teaching-info-v2">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <div className="teaching-stats-v2">
                      <span>{video.views}</span>
                      <span>{video.likes}</span>
                      <span className="teaching-play-v2">▶</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function IdlePage() {
  const [selectedLanguageId, setSelectedLanguageId] = useState(languageSnippets[0].id);
  const [runOutput, setRunOutput] = useState("Click Compile & Run to execute the selected snippet.");
  const [runStatus, setRunStatus] = useState("idle");
  const [runCount, setRunCount] = useState(0);
  const [editableCode, setEditableCode] = useState(languageSnippets[0].code);

  const selectedSnippet = useMemo(
    () => languageSnippets.find((snippet) => snippet.id === selectedLanguageId) || languageSnippets[0],
    [selectedLanguageId]
  );

  useEffect(() => {
    setEditableCode(selectedSnippet.code);
    setRunOutput(`Ready: ${selectedSnippet.label} demo loaded.`);
    setRunStatus("idle");
  }, [selectedSnippet]);

  const runSnippet = () => {
    const codeToRun = editableCode.trim();
    setRunCount((previous) => previous + 1);

    if (!codeToRun) {
      setRunStatus("error");
      setRunOutput("No code to execute. Please write code first.");
      return;
    }

    try {
      const result = compileAndRunSnippet(selectedSnippet, codeToRun);
      if (!result.ok) {
        setRunStatus("error");
        setRunOutput(result.output);
        return;
      }
      setRunStatus("success");
      setRunOutput(result.output);
    } catch (error) {
      setRunStatus("error");
      setRunOutput(`Execution error: ${error?.message || "Unknown error"}`);
    }
  };

  const handleEditorKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      runSnippet();
    }
  };

  return (
    <div className="idle-page">
      <header className="code-head">
        <p>// idle.jsx - Language demo playground</p>
      </header>

      <section className="idle-controls">
        <label htmlFor="languageSelect">Select language</label>
        <select
          id="languageSelect"
          value={selectedLanguageId}
          onChange={(event) => setSelectedLanguageId(event.target.value)}
        >
          {languageSnippets.map((snippet) => (
            <option key={snippet.id} value={snippet.id}>
              {snippet.label}
            </option>
          ))}
        </select>
        <button type="button" onClick={runSnippet}>
          Compile & Run
        </button>
      </section>

      <section className="idle-editor-shell" aria-label="Code demo editor">
        <div className="idle-editor-top">
          <span>{`demo.${selectedSnippet.extension}`}</span>
          <span>{selectedSnippet.label} - Editable</span>
        </div>
        <textarea
          className="idle-code-editor"
          value={editableCode}
          onChange={(event) => setEditableCode(event.target.value)}
          onKeyDown={handleEditorKeyDown}
          spellCheck={false}
          aria-label={`${selectedSnippet.label} code editor`}
        />
      </section>

      <section className="idle-output-shell" aria-live="polite">
        <h3>Output</h3>
        <p className="idle-output-meta">
          {runStatus === "success"
            ? "Status: Compiled"
            : runStatus === "error"
              ? "Status: Compile Error"
              : "Status: Ready"}{" "}
          | Runs: {runCount} | Shortcut: Ctrl/Cmd + Enter
        </p>
        <pre className={`idle-output-text ${runStatus}`}>{runOutput}</pre>
      </section>
    </div>
  );
}

const SNAKE_GRID_SIZE = 16;
const SNAKE_TICK_MS = 130;
const SNAKE_STORAGE_KEYS = {
  player: "vsPortfolio.snake.player",
  leaderboard: "vsPortfolio.snake.leaderboard",
};
const SNAKE_START = [
  { x: 5, y: 8 },
  { x: 4, y: 8 },
  { x: 3, y: 8 },
];
const SNAKE_DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

function toSnakeKey(cell) {
  return `${cell.x},${cell.y}`;
}

function spawnSnakeFood(snake) {
  const occupied = new Set(snake.map(toSnakeKey));
  while (true) {
    const candidate = {
      x: Math.floor(Math.random() * SNAKE_GRID_SIZE),
      y: Math.floor(Math.random() * SNAKE_GRID_SIZE),
    };
    if (!occupied.has(toSnakeKey(candidate))) return candidate;
  }
}

function isOppositeDirection(current, next) {
  return current.x + next.x === 0 && current.y + next.y === 0;
}

function loadSnakeLeaderboard() {
  const loaded = safeLoad(SNAKE_STORAGE_KEYS.leaderboard, []);
  return Array.isArray(loaded) ? loaded : [];
}

function SnakeGame({ playerName, highestEntry, onSaveScore, onBack }) {
  const [snake, setSnake] = useState(SNAKE_START);
  const [queuedDirection, setQueuedDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState(() => spawnSnakeFood(SNAKE_START));
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("ready");
  const hasSavedScoreRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const nextDirection = SNAKE_DIRECTIONS[event.key];
      if (!nextDirection) return;
      event.preventDefault();
      setQueuedDirection((current) => (isOppositeDirection(current, nextDirection) ? current : nextDirection));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (status !== "running") return undefined;

    const intervalId = setInterval(() => {
      setSnake((previousSnake) => {
        const nextHead = {
          x: previousSnake[0].x + queuedDirection.x,
          y: previousSnake[0].y + queuedDirection.y,
        };

        const hitWall =
          nextHead.x < 0 ||
          nextHead.y < 0 ||
          nextHead.x >= SNAKE_GRID_SIZE ||
          nextHead.y >= SNAKE_GRID_SIZE;
        const hitSelf = previousSnake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y);

        if (hitWall || hitSelf) {
          const finalScore = Math.max(previousSnake.length - SNAKE_START.length, 0);
          setScore(finalScore);
          setStatus("gameover");
          if (!hasSavedScoreRef.current) {
            onSaveScore(finalScore);
            hasSavedScoreRef.current = true;
          }
          return previousSnake;
        }

        const nextSnake = [nextHead, ...previousSnake];
        const ateFood = nextHead.x === food.x && nextHead.y === food.y;

        if (ateFood) {
          setScore(nextSnake.length - SNAKE_START.length);
          setFood(spawnSnakeFood(nextSnake));
          return nextSnake;
        }

        nextSnake.pop();
        return nextSnake;
      });
    }, SNAKE_TICK_MS);

    return () => clearInterval(intervalId);
  }, [status, queuedDirection, food, onSaveScore]);

  const restart = () => {
    setSnake(SNAKE_START);
    setQueuedDirection({ x: 1, y: 0 });
    setFood(spawnSnakeFood(SNAKE_START));
    setScore(0);
    hasSavedScoreRef.current = false;
    setStatus("running");
  };

  const startGame = () => {
    setStatus("running");
  };

  const changeDirection = (nextDirection) => {
    setQueuedDirection((current) => (isOppositeDirection(current, nextDirection) ? current : nextDirection));
  };

  const snakeBodySet = useMemo(() => new Set(snake.map(toSnakeKey)), [snake]);
  const snakeHeadKey = toSnakeKey(snake[0]);
  const foodKey = toSnakeKey(food);

  return (
    <div className="snake-play-wrap">
      <div className="snake-highest">
        <h4>Highest Score</h4>
        <p>{highestEntry ? `${highestEntry.name} - ${highestEntry.score}` : "No saved score yet."}</p>
      </div>

      <div className="snake-topbar compact">
        <p>{playerName}</p>
        <p>Score: {score}</p>
        <p>High: {highestEntry?.score ?? 0}</p>
        <button type="button" onClick={onBack}>
          Menu
        </button>
      </div>

      <div className="snake-grid" role="application" aria-label="Snake game board">
        {Array.from({ length: SNAKE_GRID_SIZE * SNAKE_GRID_SIZE }, (_, index) => {
          const x = index % SNAKE_GRID_SIZE;
          const y = Math.floor(index / SNAKE_GRID_SIZE);
          const cellKey = `${x},${y}`;
          const isHead = snakeHeadKey === cellKey;
          const isBody = snakeBodySet.has(cellKey) && !isHead;
          const isFood = foodKey === cellKey;
          return (
            <span
              key={cellKey}
              className={`snake-cell ${isHead ? "head" : ""} ${isBody ? "body" : ""} ${isFood ? "food" : ""}`}
            />
          );
        })}
      </div>

      {status === "ready" && (
        <div className="snake-ready-popup">
          <h4>Ready to Play</h4>
          <p>Click Start Game to begin.</p>
          <div className="snake-popup-actions">
            <button type="button" onClick={startGame}>
              Start Game
            </button>
            <button type="button" onClick={onBack}>
              Back to Menu
            </button>
          </div>
        </div>
      )}

      {status === "gameover" && (
        <div className="snake-gameover-popup">
          <h4>Game Over</h4>
          <p>
            {playerName} scored <strong>{score}</strong>
          </p>
          <div className="snake-popup-actions">
            <button type="button" onClick={restart}>
              Play Again
            </button>
            <button type="button" onClick={onBack}>
              Back to Menu
            </button>
          </div>
        </div>
      )}

      <div className="snake-controls compact">
        <button type="button" onClick={() => changeDirection({ x: 0, y: -1 })}>
          Up
        </button>
        <button type="button" onClick={() => changeDirection({ x: -1, y: 0 })}>
          Left
        </button>
        <button type="button" onClick={() => changeDirection({ x: 0, y: 1 })}>
          Down
        </button>
        <button type="button" onClick={() => changeDirection({ x: 1, y: 0 })}>
          Right
        </button>
      </div>
    </div>
  );
}

function GamesPage() {
  const [isSnakeOpen, setIsSnakeOpen] = useState(false);
  const [isNamePopupOpen, setIsNamePopupOpen] = useState(false);
  const [playerName, setPlayerName] = useState(() => localStorage.getItem(SNAKE_STORAGE_KEYS.player) || "");
  const [leaderboard, setLeaderboard] = useState(() => loadSnakeLeaderboard());
  const highestEntry = leaderboard[0] || null;

  useEffect(() => {
    localStorage.setItem(SNAKE_STORAGE_KEYS.player, playerName);
  }, [playerName]);

  useEffect(() => {
    localStorage.setItem(SNAKE_STORAGE_KEYS.leaderboard, JSON.stringify(leaderboard));
  }, [leaderboard]);

  const handleSaveScore = (score) => {
    const safeName = playerName.trim() || "Player";
    const newEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: safeName,
      score,
    };

    setLeaderboard((previous) =>
      [newEntry, ...previous]
        .sort((a, b) => (b.score === a.score ? b.id.localeCompare(a.id) : b.score - a.score))
        .slice(0, 10)
    );
  };

  const startSnake = () => {
    const safeName = playerName.trim() || "Player";
    setPlayerName(safeName);
    setIsNamePopupOpen(false);
    setIsSnakeOpen(true);
  };

  return (
    <div className="games-page">
      <header className="code-head">
        <p>// game.jsx - clean arcade menu</p>
      </header>

      {!isSnakeOpen ? (
        <div className="game-menu-shell">
          <button type="button" className="game-card" onClick={() => setIsNamePopupOpen(true)}>
            <img src={snakeCoverImage} alt="Snake game cover" />
            <div className="game-card-meta">
              <h3>Snake</h3>
              <p>Nokia-style snake. Eat apples and grow +1.</p>
              <span>Click to Start</span>
            </div>
          </button>
        </div>
      ) : (
        <SnakeGame
          playerName={playerName}
          highestEntry={highestEntry}
          onSaveScore={handleSaveScore}
          onBack={() => setIsSnakeOpen(false)}
        />
      )}

      {isNamePopupOpen && (
        <div className="game-popup-shell" role="dialog" aria-modal="true" aria-label="Start snake game">
          <button className="project-modal-backdrop" onClick={() => setIsNamePopupOpen(false)} aria-label="Close" />
          <div className="game-start-popup">
            <h3>Start Snake</h3>
            <label htmlFor="gamePlayerName">Player Name</label>
            <input
              id="gamePlayerName"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value.slice(0, 20))}
              placeholder="Type your name"
            />
            <div className="snake-popup-actions">
              <button type="button" onClick={startSnake}>
                Start Game
              </button>
              <button type="button" onClick={() => setIsNamePopupOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(() => safeLoad(STORAGE_KEYS.activeTab, "about"));
  const [openTabIds, setOpenTabIds] = useState(() => safeLoad(STORAGE_KEYS.openTabs, tabs.map((tab) => tab.id)));
  const [activeActivity, setActiveActivity] = useState("explorer");
  const [activeExplorerFile, setActiveExplorerFile] = useState("about.jsx");
  const [theme, setTheme] = useState(() => safeLoad(STORAGE_KEYS.theme, "dark"));
  const [openSections, setOpenSections] = useState({
    root: true,
    npm: false,
    timeline: true,
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [timelineEntries, setTimelineEntries] = useState(() => [
    { id: "seed-about", label: "Opened about.jsx", time: "now" },
  ]);
  const [explorerFilter, setExplorerFilter] = useState("");

  const [sourceControlChanges, setSourceControlChanges] = useState(sourceControlChangesSeed);
  const [stagedChanges, setStagedChanges] = useState([]);

  const [activeProfile, setActiveProfile] = useState(debugProfiles[0]);
  const [isDebugRunning, setIsDebugRunning] = useState(false);
  const [debugLogs, setDebugLogs] = useState([
    "[ready] VS Portfolio workspace loaded.",
    "[hint] Pick a launch profile to start debugging.",
  ]);

  const [extensionQuery, setExtensionQuery] = useState("");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandPaletteQuery, setCommandPaletteQuery] = useState("");

  const statusLine = useMemo(() => {
    if (activeTab === "projects") return "Ln 52, Col 9";
    if (activeTab === "experience") return "Ln 29, Col 6";
    if (activeTab === "skills") return "Ln 30, Col 5";
    if (activeTab === "learning") return "Ln 41, Col 11";
    if (activeTab === "idle") return "Ln 18, Col 4";
    if (activeTab === "game") return "Ln 22, Col 8";
    return "Ln 24, Col 17";
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.activeTab, JSON.stringify(activeTab));
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.openTabs, JSON.stringify(openTabIds));
  }, [openTabIds]);

  useEffect(() => {
    const matchedFile = explorerFiles.find((file) => file.tabId === activeTab);
    if (!matchedFile) return;
    setActiveExplorerFile(matchedFile.name);
  }, [activeTab]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleEscape = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleShortcut = (event) => {
      const isCommand = event.metaKey || event.ctrlKey;
      if (isCommand && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandPaletteOpen((previous) => !previous);
        return;
      }

      if (isCommand && event.key.toLowerCase() === "j") {
        event.preventDefault();
        setTheme((previous) => (previous === "dark" ? "light" : "dark"));
        return;
      }

      if (event.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!isDebugRunning) return;

    const interval = setInterval(() => {
      const randomLogs = [
        "[vite] hot update delivered in 132ms",
        "[trace] routes mapped successfully",
        "[info] websocket connection alive",
        "[ok] style recalculation complete",
        "[watch] no lint errors",
      ];
      const randomMessage = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      setDebugLogs((previous) => [...previous.slice(-8), randomMessage]);
    }, 1400);

    return () => clearInterval(interval);
  }, [isDebugRunning]);

  const filteredExplorerFiles = useMemo(() => {
    const query = explorerFilter.toLowerCase().trim();
    if (!query) return explorerFiles;
    return explorerFiles.filter((file) => file.name.toLowerCase().includes(query));
  }, [explorerFilter]);

  const filteredExtensions = useMemo(() => {
    const query = extensionQuery.toLowerCase().trim();
    if (!query) return extensionPicks;
    return extensionPicks.filter((item) => {
      const haystack = `${item.name} ${item.author} ${item.description}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [extensionQuery]);

  const openTab = (tabId) => {
    setOpenTabIds((previous) => (previous.includes(tabId) ? previous : [...previous, tabId]));
    setActiveTab(tabId);
  };

  const addTimelineEntry = (label) => {
    setTimelineEntries((previous) => [{ id: `${Date.now()}-${Math.random()}`, label, time: "just now" }, ...previous].slice(0, 8));
  };

  const jumpToFile = (fileName) => {
    const matched = explorerFiles.find((item) => item.name === fileName);
    if (!matched) return;
    setActiveExplorerFile(fileName);
    if (matched.tabId) openTab(matched.tabId);
    setActiveActivity("explorer");
    addTimelineEntry(`Opened ${fileName}`);
  };

  const handleExplorerFileClick = (item) => {
    setActiveExplorerFile(item.name);
    if (item.tabId) openTab(item.tabId);
    addTimelineEntry(`Opened ${item.name}`);
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
      addTimelineEntry(`Closed ${tabId}.jsx`);
      return next;
    });
  };

  const toggleSection = (sectionName) => {
    setOpenSections((previous) => ({
      ...previous,
      [sectionName]: !previous[sectionName],
    }));
  };

  const runCommand = (commandId) => {
    if (commandId === "open:about") {
      jumpToFile("about.jsx");
      setCommandPaletteOpen(false);
      return;
    }

    if (commandId === "open:projects") {
      jumpToFile("projects.jsx");
      setCommandPaletteOpen(false);
      return;
    }

    if (commandId === "open:idle") {
      jumpToFile("idle.jsx");
      setCommandPaletteOpen(false);
      return;
    }

    if (commandId === "open:game") {
      jumpToFile("game.jsx");
      setCommandPaletteOpen(false);
      return;
    }

    if (commandId === "toggle:theme") {
      setTheme((previous) => (previous === "dark" ? "light" : "dark"));
      setCommandPaletteOpen(false);
      return;
    }

    if (commandId === "activity:search") {
      setActiveActivity("search");
      setCommandPaletteOpen(false);
      return;
    }

    if (commandId === "debug:start") {
      setIsDebugRunning(true);
      setDebugLogs((previous) => [...previous.slice(-8), `[start] ${activeProfile.command}`]);
      setCommandPaletteOpen(false);
    }
  };

  const commands = useMemo(
    () => [
      { id: "open:about", label: "Open about.jsx" },
      { id: "open:projects", label: "Open projects.jsx" },
      { id: "open:idle", label: "Open idle.jsx" },
      { id: "open:game", label: "Open game.jsx" },
      { id: "toggle:theme", label: "Toggle Theme" },
      { id: "activity:search", label: "Focus Search Activity" },
      { id: "debug:start", label: `Run ${activeProfile.name}` },
    ],
    [activeProfile.name]
  );

  const commandResults = useMemo(() => {
    const query = commandPaletteQuery.toLowerCase().trim();
    if (!query) return commands;
    return commands.filter((command) => command.label.toLowerCase().includes(query));
  }, [commandPaletteQuery, commands]);

  const searchItems = useMemo(() => {
    const projectItems = projects.map((project) => ({
      id: `project-${project.title}`,
      label: project.title,
      category: "Project",
      action: () => {
        openTab("projects");
        setSelectedProject(project);
        setActiveActivity("explorer");
      },
    }));

    const fileItems = explorerFiles.map((file) => ({
      id: `file-${file.name}`,
      label: file.name,
      category: "File",
      action: () => jumpToFile(file.name),
    }));

    const skillItems = skillSections.flatMap((section) =>
      section.items.map((item) => ({
        id: `skill-${item.name}`,
        label: item.name,
        category: "Skill",
        action: () => {
          openTab("skills");
          setActiveActivity("explorer");
          addTimelineEntry(`Jumped to skill ${item.name}`);
        },
      }))
    );

    const experienceItems = experiences.map((item) => ({
      id: `exp-${item.role}`,
      label: `${item.role} @ ${item.company}`,
      category: "Experience",
      action: () => {
        openTab("experience");
        setActiveActivity("explorer");
      },
    }));

    return [...fileItems, ...projectItems, ...skillItems, ...experienceItems];
  }, [addTimelineEntry]);

  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return searchItems.slice(0, 9);
    return searchItems.filter((item) => `${item.label} ${item.category}`.toLowerCase().includes(query)).slice(0, 14);
  }, [searchItems, searchQuery]);

  const isLightTheme = theme === "light";
  const openTabs = tabs.filter((tab) => openTabIds.includes(tab.id));

  const renderPage = () => {
    if (activeTab === "projects") return <ProjectsPage onSelectProject={setSelectedProject} />;
    if (activeTab === "skills") return <SkillsPage />;
    if (activeTab === "experience") return <ExperiencePage />;
    if (activeTab === "learning") return <LearningPage />;
    if (activeTab === "idle") return <IdlePage />;
    if (activeTab === "game") return <GamesPage />;
    return <AboutPage />;
  };

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

  const sourceControlSummary = `${stagedChanges.length} staged, ${sourceControlChanges.length - stagedChanges.length} changes`;

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
            {activeActivity === "explorer" && (
              <>
                <div className="explorer-header">
                  <p className="explorer-title">EXPLORER</p>
                  <button className="explorer-more" aria-label="More explorer actions">
                    ...
                  </button>
                </div>

                <div className="explorer-filter-wrap">
                  <input
                    className="explorer-filter"
                    placeholder="Filter files"
                    value={explorerFilter}
                    onChange={(event) => setExplorerFilter(event.target.value)}
                  />
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
                      {filteredExplorerFiles.length === 0 && (
                        <li className="section-content-empty section-content-text">No files match the filter.</li>
                      )}
                      {filteredExplorerFiles.map((item) => (
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
                  {openSections.npm && (
                    <ul className="explorer-mini-list">
                      {npmScripts.map((script) => (
                        <li key={script.name}>
                          <button
                            className="explorer-mini-item"
                            onClick={() => {
                              setActiveActivity("runDebug");
                              setActiveProfile(
                                debugProfiles.find((profile) => profile.command.includes(script.name)) || debugProfiles[0]
                              );
                              addTimelineEntry(`Queued npm run ${script.name}`);
                            }}
                          >
                            <span>npm run {script.name}</span>
                            <code>{script.command}</code>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
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
                  {openSections.timeline && (
                    <ul className="explorer-mini-list timeline-list">
                      {timelineEntries.map((entry) => (
                        <li key={entry.id} className="timeline-item">
                          <p>{entry.label}</p>
                          <span>{entry.time}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}

            {activeActivity === "search" && (
              <div className="activity-panel">
                <h3>SEARCH</h3>
                <input
                  className="activity-input"
                  placeholder="Search files, projects, skills"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <ul className="activity-result-list">
                  {searchResults.map((item) => (
                    <li key={item.id}>
                      <button className="activity-result-item" onClick={item.action}>
                        <strong>{item.label}</strong>
                        <span>{item.category}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeActivity === "sourceControl" && (
              <div className="activity-panel">
                <h3>SOURCE CONTROL</h3>
                <p className="activity-subtitle">{sourceControlSummary}</p>
                <ul className="activity-result-list">
                  {sourceControlChanges.map((change) => {
                    const isStaged = stagedChanges.includes(change.id);
                    return (
                      <li key={change.id}>
                        <button
                          className={`activity-result-item ${isStaged ? "selected" : ""}`}
                          onClick={() => {
                            setStagedChanges((previous) =>
                              previous.includes(change.id)
                                ? previous.filter((id) => id !== change.id)
                                : [...previous, change.id]
                            );
                          }}
                        >
                          <strong>
                            [{change.type}] {change.path}
                          </strong>
                          <span>{change.note}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <button
                  className="activity-action"
                  onClick={() => {
                    if (stagedChanges.length === 0) return;
                    setSourceControlChanges((previous) => previous.filter((item) => !stagedChanges.includes(item.id)));
                    setStagedChanges([]);
                  }}
                >
                  Commit Staged Changes
                </button>
              </div>
            )}

            {activeActivity === "runDebug" && (
              <div className="activity-panel">
                <h3>RUN AND DEBUG</h3>
                <div className="debug-profile-list">
                  {debugProfiles.map((profile) => (
                    <button
                      key={profile.id}
                      className={`debug-profile-btn ${activeProfile.id === profile.id ? "active" : ""}`}
                      onClick={() => setActiveProfile(profile)}
                    >
                      <strong>{profile.name}</strong>
                      <span>{profile.command}</span>
                    </button>
                  ))}
                </div>
                <div className="debug-actions">
                  <button
                    className="activity-action"
                    onClick={() => {
                      setIsDebugRunning(true);
                      setDebugLogs((previous) => [...previous.slice(-8), `[start] ${activeProfile.command}`]);
                    }}
                  >
                    Start
                  </button>
                  <button
                    className="activity-action ghost"
                    onClick={() => {
                      setIsDebugRunning(false);
                      setDebugLogs((previous) => [...previous.slice(-8), `[stop] ${activeProfile.command}`]);
                    }}
                  >
                    Stop
                  </button>
                </div>
                <pre className="debug-console">{debugLogs.join("\n")}</pre>
              </div>
            )}

            {activeActivity === "extensions" && (
              <div className="activity-panel">
                <h3>EXTENSIONS</h3>
                <input
                  className="activity-input"
                  placeholder="Search extensions"
                  value={extensionQuery}
                  onChange={(event) => setExtensionQuery(event.target.value)}
                />
                <ul className="activity-result-list">
                  {filteredExtensions.map((item) => (
                    <li key={item.name}>
                      <button className="activity-result-item">
                        <strong>{item.name}</strong>
                        <span>
                          {item.author} - {item.installs}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(activeActivity === "account" || activeActivity === "settings") && (
              <div className="activity-panel">
                <h3>{activeActivity === "account" ? "ACCOUNT" : "SETTINGS"}</h3>
                <p className="activity-subtitle">
                  {activeActivity === "account"
                    ? "Paresh Suthar • MERN Developer"
                    : "Theme, shortcuts, and interface preferences"}
                </p>
                {activeActivity === "settings" && (
                  <button
                    className="activity-action"
                    onClick={() => setTheme((previous) => (previous === "dark" ? "light" : "dark"))}
                  >
                    Toggle Theme (Ctrl/Cmd + J)
                  </button>
                )}
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
          <span>{sourceControlSummary}</span>
          <span>{isDebugRunning ? `Debugging: ${activeProfile.name}` : "Debug: Idle"}</span>
        </footer>
      </div>

      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} details`}>
          <div className="project-modal-card">
            <button className="project-modal-close" onClick={() => setSelectedProject(null)} aria-label="Close">
              x
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

      {commandPaletteOpen && (
        <div className="command-palette-shell" role="dialog" aria-modal="true" aria-label="Command palette">
          <button className="project-modal-backdrop" onClick={() => setCommandPaletteOpen(false)} aria-label="Close" />
          <div className="command-palette">
            <input
              autoFocus
              className="command-input"
              value={commandPaletteQuery}
              onChange={(event) => setCommandPaletteQuery(event.target.value)}
              placeholder="Type a command (Ctrl/Cmd + K)"
            />
            <ul className="command-list">
              {commandResults.map((command) => (
                <li key={command.id}>
                  <button
                    className="command-item"
                    onClick={() => {
                      runCommand(command.id);
                      setCommandPaletteQuery("");
                    }}
                  >
                    {command.label}
                  </button>
                </li>
              ))}
              {commandResults.length === 0 && <li className="command-empty">No command found.</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
