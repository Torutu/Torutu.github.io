import { PORTFOLIO_CONFIG, EXPERIENCE, EDUCATION } from "../config/portfolioConfig";
import { TimelineEntry } from "../types/portfolio";
import { icons } from "../components/icons";

export function LeftAboutMeText() {
  const [before, after] = PORTFOLIO_CONFIG.aboutMeLeft.split(PORTFOLIO_CONFIG.guideLinkText);

  return (
    <>
    <p className="leftSide__p">
      {before}
      {after !== undefined && (
        <>
          <a className="guide-link" href="#daggerforge-guide" aria-label={`${PORTFOLIO_CONFIG.guideLinkText}: read the illustrated Daggerforge guide`}>
            {PORTFOLIO_CONFIG.guideLinkText}
            <span className="guide-link__icon" aria-hidden="true"><icons.BookLogo /></span>
            <span className="guide-link__tip" aria-hidden="true">
              See how it works in the illustrated guide <span className="guide-link__arrow">→</span>
            </span>
          </a>
          {after}
        </>
      )}
    </p>
    <dl className="about-facts">
      <div><dt>Role</dt><dd>{PORTFOLIO_CONFIG.role}</dd></div>
      <div><dt>Based in</dt><dd>{PORTFOLIO_CONFIG.location}</dd></div>
      <div>
        <dt>Contact</dt>
        <dd><a href={`mailto:${PORTFOLIO_CONFIG.email}`}>{PORTFOLIO_CONFIG.email}</a></dd>
      </div>
    </dl>
    <div className="about-stats">
      {PORTFOLIO_CONFIG.stats.map((stat) => (
        <div key={stat.label} className="about-stats__item">
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
    </>
  );
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="timeline">
      {entries.map((entry) => (
        <li key={entry.title + entry.org} className="timeline__item">
          <div className="timeline__head">
            <h3 className="timeline__role">{entry.title}</h3>
            <span className="timeline__period">{entry.period}</span>
          </div>
          <p className="timeline__org">
            {entry.org}{entry.place && <span> · {entry.place}</span>}
          </p>
          {entry.note && <p className="timeline__note">{entry.note}</p>}
          {entry.points && (
            <ul className="timeline__points">
              {entry.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

export function RightAboutMe() {
  return (
    <div className="panel">
      <h2 className="panel__title">Experience</h2>
      <Timeline entries={EXPERIENCE} />
      <h2 className="panel__title">Education</h2>
      <Timeline entries={EDUCATION} />
    </div>
  );
}
