import { usePage } from "../../utils/pageContext";
import { icons } from "../../components/icons";
import { PORTFOLIO_CONFIG } from "../../config/portfolioConfig";
import { ThemePicker } from "../../components/ThemePicker";

const NAV = [
  { page: "aboutMe", label: "About me", Icon: icons.AboutmeLogo },
  { page: "projects", label: "Projects", Icon: icons.ProjectsLogo },
  { page: "skills", label: "Skills", Icon: icons.SkillsLogo },
];

export function Footer() {
  const { page, setPage } = usePage();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <nav className="footer__nav">
          {NAV.map(({ page: target, label, Icon }) => (
            <button
              key={target}
              className={`leftSide__btn ${page === target ? "leftSide__btn--active" : ""}`}
              aria-current={page === target ? "page" : undefined}
              onClick={() => setPage(target)}
            >
              <span className="btn-icon"><Icon /></span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="footer__social">
          <a className="footer__a" href="https://github.com/torutu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <icons.GithubLogo />
          </a>
          <a className="footer__a" href="https://linkedin.com/in/walnaimi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <icons.LinkedinLogo />
          </a>
          <a className="footer__a" href={`mailto:${PORTFOLIO_CONFIG.email}`} aria-label="Email">
            <icons.MailLogo />
          </a>
          <ThemePicker />
        </div>
      </div>
    </footer>
  );
}
