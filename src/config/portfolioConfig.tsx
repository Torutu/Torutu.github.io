import { ProjectData, TimelineEntry } from '../types/portfolio';
import { icons } from '../components/icons';

// Badge data structure matching Skills
interface Badge {
  name: string;
  icon: keyof typeof icons;
}

// Map badge names to icon components
const BADGE_MAP: Record<string, Badge> = {
  typescript: { name: "TypeScript", icon: "TypeScriptLogo" },
  json: { name: "JSON", icon: "JsonLogo" },
  html: { name: "HTML", icon: "HtmlLogo" },
  css: { name: "CSS", icon: "CssLogo" },
  go: { name: "Go", icon: "GoLogo" },
  react: { name: "React", icon: "ReactLogo" },
  prisma: { name: "Prisma", icon: "PrismaLogo" },
  tailwindcss: { name: "Tailwind", icon: "TailwindcssLogo" },
  threejs: { name: "Three.js", icon: "ThreejsLogo" },
  "c++": { name: "C++", icon: "CppLogo" },
  c: { name: "C", icon: "CLogo" },
  bash: { name: "Linux", icon: "LinuxLogo" }
};

// Brand colors for logos (lighter stand-ins for the near-black ones).
// CSS blends them with the theme's text color so they sit softly on every background.
export const ICON_TINTS: Partial<Record<keyof typeof icons, string>> = {
  TypeScriptLogo: "#3178c6",
  JavaScriptLogo: "#f7df1e",
  ReactLogo: "#61dafb",
  HtmlLogo: "#e34f26",
  CssLogo: "#8a63d2",
  CppLogo: "#3d8bd4",
  CLogo: "#a8b9cc",
  GoLogo: "#00add8",
  PythonLogo: "#4b8bbe",
  LinuxLogo: "#fcc624",
  MySQLLogo: "#5b93c0",
  JsonLogo: "#d6c55a",
  ObsidianLogo: "#8b6cef",
  GodotLogo: "#478cbf",
  PrismaLogo: "#7f8bd8",
  TailwindcssLogo: "#06b6d4",
  ThreejsLogo: "#d4d4d8",
};

export const PROJECTS_CONFIG: ProjectData[] = [
  {
    id: "dhtools",
    name: "DHTools",
    description: "Content browser and search platform: a system reference for Daggerheart",
    badges: ["react", "typescript", "html", "css"],
    tag: "Live site"
  },
  {
    id: "daggerforge",
    name: "Daggerforge",
    description: "Obsidian plugin to browse, create and insert Daggerheart content",
    badges: ["typescript", "json", "html", "css"],
    tag: "7,000+ downloads"
  },
  {
    id: "rulebookparser",
    name: "Rulebook parser",
    description: "Convert a plain-text rulebook into structured JSON",
    badges: ["go", "json"]
  },
  {
    id: "pingpong",
    name: "Ping Pong",
    description: "Real-time multiplayer 3D Pong with tournaments",
    badges: ["react", "typescript", "prisma", "tailwindcss", "threejs"]
  },
  {
    id: "dithernator",
    name: "Dithernator",
    description: "Add a dithering effect to an image",
    badges: ["c++"]
  },
  {
    id: "minishell",
    name: "Minishell",
    description: "A Bash-like Unix shell written in C",
    badges: ["c", "bash"]
  }
];

export const PORTFOLIO_CONFIG = {
  siteName: "Waleed's Portfolio",
  author: "Waleed",
  // Typed out on one line: keep both parts under ~50 characters and update steps() in .leftSide__h .typing
  introText: "Hi! I'm Waleed, passionate about",
  introText2: " all things tech.",
  aboutMeLeft: `Software developer with a background in systems programming, IT support
  and full-stack development. I troubleshoot hardware and software, support users,
  and build practical tools, like an Obsidian plugin used by 7,000+ people.`,
  // This phrase inside aboutMeLeft becomes a link to the Daggerforge guide
  guideLinkText: "Obsidian plugin",
  role: "Software Developer · IT Support",
  location: "Helsinki–Vantaa, Finland",
  email: "waleedo929@gmail.com",
  stats: [
    { value: "7,000+", label: "downloads" },
    { value: String(PROJECTS_CONFIG.length), label: "featured projects" },
    { value: "2017", label: "first IT role" }
  ],
  projectsIntro: `I use my skills to feed my hobbies and help my friends with their
        projects, I enjoy pushing forward and learn along the way`
};

export const EXPERIENCE: TimelineEntry[] = [
  {
    title: "Software Developer",
    org: "Independent",
    place: "Finland",
    period: "May 2025 – Present",
    points: [
      "Built plugin-based tools that replaced slow manual lookup workflows.",
      "Turned static documents into structured, interactive UIs with search, filtering and state management.",
      "Design features from direct user feedback and real usage patterns."
    ]
  },
  {
    title: "Technology Salesperson",
    org: "SACO",
    place: "Jubail Industrial City, Saudi Arabia",
    period: "Jul 2019 – Jan 2022",
    points: [
      "Sold electronics and industrial tools through direct customer engagement.",
      "Managed inventory: receiving, stocking and stock reporting.",
      "Coordinated logistics to keep products available."
    ]
  },
  {
    title: "IT Support Co-op Training",
    org: "Royal Commission",
    place: "Jubail Industrial City, Saudi Arabia",
    period: "Oct 2017 – Mar 2018",
    points: [
      "Supported staff and students with computers, projectors and other hardware.",
      "Troubleshot and fixed hardware and software problems.",
      "Installed, configured and maintained equipment and software."
    ]
  }
];

export const EDUCATION: TimelineEntry[] = [
  {
    title: "Language and Integration Program",
    org: "Axxell",
    period: "Until Dec 2026",
    note: "Finnish language and work-life skills."
  },
  {
    title: "Junior Software Engineer",
    org: "Hive Helsinki",
    period: "Oct 2025",
    note: "Peer-to-peer program focused on systems programming, problem solving and low-level computing (C/C++)."
  },
  {
    title: "Network Administrator",
    org: "Jubail Industrial Institute",
    period: "Mar 2018",
    note: "Information Technology with Cisco Network Administration training."
  }
];

// Palettes and patterns are defined per id in src/styles/app.css
export const THEMES = [
  { id: "midnight", name: "Midnight" },
  { id: "graphite", name: "Graphite" },
  { id: "nebula", name: "Nebula" },
  { id: "terminal", name: "Terminal" },
  { id: "ember", name: "Ember" },
];

export const SKILL_GROUPS: { title: string; items: string[] }[] = [
  { title: "Backend & Systems", items: ["C++", "C", "Go", "Python"] },
  { title: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML", "CSS"] },
  { title: "Tools & DevOps", items: ["Git", "Docker", "Bash", "Makefile", "Azure"] },
  { title: "Operating systems", items: ["Linux / Unix", "Windows", "macOS"] },
  { title: "Data", items: ["SQL", "JSON"] },
  { title: "AI-assisted development", items: ["Claude Code"] },
  { title: "Creative & other", items: ["Obsidian API", "Godot (GDScript)", "Blender", "Aseprite", "PicoCAD", "GIMP"] }
];

export { BADGE_MAP };
