import { THEMES } from "../config/portfolioConfig";
import { usePage } from "../utils/pageContext";

// Each swatch carries its own data-theme, so it renders with that theme's CSS variables.
export function ThemePicker() {
  const { theme, setTheme } = usePage();

  return (
    <div className="theme-picker" role="group" aria-label="Color theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          data-theme={t.id}
          className="theme-picker__swatch"
          aria-pressed={t.id === theme}
          aria-label={`${t.name} theme`}
          onClick={() => setTheme(t.id)}
        />
      ))}
    </div>
  );
}
