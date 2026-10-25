import { usePage } from "../../utils/pageContext";
import { projectContent, ProjectsEmptyState } from "../projects";
import { LeftAboutMeText, RightAboutMe } from "../aboutMe";
import { LeftProjectsText } from "../projects";
import { LeftSkillsText, RightSkills } from "../skills";
import { ReactNode, useRef, useEffect } from "react";
import { ThemePicker } from "../../components/ThemePicker";

const verticalText = `
#include <unistd.h>

void ft_putchar(char c)
{
    write(1, &c, 1);
}
`;

const horizontalText = `42 Hive Helsinki`;

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
        <RightAboutMe />
      </section>
    );
    // On phones the footer is a tab bar, so the theme picker lives here instead
    mobileNavContent = <><LeftAboutMeText /><div className="mobile-theme"><ThemePicker /></div><RightAboutMe /></>;
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
      pageContent = <ProjectsEmptyState />;
      mobileNavContent = <LeftProjectsText />;// When no project selected, desktop shows a hint, mobile shows list
    }
  } else if (page === "skills") {
    pageContent = (
      <section className="rightSide__section skills-section">
        <RightSkills />
      </section>
    );
    mobileNavContent = <><LeftSkillsText /><RightSkills /></>;
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
      </div>
    </main>
  );
}
