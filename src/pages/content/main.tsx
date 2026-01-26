import { usePage } from "../../utils/pageContext";
import { projectContent } from "../projects";
import { LeftAboutMeText } from "../aboutMe";
import { LeftProjectsText } from "../projects";
import { LeftSkillsText } from "../skills";
import { ReactNode, useRef, useEffect } from "react";

const verticalText = `
#include <unistd.h>

void ft_putchar(char c)
{
    write(1, &c, 1);
}
`;

const horizontalText = `42 Hive Helsinki`;

const setTheme = (theme: "dark-blue" | "dark-green" | "dark-red") => {
  document.documentElement.setAttribute("data-theme", theme);
};

export function Main() {
  const { page, selectedProject, setSelectedProject } = usePage();
  const previousPageRef = useRef(page);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    previousPageRef.current = page;
  }, [page]);

  let pageContent: ReactNode = "";
  let mobileNavContent: ReactNode = "";

  if (page === "aboutMe") {
    pageContent = (
      <section className="rightSide__section aboutMe-section">
        {/* About me content handled by parent */}
      </section>
    );
    mobileNavContent = <LeftAboutMeText />;
  } else if (page === "projects") {
    if (selectedProject) {
      // When viewing a project, show it in both desktop and mobile
      pageContent = (
        <article className="rightSide__article">
          {projectContent[selectedProject as keyof typeof projectContent]}
          <button
            className="back-to-top"
            onClick={() =>
              containerRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            ↑
          </button>
        </article>
      );
      mobileNavContent = null; // Don't show project list when viewing a project
    } else {
      pageContent = null;
      mobileNavContent = <LeftProjectsText />;// When no project selected, desktop shows nothing, mobile shows list
    }
  } else if (page === "skills") {
    pageContent = (
      <section className="rightSide__section skills-section">
        {/* Skills content handled by parent */}
      </section>
    );
    mobileNavContent = <LeftSkillsText />;
  }

  return (
    <main className="rightSide">
      <span className="leftSide__verticalText">{verticalText}</span>
      <span className="topSide__horizontalText">{horizontalText}</span>
      <span className="rightSide__verticalText">{verticalText}</span>
      <div 
        ref={containerRef}
        className={`rightSide__inner
          ${page === 'aboutMe' ? 'no-bg' : ''}
          ${page === 'projects' ? 'animate-fadein' : ''}
          ${page === 'skills' ? 'animate-fadein' : ''}
          ${selectedProject ? 'viewing-project' : ''}
        `}
      >
        {/* Back to Projects button - only visible on mobile when on projects page AND viewing a project */}
        {page === "projects" && selectedProject && (
          <button 
            className="mobile-back-btn"
            onClick={() => setSelectedProject("")}
          >
            ← Back to Projects
          </button>
        )}
        
        {/* Mobile-only navigation content */}
        <div className="mobile-nav-content">
          {mobileNavContent}
        </div>
        {/* Desktop content (also shown on mobile when viewing project) */}
        <div className="desktop-content">
          {pageContent}
        </div>
        {/* about me svg art rightside */}
        {page === "aboutMe" && (
          <div className="colorChanger">
            <button className="colorChanger__button_blue" onClick={() => setTheme("dark-blue")}></button>
            <button className="colorChanger__button_green" onClick={() => setTheme("dark-green")}></button>
            <button className="colorChanger__button_red" onClick={() => setTheme("dark-red")}></button>
          </div>
        )}
      </div>
    </main>
  );
}
