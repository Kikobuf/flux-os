const THEMES = [
  { id: "tokyo-night",    name: "Tokyo Night",   bg: "#1a1b26", accent: "#7aa2f7", fg: "#c0caf5" },
  { id: "catppuccin",     name: "Catppuccin",    bg: "#1e1e2e", accent: "#cba6f7", fg: "#cdd6f4" },
  { id: "gruvbox",        name: "Gruvbox",       bg: "#282828", accent: "#fabd2f", fg: "#ebdbb2" },
  { id: "nord",           name: "Nord",          bg: "#2e3440", accent: "#88c0d0", fg: "#eceff4" },
  { id: "rose-pine",      name: "Rosé Pine",     bg: "#191724", accent: "#eb6f92", fg: "#e0def4" },
  { id: "everforest",     name: "Everforest",    bg: "#2d353b", accent: "#a7c080", fg: "#d3c6aa" },
  { id: "hackerman",      name: "Hackerman",     bg: "#0d0d0d", accent: "#00ff00", fg: "#33ff33" },
  { id: "kanagawa",       name: "Kanagawa",      bg: "#1f1f28", accent: "#7e9cd8", fg: "#dcd7ba" },
  { id: "matte-black",    name: "Matte Black",   bg: "#0a0a0a", accent: "#ffffff", fg: "#cccccc" },
  { id: "osaka-jade",     name: "Osaka Jade",    bg: "#1a1a2e", accent: "#00ff88", fg: "#e0e0e0" },
  { id: "retro-82",       name: "Retro 82",      bg: "#1a0a2e", accent: "#ff6ec7", fg: "#f0e6ff" },
  { id: "lumon",          name: "Lumon",         bg: "#e8f4f8", accent: "#2a6b9c", fg: "#1a2a3a" },
  { id: "ethereal",       name: "Ethereal",      bg: "#0d1117", accent: "#58a6ff", fg: "#c9d1d9" },
  { id: "vantablack",     name: "Vantablack",    bg: "#000000", accent: "#333333", fg: "#888888" },
  { id: "white",          name: "White",         bg: "#ffffff", accent: "#000000", fg: "#333333" },
  { id: "nord",           name: "Nord",          bg: "#2e3440", accent: "#88c0d0", fg: "#eceff4" },
  { id: "last-horizon",   name: "Last Horizon",  bg: "#0f0f23", accent: "#ff79c6", fg: "#f8f8f2" },
  { id: "solitude",       name: "Solitude",      bg: "#1a1a2e", accent: "#a8b2d8", fg: "#e2e8f0" },
  { id: "miasma",         name: "Miasma",        bg: "#1c1917", accent: "#78a960", fg: "#d4be98" },
];

// Deduplicate
const UNIQUE_THEMES = THEMES.filter((t, i, a) => a.findIndex(x => x.id === t.id) === i);

export default function PickTheme({ selections, update, next, back }) {
  return (
    <div className="screen">
      <div className="screen-header">
        <div className="screen-title">Pick your theme</div>
        <div className="screen-subtitle">You can change this any time from settings.</div>
      </div>

      <div className="theme-grid">
        {UNIQUE_THEMES.map((theme) => (
          <div
            key={theme.id}
            className={`theme-card ${selections.theme === theme.id ? "selected" : ""}`}
            onClick={() => update("theme", theme.id)}
          >
            <div
              className="theme-preview"
              style={{ background: theme.bg, color: theme.fg }}
            >
              <span style={{ color: theme.accent, fontSize: "1.2rem", fontWeight: 700 }}>Aa</span>
            </div>
            <div className="theme-name" style={{ background: theme.bg, color: theme.fg }}>
              {theme.name}
            </div>
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={back}>Back</button>
        <button className="btn btn-primary" onClick={next}>Continue →</button>
      </div>
    </div>
  );
}
