import { CSSProperties } from "react";
import { icons } from "../components/icons";
import { SKILL_GROUPS, ICON_TINTS } from "../config/portfolioConfig";

// Skills data structure
interface Skill {
  name: string;
  icon: keyof typeof icons;
}

const SKILLS: Skill[] = [
  { name: "TypeScript", icon: "TypeScriptLogo" },
  { name: "React", icon: "ReactLogo" },
  { name: "HTML", icon: "HtmlLogo" },
  { name: "CSS", icon: "CssLogo" },
  { name: "C++", icon: "CppLogo" },
  { name: "C", icon: "CLogo" },
  { name: "JavaScript", icon: "JavaScriptLogo" },
  { name: "Go", icon: "GoLogo" },
  { name: "Python", icon: "PythonLogo" },
  { name: "Linux", icon: "LinuxLogo" },
  { name: "SQL", icon: "MySQLLogo" },
  { name: "JSON", icon: "JsonLogo" },
  { name: "Obsidian API", icon: "ObsidianLogo" },
  { name: "Godot", icon: "GodotLogo" },
  { name: "Prisma", icon: "PrismaLogo" },
  { name: "Tailwind CSS", icon: "TailwindcssLogo" },
  { name: "Three.js", icon: "ThreejsLogo" },
];

export function LeftSkillsText() {
  return (
    <div className="skills-grid">
      {SKILLS.map((skill) => {
        const IconComponent = icons[skill.icon];
        return (
          <div key={skill.name} className="skill-item" style={{ "--tint": ICON_TINTS[skill.icon] } as CSSProperties}>
            <div className="skill-item__icon">
              <IconComponent />
            </div>
            <p className="skill-item__name">{skill.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export function RightSkills() {
  return (
    <div className="panel">
      <h2 className="panel__title">Toolbox</h2>
      <div className="skill-groups">
        {SKILL_GROUPS.map((group) => (
          <section key={group.title} className="skill-group">
            <h3 className="skill-group__title">{group.title}</h3>
            <ul className="chips">
              {group.items.map((item) => <li key={item} className="chip">{item}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
