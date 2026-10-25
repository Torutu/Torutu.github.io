import { CollapsibleSection } from "../../utils/pageContext";
import { ImageModal } from "../../components/ImageModal";
import { IMAGES_CONFIG } from "../../config/imagesConfig";

const whatIsDaggerforge = (
  <>
    <h2 className="rightSideSection__h2">What is Daggerforge?</h2>
    <p className="rightSideSection__p">
      Daggerforge is an Obsidian plugin that helps people prepare and manage tabletop game sessions more easily.
      It lets users browse and organize game elements, create custom content, and insert it directly into their notes.
      It includes tools for building interactive cards, tracking values, rolling dice, calculating encounter difficulty,
      and arranging everything visually on Obsidian's canvas. It has reached 7,000+ downloads with an active community.
    </p>
  </>
);

const links = (
  <div className="project-cta">
    <a className="project-cta__primary" href="#daggerforge-guide">Read the illustrated guide →</a>
    <a className="project-cta__secondary" href="https://github.com/Torutu/daggerforge" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
  </div>
);

const AdversaryBrowser = (
  <>
    <CollapsibleSection title="Adversary Browser">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        A sidebar panel that displays adversary cards with 
        real-time multi-filter search. Filter by name, tier level (1-4), 
        type (Bruiser, Horde, Solo, etc.), or content source. Click any 
        result to insert it into your note or canvas.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Search engine maintains current filters 
        and searches across loaded adversaries. When you adjust any filter (name, tier, type, source), 
        it instantly re-queries the data and re-renders results. Built-in JSON data and 
        custom user-created adversaries are merged and displayed together.
      </p>
    </CollapsibleSection>
  </>
);

const CardBuilderandHTMLGenerator = (
  <>
    <CollapsibleSection title="Card Builder">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Converts data into styled HTML cards that 
        render directly in your notes. Cards include interactive HP/Stress checkboxes, weapon stats, 
        features, and visual badges showing difficulty and content source.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Takes data from .json files adversary and environment stat blocks 
        (HP, Damage, Difficulty, Features, etc.)
        and builds an HTML string. For each HP point, creates a checkbox. 
        Repeats the entire HP/Stress section based on adversary count. 
        Maps feature objects into formatted divs with names, types, 
        costs, and descriptions.
      </p>
    </CollapsibleSection>
  </>
);

const UniqueIDandDataPersistence = (
  <>
    <CollapsibleSection title="Unique ID & Data Persistence">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Every custom adversary and environment gets a 
        unique identifier (CUA_timestamp_random). 
        Stored in plugin's data.json file. 
        Enables reliable deletion, editing, and prevents data duplication across sessions.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        {`When creating custom content, generate ID: CUA_\${Date.now()}_\${randomString}.
         DataManager loads all stored data from .obsidian/plugins/daggerforge/data.json. 
         Delete by ID: find index matching ID, remove from array, then save. 
         Update works the same way: find by ID, replace in notes, duplicate with a unique ID, then save.`}
      </p>
    </CollapsibleSection>
  </>
);

const DiceRoller = (
  <>
    <CollapsibleSection title="Dice Roller">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Draggable floating panel for rolling multiple dice.
        Select dice (d4, d6, d20, etc.), set quantity, queue them up, roll all at once. 
        Results display in persistent log showing expression and total.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Click dice buttons to add to queue (e.g., "2d6", "1d20"). 
        Click "Roll All" to evaluate expression. Drag header to move window around. 
        Results appear in log below. Each log entry shows the full expression and breakdown.
      </p>
    </CollapsibleSection>
  </>
);

const EncounterCalculator = (
  <>
    <CollapsibleSection title="Encounter Calculator">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Calculate Battle Points for balanced encounters. Enter player count,
        adjust BP based on conditions (more difficult +2, special rules -1, etc.), 
        then "spend" BP by adding adversaries. Real-time balance tracking.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Base BP formula from the book: 3 × playerCount + 2. 
        Buttons add/subtract adjustments (each shows reason). Separate buttons "spend" BP 
        by adding adversary types (Minion costs 1 BP, Solo costs 5 BP, etc.). UI shows total 
        adjustments, total spent, and remaining BP in real-time.
      </p>
    </CollapsibleSection>
  </>
);

const EnvironmentBrowser = (
  <>
    <CollapsibleSection title="Environment Browser">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Parallel to adversary browser. Display environments 
        (locations, scenes) with searchable filters. Environments include features 
        with bullets, questions for players, and impulse prompts. Insert as cards 
        into notes or canvas.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Same filter system as adversaries 
        (name, tier, type, source). Click environment to insert rich HTML card 
        showing name, description, impulse, difficulty, and formatted features 
        with bullets and player questions.
      </p>
    </CollapsibleSection>
  </>
);

const CardEditor = (
  <>
    <CollapsibleSection title="Card Editor">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Edit adversary or environment cards in-place. 
        Opens form with pre-populated values. Modify any field (name, HP, features, etc.), 
        click "Update Card" to replace original card without leaving note.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        When user clicks edit button on card, modal opens 
        showing all current values. Form has inputs for basic stats, textarea for 
        description, feature rows that can be added/removed. Submit generates new 
        HTML and replaces card via editor.
      </p>
    </CollapsibleSection>
  </>
);

const CanvasIntegration = (
  <>
    <CollapsibleSection title="Canvas Integration">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Detect whether user has canvas (visual note layout) or markdown view open. 
        Insert cards into canvas as draggable blocks or into markdown as inline HTML.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p_end">
        Check active view type: if CanvasView, create new file with card HTML,
        add to canvas at calculated position. If MarkdownView, insert HTML at editor position. 
        If neither, show error notice.
      </p>
    </CollapsibleSection>
  </>
);

const featureBreakdown = (
  <>
    <ImageModal 
      image={IMAGES_CONFIG.daggerforge}
      className="rightSideSection__img"
    />
    <h1 className="rightSideSection__h1">Features</h1>
    {AdversaryBrowser}
    {EnvironmentBrowser}
    {CardBuilderandHTMLGenerator}
    {UniqueIDandDataPersistence}
    {DiceRoller}
    {EncounterCalculator}
    {CardEditor}
    {CanvasIntegration}
  </>
);

export const daggerforgeContent = (
  <>
    <h1 className="rightSide__h">Daggerforge</h1>
    {links}
    {whatIsDaggerforge}
    {featureBreakdown}
  </>
);
