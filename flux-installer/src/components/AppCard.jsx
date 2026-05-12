export default function AppCard({ app, installed, queued, removing, onToggle }) {
  const pkgClass = `pkg-badge pkg-${app.pkgType}`;

  const pkgLabel = {
    pacman: "pacman",
    aur:    "AUR",
    npm:    "npm",
    docker: "docker",
    pip:    "pip",
    mise:   "mise",
    webapp: "web app",
    script: "script",
  }[app.pkgType] || app.pkgType;

  return (
    <div className={`app-card ${installed ? "installed" : ""} ${queued || removing ? "queued" : ""}`}>
      <div className="app-card-top">
        <div className="app-icon">{app.icon}</div>
        <div className="app-card-actions">
          {installed ? (
            <button
              className={`btn ${removing ? "btn-queued" : "btn-remove"}`}
              onClick={() => onToggle(app.id)}
            >
              {removing ? "Undo" : "Remove"}
            </button>
          ) : (
            <button
              className={`btn ${queued ? "btn-queued" : "btn-install"}`}
              onClick={() => onToggle(app.id)}
            >
              {queued ? "Queued ✓" : "Install"}
            </button>
          )}
        </div>
      </div>

      <div className="app-name">{app.name}</div>
      <div className="app-desc">{app.desc}</div>

      <div className="app-footer">
        <span className={pkgClass}>{pkgLabel}</span>
        {installed && !removing && (
          <span className="installed-check">✓ Installed</span>
        )}
        {removing && (
          <span style={{ fontSize: "0.7rem", color: "var(--danger)" }}>Will remove</span>
        )}
      </div>
    </div>
  );
}
