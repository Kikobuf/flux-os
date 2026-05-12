import { useState } from "react";
import Appearance from "./tabs/Appearance";
import Display from "./tabs/Display";
import Network from "./tabs/Network";
import Security from "./tabs/Security";
import Performance from "./tabs/Performance";
import StartupApps from "./tabs/StartupApps";
import Updates from "./tabs/Updates";
import About from "./tabs/About";

// Tauri command bridge — falls back gracefully in browser
const run = async (cmd) => {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    return await invoke("run_shell", { cmd });
  } catch {
    console.log("[flux-settings] would run:", cmd);
    return "";
  }
};

export { run };

const TABS = [
  {
    section: "Personalization",
    items: [
      { id: "appearance", label: "Appearance",    icon: "🎨" },
      { id: "display",    label: "Display",        icon: "🖥️" },
    ],
  },
  {
    section: "System",
    items: [
      { id: "network",    label: "Network & VPN",  icon: "🌐" },
      { id: "security",   label: "Security",       icon: "🔒" },
      { id: "performance",label: "Performance",    icon: "⚡" },
      { id: "startup",    label: "Startup Apps",   icon: "🚀" },
    ],
  },
  {
    section: "About",
    items: [
      { id: "updates",    label: "Updates",        icon: "🔄" },
      { id: "about",      label: "About Flux",     icon: "ℹ️" },
    ],
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("appearance");

  const renderTab = () => {
    switch (activeTab) {
      case "appearance":  return <Appearance run={run} />;
      case "display":     return <Display run={run} />;
      case "network":     return <Network run={run} />;
      case "security":    return <Security run={run} />;
      case "performance": return <Performance run={run} />;
      case "startup":     return <StartupApps run={run} />;
      case "updates":     return <Updates run={run} />;
      case "about":       return <About run={run} />;
      default:            return <Appearance run={run} />;
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div>
            <div className="sidebar-logo">FLUX</div>
            <div className="sidebar-title">Settings</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {TABS.map((section) => (
            <div key={section.section}>
              <div className="nav-section">{section.section}</div>
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">Flux OS v0.1.0</div>
      </aside>

      {/* Main content */}
      <main className="content">
        {renderTab()}
      </main>
    </div>
  );
}
