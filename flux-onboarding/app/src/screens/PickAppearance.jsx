const ACCENTS = [
  "#00ff88", "#00aaff", "#ff6ec7", "#fabd2f",
  "#ff4444", "#a78bfa", "#34d399", "#fb923c",
  "#ffffff", "#888888",
];

export default function PickAppearance({ selections, update, next, back }) {
  return (
    <div className="screen">
      <div className="screen-header">
        <div className="screen-title">Choose your style</div>
        <div className="screen-subtitle">Pick a mode and accent color.</div>
      </div>

      {/* Dark / Light */}
      <div>
        <div style={{ marginBottom: 12, fontWeight: 600, textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Mode
        </div>
        <div className="mode-row">
          <div
            className={`mode-card ${selections.mode === "dark" ? "selected" : ""}`}
            onClick={() => update("mode", "dark")}
          >
            <div className="mode-icon">🌙</div>
            <div className="mode-label">Dark</div>
          </div>
          <div
            className={`mode-card ${selections.mode === "light" ? "selected" : ""}`}
            onClick={() => update("mode", "light")}
          >
            <div className="mode-icon">☀️</div>
            <div className="mode-label">Light</div>
          </div>
        </div>
      </div>

      {/* Accent color */}
      <div>
        <div style={{ marginBottom: 12, fontWeight: 600, textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Accent Color
        </div>
        <div className="accent-row">
          {ACCENTS.map((color) => (
            <div
              key={color}
              className={`accent-swatch ${selections.accent === color ? "selected" : ""}`}
              style={{ background: color }}
              onClick={() => update("accent", color)}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 12, color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Selected: <span style={{ color: selections.accent, fontWeight: 700 }}>{selections.accent}</span>
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={back}>Back</button>
        <button className="btn btn-primary" onClick={next}>Continue →</button>
      </div>
    </div>
  );
}
