import SettingRow from "../components/SettingRow";

export default function About({ run }) {
  return (
    <>
      <div className="content-header">
        <div className="content-title">About Flux</div>
        <div className="content-subtitle">System information and credits</div>
      </div>

      <div className="content-body">

        <div className="about-hero">
          <div className="about-logo">FLUX</div>
          <div style={{ fontWeight: 600 }}>Linux, reimagined for the AI age</div>
          <div className="about-version">Version 0.1.0 · Built on Arch Linux + Hyprland</div>
          <div style={{ color: "var(--text-3)", fontSize: "0.8rem", textAlign: "center" }}>
            A fork of <a href="https://omarchy.org" style={{ color: "var(--accent)" }}>Omarchy</a> by DHH,
            rebuilt for AI builders and developers.
          </div>
        </div>

        {/* System specs */}
        <div className="setting-group">
          <div className="setting-group-title">System</div>
          <div className="spec-grid">
            {[
              { label: "OS",        value: "Flux 0.1.0 (Arch)" },
              { label: "Kernel",    value: "Linux 6.x" },
              { label: "Desktop",   value: "Hyprland" },
              { label: "Shell",     value: "Zsh" },
              { label: "Terminal",  value: "Alacritty" },
              { label: "Base",      value: "Omarchy (MIT)" },
            ].map(({ label, value }) => (
              <div key={label} className="spec-item">
                <div className="spec-label">{label}</div>
                <div className="spec-value">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="setting-group">
          <div className="setting-group-title">Diagnostics</div>
          <SettingRow label="System Debug Info" desc="Copy debug info to clipboard for bug reports">
            <button className="btn btn-secondary" onClick={() => run("flux-debug | wl-copy")}>
              Copy Debug Info
            </button>
          </SettingRow>
          <SettingRow label="System Snapshot" desc="Create a system snapshot for rollback">
            <button className="btn btn-secondary" onClick={() => run("flux-snapshot")}>
              Create Snapshot
            </button>
          </SettingRow>
          <SettingRow label="View Logs" desc="Open the Flux install and update logs">
            <button className="btn btn-secondary" onClick={() => run("alacritty -e less /var/log/flux-install.log")}>
              View Logs
            </button>
          </SettingRow>
        </div>

        {/* Links */}
        <div className="setting-group">
          <div className="setting-group-title">Links</div>
          <SettingRow label="GitHub" desc="github.com/Kikobuf/flux-os">
            <button className="btn btn-secondary" onClick={() => run("flux-launch-browser https://github.com/Kikobuf/flux-os")}>
              Open
            </button>
          </SettingRow>
          <SettingRow label="Report a Bug" desc="Open a GitHub issue">
            <button className="btn btn-secondary" onClick={() => run("flux-launch-browser https://github.com/Kikobuf/flux-os/issues/new")}>
              Report Bug
            </button>
          </SettingRow>
        </div>

      </div>
    </>
  );
}
