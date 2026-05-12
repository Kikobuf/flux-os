import { useState } from "react";
import Toggle from "../components/Toggle";
import SettingRow from "../components/SettingRow";

const THEMES = [
  { id: "tokyo-night",  name: "Tokyo Night", bg: "#1a1b26", accent: "#7aa2f7", fg: "#c0caf5" },
  { id: "catppuccin",   name: "Catppuccin",  bg: "#1e1e2e", accent: "#cba6f7", fg: "#cdd6f4" },
  { id: "gruvbox",      name: "Gruvbox",     bg: "#282828", accent: "#fabd2f", fg: "#ebdbb2" },
  { id: "nord",         name: "Nord",        bg: "#2e3440", accent: "#88c0d0", fg: "#eceff4" },
  { id: "rose-pine",    name: "Rosé Pine",   bg: "#191724", accent: "#eb6f92", fg: "#e0def4" },
  { id: "everforest",   name: "Everforest",  bg: "#2d353b", accent: "#a7c080", fg: "#d3c6aa" },
  { id: "hackerman",    name: "Hackerman",   bg: "#0d0d0d", accent: "#00ff00", fg: "#33ff33" },
  { id: "kanagawa",     name: "Kanagawa",    bg: "#1f1f28", accent: "#7e9cd8", fg: "#dcd7ba" },
  { id: "matte-black",  name: "Matte Black", bg: "#0a0a0a", accent: "#ffffff", fg: "#cccccc" },
  { id: "osaka-jade",   name: "Osaka Jade",  bg: "#1a1a2e", accent: "#00ff88", fg: "#e0e0e0" },
  { id: "retro-82",     name: "Retro 82",    bg: "#1a0a2e", accent: "#ff6ec7", fg: "#f0e6ff" },
  { id: "lumon",        name: "Lumon",       bg: "#e8f4f8", accent: "#2a6b9c", fg: "#1a2a3a" },
  { id: "ethereal",     name: "Ethereal",    bg: "#0d1117", accent: "#58a6ff", fg: "#c9d1d9" },
  { id: "vantablack",   name: "Vantablack",  bg: "#000000", accent: "#333333", fg: "#888888" },
  { id: "white",        name: "White",       bg: "#ffffff", accent: "#000000", fg: "#333333" },
  { id: "last-horizon", name: "Last Horizon",bg: "#0f0f23", accent: "#ff79c6", fg: "#f8f8f2" },
  { id: "solitude",     name: "Solitude",    bg: "#1a1a2e", accent: "#a8b2d8", fg: "#e2e8f0" },
  { id: "miasma",       name: "Miasma",      bg: "#1c1917", accent: "#78a960", fg: "#d4be98" },
];

const ACCENTS = [
  "#00ff88", "#00aaff", "#ff6ec7", "#fabd2f",
  "#ff4444", "#a78bfa", "#34d399", "#fb923c",
  "#ffffff", "#888888",
];

const FONTS = [
  "JetBrains Mono",
  "Fira Code",
  "Cascadia Code",
  "IBM Plex Mono",
  "iA Writer Mono",
  "Hack",
  "Source Code Pro",
];

export default function Appearance({ run }) {
  const [theme, setTheme]       = useState("tokyo-night");
  const [darkMode, setDarkMode] = useState(true);
  const [accent, setAccent]     = useState("#00ff88");
  const [font, setFont]         = useState("JetBrains Mono");
  const [corners, setCorners]   = useState(false);
  const [animations, setAnimations] = useState(true);

  const applyTheme = (id) => {
    setTheme(id);
    run(`flux-theme-set ${id}`);
  };

  const applyMode = (dark) => {
    setDarkMode(dark);
    run(dark ? "flux-theme-set-gnome dark" : "flux-theme-set-gnome light");
  };

  const applyAccent = (color) => {
    setAccent(color);
    // Write accent to Flux config — the theme system picks it up
    run(`flux set accent "${color}"`);
  };

  const applyFont = (f) => {
    setFont(f);
    run(`flux-font-set "${f}"`);
  };

  const applyCorners = (val) => {
    setCorners(val);
    run(val ? "flux-style-corners round" : "flux-style-corners square");
  };

  const applyAnimations = (val) => {
    setAnimations(val);
    run(`hyprctl keyword animations:enabled ${val}`);
  };

  return (
    <>
      <div className="content-header">
        <div className="content-title">Appearance</div>
        <div className="content-subtitle">Customize how Flux looks and feels</div>
      </div>

      <div className="content-body">

        {/* Theme */}
        <div className="setting-group">
          <div className="setting-group-title">Theme</div>
          <div style={{ padding: 16 }}>
            <div className="theme-mini-grid">
              {THEMES.map((t) => (
                <div
                  key={t.id}
                  className={`theme-mini ${theme === t.id ? "active" : ""}`}
                  onClick={() => applyTheme(t.id)}
                >
                  <div
                    className="theme-mini-preview"
                    style={{ background: t.bg, color: t.accent }}
                  >
                    Aa
                  </div>
                  <div className="theme-mini-name" style={{ color: "#aaa" }}>{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mode & Accent */}
        <div className="setting-group">
          <div className="setting-group-title">Color</div>

          <SettingRow label="Mode" desc="Dark mode is easier on the eyes at night">
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className={`btn ${darkMode ? "btn-primary" : "btn-secondary"}`}
                onClick={() => applyMode(true)}
              >🌙 Dark</button>
              <button
                className={`btn ${!darkMode ? "btn-primary" : "btn-secondary"}`}
                onClick={() => applyMode(false)}
              >☀️ Light</button>
            </div>
          </SettingRow>

          <SettingRow label="Accent Color" desc="Used for highlights, buttons, and active states">
            <div className="swatch-row">
              {ACCENTS.map((c) => (
                <div
                  key={c}
                  className={`swatch ${accent === c ? "active" : ""}`}
                  style={{ background: c }}
                  onClick={() => applyAccent(c)}
                />
              ))}
            </div>
          </SettingRow>
        </div>

        {/* Font */}
        <div className="setting-group">
          <div className="setting-group-title">Font</div>
          <SettingRow label="Terminal & Editor Font" desc="Monospace font used in terminal and code editors">
            <select className="select" value={font} onChange={(e) => applyFont(e.target.value)}>
              {FONTS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </SettingRow>
        </div>

        {/* Effects */}
        <div className="setting-group">
          <div className="setting-group-title">Effects</div>
          <SettingRow label="Rounded Corners" desc="Round window and UI corners">
            <Toggle checked={corners} onChange={applyCorners} />
          </SettingRow>
          <SettingRow label="Animations" desc="Window open/close and workspace switch animations">
            <Toggle checked={animations} onChange={applyAnimations} />
          </SettingRow>
        </div>

        {/* Wallpaper */}
        <div className="setting-group">
          <div className="setting-group-title">Wallpaper</div>
          <SettingRow label="Change Wallpaper" desc="Pick from theme wallpapers or your own images">
            <button className="btn btn-secondary" onClick={() => run("flux-menu background")}>
              Browse Wallpapers
            </button>
          </SettingRow>
        </div>

      </div>
    </>
  );
}
