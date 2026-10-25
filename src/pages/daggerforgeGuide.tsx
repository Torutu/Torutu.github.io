import { ReactNode, useEffect, useRef, useState } from "react";
import { ImageModal } from "../components/ImageModal";
import { OptimizedImage } from "../types/images";
import "../styles/daggerforge.css";
import "../styles/guide.css";
import settingsGear from "../media/guide/settings-gear.webp";
import communityPlugins from "../media/guide/community-plugins.webp";
import browseSearch from "../media/guide/browse-search.webp";
import ribbonMenu from "../media/guide/ribbon-menu.webp";
import adversaryBrowser from "../media/guide/adversary-browser.webp";
import creator from "../media/guide/creator.webp";
import diceBattle from "../media/guide/dice-battle.webp";
import dataMenu from "../media/guide/data-menu.webp";
import importData from "../media/guide/import-data.webp";
import deleteData from "../media/guide/delete-data.webp";

export const GUIDE_HASH = "#daggerforge-guide";

const closeGuide = () => { window.location.hash = ""; };

const shot = (id: string, src: string, width: number, height: number, alt: string): OptimizedImage =>
  ({ id, src, width, height, alt });

const SHOTS = {
  settingsGear: shot("settings-gear", settingsGear, 199, 63, "Obsidian vault switcher with the settings gear in the bottom-left corner"),
  communityPlugins: shot("community-plugins", communityPlugins, 1012, 560, "Obsidian settings on the Community plugins page with the Turn on community plugins button"),
  browseSearch: shot("browse-search", browseSearch, 760, 370, "Community plugin browser showing DaggerForge and its Install button"),
  ribbonMenu: shot("ribbon-menu", ribbonMenu, 222, 397, "Obsidian ribbon with the DaggerForge menu icon highlighted"),
  adversaryBrowser: shot("adversary-browser", adversaryBrowser, 1600, 875, "Adversary Browser sidebar next to an Acid Burrower card inserted into a note, with numbered steps 1 to 5"),
  creator: shot("creator", creator, 1600, 875, "A custom adversary card made with the Adversary creator, with numbered steps 1 to 4"),
  diceBattle: shot("dice-battle", diceBattle, 1600, 875, "Dice roller and Battle guide windows open in Obsidian, with numbered steps 1 to 5"),
  dataMenu: shot("data-menu", dataMenu, 239, 248, "DaggerForge menu with Import data and Delete data file highlighted"),
  importData: shot("import-data", importData, 1600, 875, "Import Data dialog with data.json selected in the file picker, with numbered steps 1 to 4"),
  deleteData: shot("delete-data", deleteData, 1600, 875, "Delete Data File confirmation dialog next to custom adversaries in the browser"),
};

const CHAPTERS = [
  { id: "install", title: "Install" },
  { id: "menu", title: "The menu" },
  { id: "browse", title: "Browse the rulebook" },
  { id: "create", title: "Create your own" },
  { id: "dice", title: "Dice & battle math" },
  { id: "data", title: "Share & reset data" },
];

// Same content and markup as the plugin's buildCardHTML() for the core Acid Burrower.
const ACID_BURROWER_FEATURES = [
  { name: "Relentless (3)", type: "Passive", cost: "", desc: "The Burrower can be spotlighted up to three times per GM turn. Spend Fear as usual to spotlight them." },
  { name: "Earth Eruption", type: "Action", cost: "Mark a Stress", desc: "to have the Burrower burst out of the ground. All creatures within Very Close range must succeed on an Agility Reaction Roll or be knocked over, making them Vulnerable until they next act." },
  { name: "Spit Acid", type: "Action", cost: "", desc: "Make an attack against all targets in front of the Burrower within Close range. Targets the Burrower succeeds against take 2d6 physical damage and must mark an Armor Slot without receiving its benefits (they can still use armor to reduce the damage). If they can’t mark an Armor Slot, they must mark an additional HP and you gain a Fear." },
  { name: "Acid Bath", type: "Reaction", cost: "", desc: "When the Burrower takes Severe damage, all creatures within Close range are bathed in their acidic blood, taking 1d10 physical damage. This splash covers the ground within Very Close range with blood, and all creatures other than the Burrower who move through it take 1d6 physical damage." },
];

const tickboxes = (count: number, className: string, label: string) =>
  Array.from({ length: count }, (_, i) => (
    <input key={i} type="checkbox" className={className} aria-label={`${label} ${i + 1}`} />
  ));

function AdversaryCard() {
  return (
    <section className="df-card-outer df-pseudo-cut-corners outer guide-card" aria-label="Live Acid Burrower card">
      <div className="df-card-inner df-pseudo-cut-corners inner">
        <div className="df-hp-tickboxes">
          <span className="df-hp-stress">HP</span>{tickboxes(8, "df-hp-tickbox", "HP")}
          <span className="df-adversary-count">1</span>
        </div>
        <div className="df-stress-tickboxes">
          <span className="df-hp-stress">Stress</span>{tickboxes(3, "df-stress-tickbox", "Stress")}
        </div>
        <h2>ACID BURROWER</h2>
        <div className="df-subtitle">Tier 1 Solo <span className="df-source-badge-core">core</span></div>
        <div className="df-desc">A horse-sized insect with digging claws and acidic blood.</div>
        <div className="df-motives">Motives & Tactics: <span className="df-motives-desc">Burrow, drag away, feed, reposition</span></div>
        <div className="df-stats">
          Difficulty: <span className="df-stat">14 |</span> Thresholds: <span className="df-stat">8/15 |</span> HP: <span className="df-stat">8 |</span> Stress: <span className="df-stat">3</span>
          <br />ATK: <span className="df-stat">+3 |</span> Claws: <span className="df-stat">Very Close | 1d12+2 phy</span><br />
          <div className="df-experience-line">Experience: <span className="df-stat">Tremor Sense +2</span></div>
        </div>
        <div className="df-section">FEATURES</div>
        {ACID_BURROWER_FEATURES.map((f) => (
          <div key={f.name} className="df-feature">
            <span className="df-feature-title">{f.name} - {f.type}{f.cost ? `: ${f.cost}` : ":"}</span>{" "}
            <span className="df-feature-desc">{f.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const DICE = [4, 6, 8, 10, 12, 20, 100];

function DiceDemo() {
  const [queue, setQueue] = useState<Record<number, number>>({});
  const [log, setLog] = useState<string[]>([]);
  const queued = Object.entries(queue);

  const roll = () => {
    const rolls = queued.flatMap(([sides, n]) =>
      Array.from({ length: n }, () => 1 + Math.floor(Math.random() * Number(sides))));
    const expr = queued.map(([sides, n]) => `${n}d${sides}`).join(" + ");
    setLog((l) => [`${expr} → [${rolls.join(", ")}] = ${rolls.reduce((a, b) => a + b, 0)}`, ...l].slice(0, 4));
    setQueue({});
  };

  return (
    <div className="guide-widget">
      <p className="guide-widget__label">Try it · Dice roller</p>
      <div className="guide-widget__buttons">
        {DICE.map((sides) => (
          <button key={sides} type="button" className="guide-chip-btn"
            onClick={() => setQueue((q) => ({ ...q, [sides]: (q[sides] ?? 0) + 1 }))}>
            d{sides}
          </button>
        ))}
      </div>
      <p className="guide-widget__queue">
        {queued.length ? queued.map(([sides, n]) => `${n}d${sides}`).join(" + ") : "Click dice to add them to the queue"}
      </p>
      <div className="guide-widget__actions">
        <button type="button" className="guide-btn guide-btn--primary" disabled={!queued.length} onClick={roll}>Roll All</button>
        <button type="button" className="guide-btn" onClick={() => { setQueue({}); setLog([]); }}>Clear log</button>
      </div>
      <ul className="guide-widget__log" aria-live="polite">
        {log.map((line, i) => <li key={log.length - i}>{line}</li>)}
      </ul>
    </div>
  );
}

// Values copied from the plugin's encounterCalc.ts (Daggerheart rulebook battle points).
const ADJUSTMENTS = [
  { value: -1, label: "Less difficult / shorter" },
  { value: -2, label: "2+ Solo adversaries" },
  { value: -2, label: "+1d4 or +2 damage" },
  { value: 1, label: "Lower tier adversary" },
  { value: 1, label: "No Bruisers/Hordes/Leaders/Solos" },
  { value: 2, label: "More dangerous / longer" },
];
const SPEND = [
  { cost: 1, label: "Minions (party size)" },
  { cost: 1, label: "Social / Support" },
  { cost: 2, label: "Horde / Ranged / Skulk / Standard" },
  { cost: 3, label: "Leader" },
  { cost: 4, label: "Bruiser" },
  { cost: 5, label: "Solo" },
];
const signed = (n: number) => (n > 0 ? `+${n}` : `${n}`);

function BattleDemo() {
  const [pcs, setPcs] = useState(4);
  const [adjusted, setAdjusted] = useState(0);
  const [spent, setSpent] = useState(0);
  const base = 3 * pcs + 2;
  const remaining = base + adjusted - spent;

  return (
    <div className="guide-widget">
      <p className="guide-widget__label">Try it · Battle calculator</p>
      <div className="guide-bp__pcs">
        <span>Number of PCs</span>
        <div className="guide-stepper-input">
          <button type="button" aria-label="Fewer players" onClick={() => setPcs((n) => Math.max(1, n - 1))}>−</button>
          <output aria-live="polite">{pcs}</output>
          <button type="button" aria-label="More players" onClick={() => setPcs((n) => Math.min(8, n + 1))}>+</button>
        </div>
      </div>
      <div className="guide-bp__totals">
        <div><span>Base BP</span><strong>{base}</strong><small>3 × {pcs} + 2</small></div>
        <div><span>Adjustments</span><strong>{signed(adjusted)}</strong></div>
        <div><span>Spent</span><strong>{spent}</strong></div>
        <div className={remaining < 0 ? "guide-bp__over" : ""}><span>Remaining</span><strong>{remaining}</strong></div>
      </div>
      <p className="guide-widget__sub">Adjust BP</p>
      <div className="guide-widget__buttons">
        {ADJUSTMENTS.map((a) => (
          <button key={a.label} type="button" className="guide-chip-btn"
            onClick={() => setAdjusted((n) => n + a.value)}>
            {a.label} <b>{signed(a.value)}</b>
          </button>
        ))}
      </div>
      <p className="guide-widget__sub">Spend BP</p>
      <div className="guide-widget__buttons">
        {SPEND.map((s) => (
          <button key={s.label} type="button" className="guide-chip-btn"
            onClick={() => setSpent((n) => n + s.cost)}>
            {s.label} <b>−{s.cost}</b>
          </button>
        ))}
      </div>
      <div className="guide-widget__actions">
        <button type="button" className="guide-btn" onClick={() => { setAdjusted(0); setSpent(0); }}>Clear log</button>
      </div>
    </div>
  );
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="guide-steps">
      {items.map((item, i) => (
        <li key={i}><span className="guide-steps__num" aria-hidden="true">{i + 1}</span><div>{item}</div></li>
      ))}
    </ol>
  );
}

function Shot({ image, caption }: { image: OptimizedImage; caption?: string }) {
  return (
    <figure className="guide-shot">
      <ImageModal image={image} className="guide-shot__img" />
      <figcaption>{caption ?? "Click the screenshot to enlarge it."}</figcaption>
    </figure>
  );
}

function Callout({ kind = "tip", title, children }: { kind?: "tip" | "warn"; title: string; children: ReactNode }) {
  return (
    <aside className={`guide-callout guide-callout--${kind}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

function Chapter({ index, id, title, intro, children }: { index: number; id: string; title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="guide-chapter" aria-labelledby={`${id}-title`}>
      <p className="guide-chapter__num">Chapter {String(index).padStart(2, "0")}</p>
      <h2 id={`${id}-title`} className="guide-chapter__title">{title}</h2>
      <p className="guide-chapter__intro">{intro}</p>
      {children}
    </section>
  );
}

const MENU_GROUPS = [
  { title: "Browse", items: ["Adversary browser", "Environment browser"], chapter: "browse" },
  { title: "Create", items: ["Adversary creator", "Environment creator"], chapter: "create" },
  { title: "Play", items: ["Dice roller", "Battle calculator"], chapter: "dice" },
  { title: "Data", items: ["Import data", "Delete data file"], chapter: "data" },
];

export function DaggerforgeGuide() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(CHAPTERS[0].id);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "How to use Daggerforge · Waleed Alnaimi";
    rootRef.current?.focus();
    return () => { document.title = previousTitle; };
  }, []);

  const onScroll = () => {
    const el = rootRef.current;
    if (!el) return;
    setProgress(el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight));
    let current = CHAPTERS[0].id;
    for (const c of CHAPTERS) {
      const section = document.getElementById(c.id);
      if (section && section.getBoundingClientRect().top < window.innerHeight * 0.35) current = c.id;
    }
    setActive(current);
  };

  // In-page jumps scroll instead of changing the hash, which would close the guide.
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="guide" ref={rootRef} onScroll={onScroll} tabIndex={-1}>
      <header className="guide__topbar">
        <button type="button" className="guide__back" onClick={closeGuide}>← Portfolio</button>
        <span className="guide__topbar-title">Daggerforge guide</span>
        <a className="guide__back" href="https://github.com/Torutu/daggerforge" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <div className="guide__progress" style={{ transform: `scaleX(${progress})` }} />
      </header>

      <section className="guide__hero">
        <div>
          <p className="guide__eyebrow">Obsidian plugin · Daggerheart TTRPG</p>
          <h1 className="guide__title">Daggerforge</h1>
          <p className="guide__lead">
            Every adversary and environment from the Daggerheart rulebook, as compact, interactive cards
            inside your Obsidian notes. Plus creators for your own content, a dice roller and a battle calculator.
          </p>
          <div className="guide__stats">
            <div><strong>7,000+</strong><span>downloads</span></div>
            <div><strong>8</strong><span>tools, one menu</span></div>
            <div><strong>Free</strong><span>and open source</span></div>
          </div>
          <div className="guide__ctas">
            <button type="button" className="guide-btn guide-btn--primary" onClick={() => go("install")}>Start the guide ↓</button>
            <a className="guide-btn" href="https://obsidian.md/download" target="_blank" rel="noopener noreferrer">Get Obsidian ↗</a>
          </div>
        </div>
        <div className="guide__hero-visual">
          <AdversaryCard />
          <p className="guide__card-label">A real Daggerforge card. Tick the HP and Stress boxes.</p>
        </div>
      </section>

      <div className="guide__body">
        <nav className="guide__toc" aria-label="Chapters">
          <p className="guide__toc-title">In this guide</p>
          <ol>
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <button type="button" className={active === c.id ? "is-active" : ""}
                  aria-current={active === c.id ? "step" : undefined} onClick={() => go(c.id)}>
                  <span>{String(i + 1).padStart(2, "0")}</span>{c.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <main className="guide__chapters">
          <Chapter index={1} id="install" title="Install the plugin"
            intro="Daggerforge lives in Obsidian, a free note-taking app. Getting it running takes about two minutes.">
            <ol className="guide-stepper">
              <li>
                <h3>Download Obsidian and create a vault</h3>
                <p>A vault is just a folder for your notes. <a href="https://obsidian.md/download" target="_blank" rel="noopener noreferrer">Download Obsidian ↗</a></p>
              </li>
              <li>
                <h3>Open Settings</h3>
                <p>Use the gear icon in the bottom-left corner.</p>
                <img className="guide-inline-img" src={SHOTS.settingsGear.src} alt={SHOTS.settingsGear.alt} width={199} height={63} loading="lazy" />
              </li>
              <li>
                <h3>Turn on community plugins</h3>
                <p>Go to <b>Community plugins</b> and press <b>Turn on community plugins</b>.</p>
                <Shot image={SHOTS.communityPlugins} />
              </li>
              <li>
                <h3>Find Daggerforge, then install and enable it</h3>
                <p>Press <b>Browse</b>, search for <b>Daggerforge</b>, press <b>Install</b>, then <b>Enable</b>.</p>
                <Shot image={SHOTS.browseSearch} />
              </li>
            </ol>
            <Callout title="You're set">From here on, every feature is something I built. I hope you enjoy trying it out.</Callout>
          </Chapter>

          <Chapter index={2} id="menu" title="Everything starts from one icon"
            intro="Click the Daggerforge icon in Obsidian's left ribbon to open the menu. Each group below has its own chapter.">
            <div className="guide-menu">
              <img className="guide-menu__img" src={SHOTS.ribbonMenu.src} alt={SHOTS.ribbonMenu.alt} width={222} height={397} loading="lazy" />
              <div className="guide-menu__grid">
                {MENU_GROUPS.map((g) => (
                  <button key={g.title} type="button" className="guide-tile" onClick={() => go(g.chapter)}>
                    <span className="guide-tile__title">{g.title}</span>
                    {g.items.map((item) => <span key={item} className="guide-tile__item">{item}</span>)}
                    <span className="guide-tile__go">Jump to chapter →</span>
                  </button>
                ))}
              </div>
            </div>
          </Chapter>

          <Chapter index={3} id="browse" title="Browse the rulebook"
            intro="As Game Masters, we often add adversaries or environments from the rulebook. The browsers let you find them and drop them into your notes from one place.">
            <Shot image={SHOTS.adversaryBrowser} caption="The numbers match the steps below. Click to enlarge." />
            <Steps items={[
              <>Open <b>Adversary browser</b> or <b>Environment browser</b> from the menu.</>,
              <>Click inside the note where the card should appear.</>,
              <>Pick a card from the list, or use the search bar and the tier, source and type filters.</>,
              <>Switch the note to <b>Read mode</b> to hide the HTML and see the finished card.</>,
              <>To edit a card, switch back to <b>Edit mode</b> and press the 📝 button on it.</>,
            ]} />
            <Callout title="Under the hood">
              Every card comes from the Daggerheart rulebook PDF, converted into <code>.json</code> and rebuilt with HTML + CSS
              as compact cards inside Obsidian. The card at the top of this page uses the same markup and styles.
            </Callout>
          </Chapter>

          <Chapter index={4} id="create" title="Create your own"
            intro="Homebrew works the same way. Build adversaries and environments with the creators and they sit right next to the rulebook content.">
            <Shot image={SHOTS.creator} caption="The numbers match the steps below. Click to enlarge." />
            <Steps items={[
              <>Click inside the note where the content should appear.</>,
              <>Open <b>Adversary creator</b> or <b>Environment creator</b> and fill in the form.</>,
              <>Find your content in the browser later. The <b>Custom</b> filter narrows it down.</>,
              <>Switch to <b>Read mode</b> for the best view.</>,
            ]} />
          </Chapter>

          <Chapter index={5} id="dice" title="Dice & battle math"
            intro="The tabletop game uses dice and simple math to keep battles balanced. Following the Daggerheart rulebook, I added a digital version of both to the plugin.">
            <Shot image={SHOTS.diceBattle} caption="The numbers match the steps below. Click to enlarge." />
            <Steps items={[
              <>Open <b>Dice roller</b> and <b>Battle calculator</b> from the menu.</>,
              <>Choose which dice to roll and how many. A d4 rolls a number between 1 and 4.</>,
              <>Press <b>Roll All</b> to see the results.</>,
              <>Enter how many players are in the battle and press <b>Calculate base BP</b> (Battle Points).</>,
              <>Spend Battle Points to build the encounter, with adjustments for how hard it should be.</>,
            ]} />
            <div className="guide-try">
              <DiceDemo />
              <BattleDemo />
            </div>
          </Chapter>

          <Chapter index={6} id="data" title="Share & reset your data"
            intro="The last two menu items manage your custom content: bring in content from other players, or wipe the slate clean.">
            <div className="guide-menu guide-menu--compact">
              <img className="guide-menu__img" src={SHOTS.dataMenu.src} alt={SHOTS.dataMenu.alt} width={239} height={248} loading="lazy" />
              <Steps items={[
                <><b>Import data</b> merges custom content from other players into yours.</>,
                <><b>Delete data file</b> removes all custom content so you can start fresh.</>,
              ]} />
            </div>

            <h3 className="guide-subhead">Importing data</h3>
            <Shot image={SHOTS.importData} caption="The numbers match the steps below. Click to enlarge." />
            <Steps items={[
              <>Click <b>Choose file</b>.</>,
              <>Select a <code>.json</code> file (for example <code>data.json</code>) and press <b>Open</b>.</>,
              <>Press <b>Import</b>. It merges with the content you already have.</>,
              <>The content appears in the Adversary and Environment browsers. Use the <b>Custom</b> filter to find it faster.</>,
            ]} />

            <h3 className="guide-subhead">Deleting data</h3>
            <Shot image={SHOTS.deleteData} caption="The numbers match the steps below. Click to enlarge." />
            <Steps items={[
              <>The browser lists the custom content you imported or created.</>,
              <>Press <b>Delete data file</b> and confirm to remove all of it.</>,
            ]} />
            <Callout kind="warn" title="This can't be undone">
              Deleting removes every custom adversary and environment for good. If you might want them back,
              keep a copy of your <code>data.json</code> first.
            </Callout>
          </Chapter>

          <section className="guide-outro">
            <blockquote>
              Everything here is built to support my hobbies and the hobbies of others.
              I’m proud and happy to make a tool that’s genuinely useful for my community.
            </blockquote>
            <p className="guide-outro__by">Waleed Alnaimi, creator of Daggerforge</p>
            <div className="guide__ctas guide__ctas--center">
              <a className="guide-btn guide-btn--primary" href="https://github.com/Torutu/daggerforge" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>
              <button type="button" className="guide-btn" onClick={closeGuide}>Back to the portfolio</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
