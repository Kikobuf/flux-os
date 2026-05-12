import { useState } from "react";
import Toggle from "../components/Toggle";

const DEFAULT_APPS = [
  { id: "waybar",     name: "Waybar",          icon: "📊", path: "uwsm-app -- waybar",    enabled: true,  system: true },
  { id: "mako",       name: "Mako Notifications",icon:"🔔", path: "uwsm-app -- mako",     enabled: true,  system: true },
  { id: "hypridle",   name: "Hypridle",         icon: "💤", path: "uwsm-app -- hypridle",  enabled: true,  system: true },
  { id: "kdeconnect", name: "KDE Connect",       icon: "📱", path: "kdeconnect-indicator",  enabled: true,  system: false },
  { id: "ollama",     name: "Ollama",            icon: "🤖", path: "ollama serve",           enabled: true,  system: false },
  { id: "openwebui",  name: "Open WebUI",        icon: "🌐", path: "docker start open-webui",enabled: false, system: false },
  { id: "discord",    name: "Discord",           icon: "💬", path: "discord --start-minimized", enabled: false, system: false },
  { id: "spotify",    name: "Spotify",           icon: "🎵", path: "spotify",               enabled: false, system: false },
];

export default function StartupApps({ run }) {
  const [apps, setApps] = useState(DEFAULT_APPS);

  const toggle = (id, val) => {
    setApps((a) => a.map((app) => app.id === id ? { ...app, enabled: val } : app));
    const app = apps.find((a) => a.id === id);
    if (app) {
      if (val) {
        run(`mkdir -p ~/.config/autostart && echo "[Desktop Entry]\nType=Application\nExec=${app.path}\nHidden=false\nX-GNOME-Autostart-enabled=true\nName=${app.name}" > ~/.config/autostart/${id}.desktop`);
      } else {
        run(`rm -f ~/.config/autostart/${id}.desktop`);
      }
    }
  };

  return (
    <>
      <div className="content-header">
        <div className="content-title">Startup Apps</div>
        <div className="content-subtitle">Choose what launches when you log in</div>
      </div>

      <div className="content-body">
        <div className="setting-group">
          <div className="setting-group-title">Applications</div>
          <div className="app-list">
            {apps.map((app) => (
              <div key={app.id} className="app-item">
                <div className="app-item-icon">{app.icon}</div>
                <div className="app-item-info">
                  <div className="app-item-name">
                    {app.name}
                    {app.system && (
                      <span className="badge badge-yellow" style={{ marginLeft: 8 }}>System</span>
                    )}
                  </div>
                  <div className="app-item-path">{app.path}</div>
                </div>
                <Toggle
                  checked={app.enabled}
                  onChange={(val) => !app.system && toggle(app.id, val)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="setting-group">
          <div className="setting-group-title">Add Custom App</div>
          <div style={{ padding: 16, display: "flex", gap: 8 }}>
            <input className="input" placeholder="App name" style={{ flex: 1 }} id="new-app-name" />
            <input className="input" placeholder="Command to run" style={{ flex: 2 }} id="new-app-cmd" />
            <button
              className="btn btn-primary"
              onClick={() => {
                const name = document.getElementById("new-app-name").value;
                const cmd  = document.getElementById("new-app-cmd").value;
                if (name && cmd) {
                  run(`mkdir -p ~/.config/autostart && echo "[Desktop Entry]\nType=Application\nExec=${cmd}\nHidden=false\nX-GNOME-Autostart-enabled=true\nName=${name}" > ~/.config/autostart/${name.toLowerCase().replace(/\s/g,"-")}.desktop`);
                  setApps((a) => [...a, { id: name, name, icon: "⚙️", path: cmd, enabled: true, system: false }]);
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
