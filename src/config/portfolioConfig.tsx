import { ProjectData } from '../types/portfolio';
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

export const PROJECTS_CONFIG: ProjectData[] = [
  {
    id: "dhtools",
    name: "DHTools",
    description: "A reference page for Daggerheart.",
    badges: ["react", "typescript", "html", "css"]
  },
  {
    id: "daggerforge",
    name: "Daggerforge",
    description: "A tool that helps dungeon masters build session content fast.",
    badges: ["typescript", "json", "html", "css"]
  },
  {
    id: "rulebookparser",
    name: "Rulebook parser",
    description: "Convert plain text rulebook to a structured json format",
    badges: ["go", "json"]
  },
  {
    id: "pingpong",
    name: "Ping Pong",
    description: "3D Ping Pong game",
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
    description: "A simple shell",
    badges: ["c", "bash"]
  }
];

export const PORTFOLIO_CONFIG = {
  siteName: "Waleed's Portfolio",
  author: "Waleed",
  introText: "Hello! I'm Waleed, a passionate",
  introText2: " software developer.",
  aboutMeLeft: `I enjoy working across the full stack. 
  I love building clean, interactive user interfaces and creating practical,
  reliable software that feels good to use.`,
  skillsLeft: `Lorem ipsum dolor sit amet consectetur adipiscing elit. 
Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
pretium tellus duis convallis. 
Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus 
Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus `,
  projectsIntro: `I use my skills to feed my hobbies and help my friends with their
        projects, I enjoy pushing forward and learn along the way`
};

export { BADGE_MAP };
