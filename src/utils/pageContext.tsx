import { createContext, useContext, useLayoutEffect, useState, ReactNode } from "react";
import { THEMES } from "../config/portfolioConfig";

interface PageContextType {
  page: string;
  setPage: (page: string) => void;
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const PageContext = createContext<PageContextType>({
  page: "aboutMe",
  setPage: () => {},
  selectedProject: "",
  setSelectedProject: () => {},
  theme: THEMES[0].id,
  setTheme: () => {},
});

const THEME_KEY = "portfolio-theme";

const savedTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (THEMES.some((t) => t.id === saved)) return saved as string;
  } catch {
    // storage blocked (private mode): use the default theme
  }
  return THEMES[0].id;
};

export const PageProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState("aboutMe");
  const [selectedProject, setSelectedProject] = useState("");
  const [theme, setTheme] = useState(savedTheme);

  // Layout effect so the saved theme is applied before the first paint (no flash of the default)
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // storage blocked: the theme still applies for this visit
    }
  }, [theme]);

  // Custom setPage that clears selectedProject when leaving projects page
  const handleSetPage = (newPage: string) => {
    setPage(newPage);
    // Clear selected project when navigating away from projects page
    if (newPage !== "projects") {
      setSelectedProject("");
    }
  };

  return (
    <PageContext.Provider value={{ page, setPage: handleSetPage, selectedProject, setSelectedProject, theme, setTheme }}>
      <div className="App">
        <div className="layout">
          {children}
        </div>
      </div>
    </PageContext.Provider>
  );
}

export function CollapsibleSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="collapsibleSection">
      <button
        className="collapsibleButton"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="collapsibleButton__arrow" aria-hidden="true">▼</span> {title}
      </button>

      {open && (
        <div className="collapsibleContent">
          {children}
        </div>
      )}
    </div>
  );
}

export const usePage = () => useContext(PageContext);
