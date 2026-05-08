import { usePage } from "../../utils/pageContext";
import { icons } from "../../components/icons";

export function Footer() {
  const { page, setPage } = usePage();
  
  return (
    <footer className="footer">
      <div className="footer__inner">
        <nav className="footer__nav">
          <button 
            className={`leftSide__btn ${page === "aboutMe" ? "leftSide__btn--active" : ""}`}
            onClick={() => setPage("aboutMe")}
          >
            {page === "aboutMe" ? (
              <span className="btn-icon">
                <icons.AboutmeLogo />
              </span>
            ) : (
              "About me"
            )}
          </button>
          
          <button 
            className={`leftSide__btn ${page === "projects" ? "leftSide__btn--active" : ""}`}
            onClick={() => setPage("projects")}
          >
            {page === "projects" ? (
              <span className="btn-icon">
                <icons.ProjectsLogo />
              </span>
            ) : (
              "Projects"
            )}
          </button>
          
          <button 
            className={`leftSide__btn ${page === "skills" ? "leftSide__btn--active" : ""}`}
            onClick={() => setPage("skills")}
          >
            {page === "skills" ? (
              <span className="btn-icon">
                <icons.SkillsLogo />
              </span>
            ) : (
              "Skills"
            )}
          </button>
        </nav>
        <div className="footer__social">
          <a className="footer__a" href="https://github.com/torutu" target="_blank" rel="noopener noreferrer">
            <icons.GithubLogo />
          </a>
          <a className="footer__a" href="https://linkedin.com/in/walnaimi" target="_blank" rel="noopener noreferrer">
            <icons.LinkedinLogo />
          </a>
        </div>
      </div>
    </footer>
  );
}
