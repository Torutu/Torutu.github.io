import { JSX } from "react";
import { usePage } from "../utils/pageContext";
import { daggerforgeContent } from "./content/daggerforge";
import { rulebookParserContent } from "./content/rulebookParser";
import { dithernatorContent } from "./content/dithernator";
import { pingpongContent } from "./content/pingpong";
import { minishellContent } from "./content/minishell";
import { dhtoolsContent } from "./content/dhtools";
import { PROJECTS_CONFIG, PORTFOLIO_CONFIG, BADGE_MAP } from "../config/portfolioConfig";
import { icons } from "../components/icons";

export function LeftProjectsText() {
  const { setSelectedProject } = usePage();

  return (
    <>
      <p className="leftSide__p">{PORTFOLIO_CONFIG.projectsIntro}</p>

      <div className="leftSide__menu">
        {PROJECTS_CONFIG.map((project) => (
          <div
            key={project.id}
            className="leftSide__menu_item"
            onClick={() => setSelectedProject(project.id)}
          >
            <div className="leftSide__menu_item_name">{project.name}</div>
            <div className="leftSide__menu_item_description">{project.description}</div>
            <div className="leftSide__menu_item_badges">
              {project.badges.map((badgeKey, i) => {
                const badge = BADGE_MAP[(badgeKey as string).toLowerCase()];
                if (!badge) return null;

                const IconComponent = icons[badge.icon];
                return (
                  <div key={i} className="badge-item">
                    <div className="badge-item__icon">
                      <IconComponent />
                    </div>
                    <span className="badge-item__name">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


export const projectContent: Record<string, JSX.Element> = {
  dhtools: dhtoolsContent,
  daggerforge: daggerforgeContent,
  rulebookparser: rulebookParserContent,
  pingpong: pingpongContent,
  dithernator: dithernatorContent,
  minishell: minishellContent,
  project6: (
    <>
      <h1>Project 6</h1>
      <p>Project 6 description...</p>
    </>
  ),
  project7: (
    <>
      <h1>Project 7</h1>
      <p>Project 7 description...</p>
    </>
  ),
  project8: (
    <>
      <h1>Project 8</h1>
      <p>Project 8 description...</p>
    </>
  ),
  project9: (
    <>
      <h1>Project 9</h1>
      <p>Project 9 description...</p>
    </>
  ),
  project10: (
    <>
      <h1>Project 10</h1>
      <p>Project 10 description...</p>
    </>
  ),
};
