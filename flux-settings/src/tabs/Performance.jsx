import { useState } from "react";
import Toggle from "../components/Toggle";
import SettingRow from "../components/SettingRow";

export default function Performance({ run }) {
  const [showCpuRam, setShowCpuRam] = useState(false);
  const [batteryMode, setBatteryMode] = useState("balanced");
  const [trimEnabled, setTrimEnabled] = useState(true);

  const applyShowCpuRam = (val) => {
    setShowCpuRam(val);
    run(`flux toggle taskbar-cpu-ram ${val ? "on" : "off"}`);
    run("flux-refresh-waybar");
  };

  const applyBatteryMode = (mode) => {
    setBatteryMode(mode);
    run(`flux-battery-mode ${mode}`);
  };

  const applyTrim = (val) => {
    setTrimEnabled(val);
    run(val
      ? "sudo systemctl enable --now fstrim.timer"
      : "sudo systemctl disable fstrim.timer"
    );
  };

  return (
    <>
      <div className="content-header">
        <div className="content-title">Performance</div>
        <div className="content-subtitle">Power profiles, system indicators, and optimizations</div>
      </div>

      <div className="content-body">

        {/* Power profile */}
        <div className="setting-group">
          <div className="setting-group-title">Power Profile</div>
          <SettingRow label="Battery Mode" desc="Balance performance vs battery life">
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { id: "saver",       label: "🔋 Saver" },
                { id: "balanced",    label: "⚡ Balanced" },
                { id: "performance", label: "🚀 Performance" },
              ].map((m) => (
                <button
                  key={m.id}
                  className={`btn ${batteryMode === m.id ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => applyBatteryMode(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </SettingRow>
        </div>

        {/* Taskbar indicators */}
        <div className="setting-group">
          <div className="setting-group-title">Taskbar Indicators</div>
          <SettingRow
            label="CPU & RAM Usage"
            desc="Show live CPU and memory usage in the taskbar"
          >
            <Toggle checked={showCpuRam} onChange={applyShowCpuRam} />
          </SettingRow>
        </div>

        {/* SSD */}
        <div className="setting-group">
          <div className="setting-group-title">Storage</div>
          <SettingRow
            label="SSD TRIM"
            desc="Runs weekly to keep your SSD healthy and fast"
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span className={`badge ${trimEnabled ? "badge-green" : "badge-yellow"}`}>
                {trimEnabled ? "Scheduled" : "Disabled"}
              </span>
              <Toggle checked={trimEnabled} onChange={applyTrim} />
            </div>
          </SettingRow>
          <SettingRow label="Run TRIM Now" desc="Manually trigger an SSD TRIM operation">
            <button className="btn btn-secondary" onClick={() => run("sudo fstrim -av")}>
              Run Now
            </button>
          </SettingRow>
        </div>

        {/* Activity */}
        <div className="setting-group">
          <div className="setting-group-title">Activity Monitor</div>
          <SettingRow label="Open Activity Monitor" desc="View CPU, RAM, disk, and network usage">
            <button className="btn btn-secondary" onClick={() => run("flux-launch-tui btop")}>
              Open Btop
            </button>
          </SettingRow>
        </div>

      </div>
    </>
  );
}
