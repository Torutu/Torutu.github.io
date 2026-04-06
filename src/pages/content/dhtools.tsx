import { CollapsibleSection } from "../../utils/pageContext";
import { ImageModal } from "../../components/ImageModal";
import { IMAGES_CONFIG } from "../../config/imagesConfig";

const whatIsDhtools = (
    <>
        <h2 className="rightSideSection__h2">What is DHTools?</h2>
        <p className="rightSideSection__p">
            DHTools is a single-page React application that brings the full content of the Daggerheart TTRPG system
            into an accessible, searchable website. Players and game masters can browse classes, ancestries, equipment,
            adversaries, domain cards and more you can find here <a className="rightSideSection__a" href="https://www.dhtools.net">https://www.dhtools.net</a>.
        </p>
    </>
);

const GlobalSearch = (
    <>
        <CollapsibleSection title="Global Search">
            <h3 className="rightSideSection__h3">What It Does</h3>
            <p className="rightSideSection__p">
                A unified search bar in the header indexes every piece of content at app load time.
                It returns ranked results across all data sources — classes, ancestries, equipment, adversaries, and more —
                with title, category, and a short excerpt. Results appear in a dropdown with full keyboard navigation.
            </p>
            <h3 className="rightSideSection__h3">How It Works</h3>
            <p className="rightSideSection__p">
                On load, <code>buildIndex()</code> scans all data files and builds a flat array of <code>SearchEntry</code> objects.
                Each entry stores a title, category, path, and a plain-text body used for matching.
                Queries are scored with a 4-tier fuzzy algorithm: exact substring, word match, subsequence, and typo tolerance.
                The top 12 results are displayed and re-ranked on every keystroke.
            </p>
        </CollapsibleSection>
    </>
);

const FuzzySearch = (
    <>
        <CollapsibleSection title="Fuzzy Search Algorithm">
            <h3 className="rightSideSection__h3">What It Does</h3>
            <p className="rightSideSection__p">
                Every search bar and filter in the app shares the same fuzzy matching logic.
                It tolerates partial input, out-of-order letters, and single-character typos
                so users find what they need without needing exact spelling.
            </p>
            <h3 className="rightSideSection__h3">How It Works</h3>
            <p className="rightSideSection__p">
                <code>scoreMatch()</code> runs four checks in priority order: exact substring match,
                all query words present anywhere in the text, letters appearing in sequence (subsequence),
                and one-character edit distance for words four letters or longer.
                <code>fuzzyFilter()</code> applies this score across an array and sorts by relevance,
                with an optional title extractor that gives title matches a 2× score boost.
            </p>
        </CollapsibleSection>
    </>
);

const AccessibilityFeatures = (
    <>
        <CollapsibleSection title="Accessibility">
            <h3 className="rightSideSection__h3">What It Does</h3>
            <p className="rightSideSection__p">
                DHTools targets WCAG 2.1 Level AA. It ships with four visual themes, three font size levels,
                ARIA labels throughout.
                All theme and font preferences are persisted in localStorage and restored on page load.
            </p>
            <h3 className="rightSideSection__h3">How It Works</h3>
            <p className="rightSideSection__p">
                Themes are applied via a <code>data-theme</code> attribute on <code>&lt;body&gt;</code> and resolved through
                CSS variables (dark, light, high-contrast dark, high-contrast light).
                Font size is controlled by a <code>data-font</code> attribute on <code>&lt;html&gt;</code>
                with multipliers of ×1.00, ×1.15, and ×1.30. Both are managed by the <code>useDarkMode()</code> custom hook.
            </p>
        </CollapsibleSection>
    </>
);

const ResponsiveDesign = (
    <>
        <CollapsibleSection title="Responsive Design">
            <h3 className="rightSideSection__h3">What It Does</h3>
            <p className="rightSideSection__p">
                All pages adapt between mobile and desktop layouts at a 1175px breakpoint.
                Navigation, filters, and content panels reflow for smaller screens without losing functionality.
            </p>
            <h3 className="rightSideSection__h3">How It Works</h3>
            <p className="rightSideSection__p">
                The <code>useIsMobile()</code> custom hook returns <code>true</code> when the viewport width is 1175px or less,
                updated on every resize event. Components conditionally render mobile or desktop variants based on this value.
            </p>
        </CollapsibleSection>
    </>
);

const FilterAndSortSystem = (
    <>
        <CollapsibleSection title="Filter & Sort System">
            <h3 className="rightSideSection__h3">What It Does</h3>
            <p className="rightSideSection__p">
                Most content pages have a left panel with pill-style filter buttons and a sort bar.
                Filters support multi-select and reset back to "All" when empty. Sorting toggles
                direction on repeated clicks and switches column otherwise.
            </p>
            <h3 className="rightSideSection__h3">How It Works</h3>
            <p className="rightSideSection__p">
                Filters use <code>Set&lt;string&gt;</code> state. The special value <code>'All'</code> signals no active filter.
                Toggling a value removes <code>'All'</code> from the set; if the set becomes empty it falls back to <code>'All'</code>.
                Sort state is a simple <code>{"{ col, dir }"}</code> object managed by the <code>useSort()</code> hook.
                Pages chain fuzzy search → categorical filters → sort in one pass before rendering.
            </p>
        </CollapsibleSection>
    </>
);

const Performance = (
    <>
        <CollapsibleSection title="Performance">
            <h3 className="rightSideSection__h3">What It Does</h3>
            <p className="rightSideSection__p">
                Large data sets (domain cards, adversaries, equipment) render without noticeable lag
                even with active filters and search queries running simultaneously.
            </p>
            <h3 className="rightSideSection__h3">How It Works</h3>
            <p className="rightSideSection__p_end">
                Filtered and sorted lists are wrapped in <code>useMemo()</code> so they only recompute when
                their dependencies change. Callbacks passed to child components are wrapped in <code>useCallback()</code>
                to prevent unnecessary re-renders. Heavy card components in large lists use <code>React.memo()</code>
                with custom equality checks to skip renders when props are unchanged.
            </p>
        </CollapsibleSection>
    </>
);

const featureBreakdown = (
    <>
        <ImageModal
            image={IMAGES_CONFIG.dhtools}
            className="rightSideSection__img"
        />
        <h1 className="rightSideSection__h1">Features</h1>
        {GlobalSearch}
        {FuzzySearch}
        {AccessibilityFeatures}
        {ResponsiveDesign}
        {FilterAndSortSystem}
        {Performance}
    </>
);

export const dhtoolsContent = (
    <>
        <h1 className="rightSide__h">DHTools</h1>
        {whatIsDhtools}
        {featureBreakdown}
    </>
);
