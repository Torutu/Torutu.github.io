# Frontend Documentation

## Architecture Overview

DHTools is a single-page React application built with **React 19 + TypeScript**. The app consists of:
- 15 page components under `src/pages/`
- 5 shared UI components under `src/components/`
- Utility functions for search, text parsing, and responsive detection
- Centralized styling via `src/index.css` with CSS variables
- Data loaded from JSON/JS files in `src/data/`

**Key Design Principles:**
- Offline-first (all data bundled, no backend)
- Responsive design (mobile + desktop)
- Accessible (WCAG 2.1 Level AA target)
- Performance-optimized (memoization, lazy loading)

---

## Shared Components

All components live in `src/components/` and are imported by pages as needed.

### SearchBar.tsx
Global search bar in the header that builds a unified search index from all data sources at app load time.

**What it does:**
- Accepts user queries and returns ranked results
- Supports fuzzy matching with 4 tiers: exact substring, word match, subsequence, typo tolerance
- Results include title, category, path, and optional excerpt
- Displays 12 top results in a dropdown with keyboard navigation (arrow keys, enter to select)

**Key functions:**
- `buildIndex()` — scans all data (classes, ancestries, equipment, adversaries, etc.) and creates `SearchEntry[]`
- `scoreMatch(text, query)` — fuzzy scoring algorithm used by all search bars

**Usage in pages:**
```tsx
import SearchBar from '../components/SearchBar';
// Just add it to the header, no props needed
<SearchBar />
```

---

## How to Add Content to Global Search

All search entries are registered in one file: `src/utils/searchIndex.ts`, inside the `buildIndex()` function. Every entry is a `SearchEntry` object.

```ts
interface SearchEntry {
  title: string;     // displayed as the result heading
  category: string;  // displayed as the result subheading (e.g. "Ancestry", "GM Tools · Combat")
  path: string;      // where clicking the result navigates
  text: string;      // searchable body text (not shown directly, used for matching)
  excerpt?: string;  // optional short preview shown under the result
}
```

### Step 1 — Decide what kind of content you are adding

There are two cases:

**A. Data-driven content** (classes, ancestries, items, adversaries, etc.)
The data lives in a JSON file under `src/data/`. The search index loops over it.

**B. Static/manual content** (mechanics sections, GM tool tabs, campaign frame pages, etc.)
There is no data file. You write the entries directly as a hardcoded array in `buildIndex()`.

---

### Step 2A — Adding a data-driven source

1. Import your data file at the top of `searchIndex.ts`:
   ```ts
   import myData from '../data/myData.json';
   ```

2. Inside `buildIndex()`, loop over the data and push entries:
   ```ts
   myData.forEach((item) => {
     index.push({
       title: item.name,
       category: 'My Category',
       path: `/my-page/${item.name.toLowerCase()}`,
       text: [item.description || '', item.someOtherField || ''].join(' '),
     });
   });
   ```

3. The `text` field is what gets searched. Join every field that a user might search for (name, description, features, tags).

---

### Step 2B — Adding static/manual entries

1. Inside `buildIndex()`, create an array of `SearchEntry` objects and push them all at once:
   ```ts
   const myTopics: SearchEntry[] = [
     {
       title: 'My Section Title',
       category: 'My Page',
       path: '/my-page?tab=MY+TAB',
       text: 'keywords the user might type to find this',
     },
     {
       title: 'My Subsection',
       category: 'My Page · My Tab',
       path: '/my-page?tab=MY+TAB#my-anchor',
       text: 'more keywords',
     },
   ];
   index.push(...myTopics);
   ```

2. The `path` should match the exact URL the user needs to land on:
   - Tab: `/mechanics?tab=COMBAT`
   - Tab + anchor: `/mechanics?tab=COMBAT#evasion`
   - Detail page: `/ancestries/clank`
   - Query param: `/adversaries?q=Goblin`

---

### Step 3 — Set the `text` field correctly

The `text` field is the only thing that gets matched against the search query. Include:
- All words a user might type to find this entry
- Synonyms and alternate phrasings
- Field values that are not in the title (e.g. role, tier, trait, feature names)

Do not put markdown, JSX, or HTML in `text`. Plain strings only.

---

### Step 4 — Verify

Run the dev server and search for a word that only appears in your new entry's `text`. Confirm the result appears and navigates to the correct page.

---

### Sidebar.tsx
Left-side navigation panel with collapsible sections.

**Config:**
Navigation structure is defined in `NAV_SECTIONS` array with:
- `group` — section label ("Getting Started", "Core Materials", etc.)
- `items` — array of navigation links

**How to add a link:**
```ts
{
  path: '/my-page',
  label: 'My Page',
  sub: false  // omit or set false for top-level
}
```

Sub-items (indented):
```ts
{
  path: '/my-page?detail=true',
  label: 'Detail View',
  sub: true
}
```

### DomainIcon.tsx & DomainSprite.tsx
Domain icons use an SVG sprite sheet for efficiency.

- **DomainSprite** — hidden SVG containing all 9 domain icons as symbols
- **DomainIcon** — wrapper component that displays a specific domain icon by name

**Usage:**
```tsx
<DomainIcon domain="Arcana" size={24} />
```

Available domains: Arcana, Blade, Bone, Codex, Grace, Midnight, Sage, Splendor, Valor

### ScrollToTopBtn.tsx
Floating button that appears after scrolling 300px down and smoothly scrolls back to top.

---

## Custom Hooks

All hooks are located in `src/utils/`.

### useIsMobile()
Returns `true` when viewport width ≤ 768px (tablet breakpoint).

```tsx
const isMobile = useIsMobile();
if (isMobile) {
  // show mobile layout
}
```

### useSort()
Manages sort state with column name and direction (asc/desc).

```tsx
const [sort, setSort] = useSort({ col: 'name', dir: 'asc' });

const handleSort = (col: string) =>
  setSort((prev) =>
    prev.col === col
      ? { col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
      : { col, dir: 'asc' }
  );
```

### useDarkMode()
Manages theme state and localStorage persistence.

```tsx
const [theme, setTheme] = useDarkMode();
// theme is one of: 'dark', 'light', 'hc-dark', 'hc-light', 'sepia'
```

---

## Utility Functions

### fuzzySearch.ts
Shared search logic imported by every search bar and filter. Implements 4-tier matching:

1. **Exact substring** — "druid" matches "Druid Ability" immediately
2. **Word match** — every word in query appears somewhere in text
3. **Subsequence** — letters appear in order ("blad" → "Blade")
4. **Typo tolerance** — one character off still scores (words ≥ 4 letters only)

**Main functions:**
```tsx
// Get a score for how well query matches text (0 to 1)
scoreMatch(text: string, query: string): number

// Filter and sort array by relevance
fuzzyFilter(
  items: T[],
  query: string,
  textExtractor: (item: T) => string,
  titleExtractor?: (item: T) => string  // gets 2x score boost
): T[]
```

**Example:**
```tsx
const results = fuzzyFilter(
  adversaries,
  'goblin',
  (a) => a.description,
  (a) => a.name
);
```

### parseText.tsx
Markdown-style text parsing for rendering rich text with bold, italic, code, and lists.

**Functions:**
- `parseText(markdown: string)` — converts markdown to JSX
- `parseCardText(markdown: string)` — variant for card text with special handling

**Syntax:**
- `**bold**` → bold
- `*italic*` → italic
- `` `code` `` → code
- Bullet points starting with `•` → `<ul>`

---

## Styling System

### CSS Variables (src/index.css)

All styling uses CSS variables for consistent theming. Five themes available:

| Theme | Selector |
|---|---|
| Dark (default) | `(none)` |
| Light | `body[data-theme='light']` |
| High-contrast dark | `body[data-theme='hc-dark']` |
| High-contrast light | `body[data-theme='hc-light']` |
| Sepia | `body[data-theme='sepia']` |

**Key variables:**
- `--gold` — primary accent, buttons, highlights
- `--purple-light` — secondary accent
- `--bg-card` — card backgrounds
- `--border` — divider lines
- `--text-primary` — main readable text
- `--text-muted` — dimmed labels

**To change a color:**
Find the relevant theme block in `src/index.css` and update the variable.

### Font Sizes

Three zoom levels via `data-font` attribute on `<html>`:

| Level | Multiplier | Label |
|---|---|---|
| Normal | ×1.00 | (none) |
| Large | ×1.15 | `lg` |
| Extra Large | ×1.30 | `xl` |

Both theme and font size are persisted in `localStorage` and restored on page load.

---

## Page Patterns

### Standard Content Layout

Most pages follow this structure:

```
┌─────────────────┬──────────────────────────────────────────┐
│  LEFT PANEL     │  Horizontal bar (filters, sort, search)  │
│  (sticky)       ├──────────────────────────────────────────┤
│                 │                                          │
│  Filter count   │  Main content:                           │
│  & buttons      │  • Tables (equipment)                    │
│  (pill style)   │  • Card grids (domains, beastforms)     │
│                 │  • Collapsible items (adversaries, env)  │
│  ↺ Reset        │                                          │
│  (red when      │                                          │
│   dirty)        │                                          │
└─────────────────┴──────────────────────────────────────────┘
```

### Filter System

Filters use `Set<string>` for state. Special value `'All'` means "no filter active".

```tsx
const [tierFilter, setTierFilter] = useState(new Set(['All']));

// Toggle filter
function toggleFilter(current: Set<string>, value: string): Set<string> {
  if (value === 'All') return new Set(['All']);  // clicking All clears everything
  const next = new Set(current);
  next.delete('All');
  if (next.has(value)) {
    next.delete(value);
    if (next.size === 0) next.add('All');  // back to All when empty
  } else {
    next.add(value);
  }
  return next;
}

// Check if value passes filter
function passesFilter(set: Set<string>, value: string): boolean {
  return set.has('All') || set.has(value);
}
```

### Sorting

Sort state is a simple object:

```tsx
const [sort, setSort] = useState<SortState>({ col: 'name', dir: 'asc' });

// Toggle direction or change column
const handleSort = (col: string) =>
  setSort((prev) =>
    prev.col === col
      ? { col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
      : { col, dir: 'asc' }
  );
```

---

## Data Sources

All data is stored in `src/data/` as JSON or JS files:

| File | Type | Purpose |
|---|---|---|
| `domainCards.js` | JS export | 189 domain cards with levels and costs |
| `equipment.json` | JSON | Weapons and armor |
| `adversaries.json` | JSON | Monster stat blocks |
| `environments.json` | JSON | Scene environments |
| `beastforms.json` | JSON | Beastform cards |
| `classes.json` | JSON | Player classes |
| `ancestries.json` | JSON | Character ancestries |
| `communities.json` | JSON | Community options |
| `items.json` | JSON | Items and consumables |
| `consumables.json` | JSON | Consumable items |

**Best practice:** Keep data as flat arrays of objects for simplicity.

---

## React Concepts Used

### State Management

- **useState** — page-level state (filters, search, sort)
- **useEffect** — side effects (scroll position, URL sync, data fetching)
- **useCallback** — memoized functions passed to child components
- **useMemo** — expensive computations (filtered/sorted lists)
- **useRef** — DOM references (scroll containers, input focus)

### Context & Hooks

- **React Router hooks** — `useSearchParams()`, `useLocation()`, `useNavigate()`
- **Custom hooks** — `useIsMobile()`, `useSort()`, `useDarkMode()`

### Performance

- **React.memo** — skip re-renders for identical props
- **useCallback** — prevent child re-renders from parent updates
- **useMemo** — cache expensive computations

Example from Domains.tsx (CardModal):
```tsx
const CardModal = React.memo(
  ({ card, onClose }: CardModalProps) => (
    // modal content
  ),
  (prev, next) => prev.card.name === next.card.name && prev.onClose === next.onClose
);
```

### Component Lifecycle

```tsx
useEffect(() => {
  // Runs after render
  return () => {
    // Cleanup function (optional)
  };
}, [dependencies]); // Only re-run if dependencies change
```

---

## Common Patterns

### Responsive Conditional Rendering

```tsx
const isMobile = useIsMobile();

return (
  <>
    {isMobile && <MobileNav />}
    {!isMobile && <DesktopNav />}
  </>
);
```

### Search + Filter + Sort Chain

Most pages follow this pattern:
1. Apply text search (filter by relevance)
2. Apply categorical filters (tier, role, etc.)
3. Apply sort (column + direction)

```tsx
let results = fuzzyFilter(data, searchQuery, (item) => item.description, (item) => item.name);
results = results.filter((item) => passesFilter(tierFilter, item.tier));
results = results.sort((a, b) => {
  const aVal = a[sort.col];
  const bVal = b[sort.col];
  const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
  return sort.dir === 'asc' ? cmp : -cmp;
});
```

### Collapsible Cards

Adversaries and Environments use collapsible stat blocks:

```tsx
const [expanded, setExpanded] = useState<Set<string>>(new Set());

const toggle = (id: string) => {
  const next = new Set(expanded);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  setExpanded(next);
};
```

---

## Adding a New Page

**1. Create the data file** (if needed)
Place a `.json` file in `src/data/` with your data.

**2. Create the page component**
Create `src/pages/MyPage.tsx`. Template:
```tsx
import React, { useState } from 'react';
import MyPageData from '../data/mypage.json';
import './MyPage.css';

export default function MyPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Page</h1>
        <p>Description here</p>
      </div>
      {/* Content here */}
    </div>
  );
}
```

**3. Add the route** in `src/App.tsx`:
```tsx
<Route path="/my-page" element={<MyPage />} />
```

**4. Add to sidebar** in `src/components/Sidebar.tsx`:
```ts
{ path: '/my-page', label: 'My Page' }
```

---

## Accessibility Status

Current target: WCAG 2.1 Level AA

**Fixed issues:**
- Semantic HTML (nav, main, section)
- Keyboard navigation (Tab, Enter, Arrow keys)
- ARIA labels and roles
- Color contrast (minimum 4.5:1 for text)
- Focus indicators (visible outlines)
- Skip-to-content link

**In progress:**
- High contrast mode testing
- Light mode contrast ratio validation

See `docs/buglog.md` for issue tracking.

---

## Performance Tips

1. **Memoize expensive components** — use `React.memo()` for cards in large lists
2. **Memoize callbacks** — use `useCallback()` if passing to memoized children
3. **Cache computations** — use `useMemo()` for filtered/sorted lists
4. **Lazy load data** — bundle splitting via React Router
5. **Minimize re-renders** — keep state as high as needed, no higher

---

## Testing

Tests are in `src/*.test.tsx` using React Testing Library.

**Run tests:**
```bash
npm test
```

**Run tests in CI mode:**
```bash
CI=true npm test
```

**Key patterns:**
- Test behavior, not implementation
- Use `screen.getByRole()`, not `screen.getByTestId()`
- Simulate user interactions with `userEvent` or `fireEvent`

---

## Deployment

Built for **Azure Static Web Apps**.

**Build:**
```bash
npm run build
```

Output goes to `build/` directory. Routing configured in `public/staticwebapp.config.json`.

---

## Common Issues & Fixes

### "Cannot find module" errors
- Restart dev server: `npm start`
- Check import paths (case-sensitive on Linux/Mac)

### Search results not updating
- Clear browser cache
- Search index is built at app load; restart dev server if data files change

### Theme not persisting
- Check localStorage is not disabled
- Clear localStorage: `localStorage.clear()`

### Mobile layout broken
- Run `npm start` and check viewport size is ≤ 768px
- Check `useIsMobile()` hook is imported correctly

---

## Code Style

- **Components:** PascalCase (MyComponent.tsx)
- **Variables/functions:** camelCase
- **CSS classes:** kebab-case
- **Types/interfaces:** PascalCase
- **Imports:** organize as: React first, then libraries, then local (with blank lines between groups)

---

## Resources

- [React 19 Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
