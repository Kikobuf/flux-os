import { useState } from "react";
import Toggle from "../components/Toggle";
import SettingRow from "../components/SettingRow";

export default function Display({ run }) {
  const [scale, setScale]         = useState(1.0);
  const [refresh, setRefresh]     = useState(60);
  const [nightLight, setNightLight] = useState(false);
  const [nightTemp, setNightTemp] = useState(3500);

  const applyScale = (v) => {
    setScale(v);
    run(`flux-hyprland-monitor-scale ${v}`);
  };

  const applyNightLight = (val) => {
    setNightLight(val);
    run(val ? "flux-toggle-nightlight on" : "flux-toggle-nightlight off");
  };

  return (
    <>
      <div className="content-header">
        <div className="content-title">Display</div>
        <div className="content-subtitle">Monitor layout, resolution, and scaling</div>
      </div>

      <div className="content-body">

        {/* Monitor layout */}
        <div className="setting-group">
          <div className="setting-group-title">Monitors</div>
          <div style={{ padding: 16 }}>
            <div className="monitor-layout">
              <div className="monitor-box primary" style={{ width: 120, height: 80 }}>
                <span>💻</span>
                <span style={{ fontSize: "0.65rem" }}>Primary</span>
              </div>
              <div className="monitor-box" style={{ width: 140, height: 90 }}>
                <span>🖥️</span>
                <span style={{ fontSize: "0.65rem" }}>External</span>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => run("flux-monitor-wizard")}>
                Detect Monitors
              </button>
              <button className="btn btn-secondary" onClick={() => run("flux-monitor-wizard")}>
                Arrange Displays
              </button>
            </div>
          </div>
        </div>

        {/* Scale & resolution */}
        <div className="setting-group">
          <div className="setting-group-title">Scale & Resolution</div>

          <SettingRow label="Display Scale" desc="Make everything larger or smaller">
            <div className="slider-row">
              <input
                type="range"
                className="slider"
                min={0.5}
                max={2.0}
                step={0.25}
                value={scale}
                onChange={(e) => applyScale(parseFloat(e.target.value))}
              />
              <span className="slider-value">{scale}x</span>
            </div>
          </SettingRow>

          <SettingRow label="Refresh Rate" desc="Higher refresh rate = smoother motion">
            <select
              className="select"
              value={refresh}
              onChange={(e) => {
                setRefresh(Number(e.target.value));
                run(`flux-hyprland-monitor-refresh ${e.target.value}`);
              }}
            >
              {[30, 60, 75, 120, 144, 165, 240].map((r) => (
                <option key={r} value={r}>{r}Hz</option>
              ))}
            </select>
          </SettingRow>

          <SettingRow label="Scaling Mode" desc="How to handle fractional scaling">
            <select className="select" onChange={(e) => run(`hyprctl keyword general:allow_tearing ${e.target.value === "performance"}`)}>
              <option value="quality">Quality</option>
              <option value="balanced">Balanced</option>
              <option value="performance">Performance</option>
            </select>
          </SettingRow>
        </div>

        {/* Night Light */}
        <div className="setting-group">
          <div className="setting-group-title">Night Light</div>

          <SettingRow label="Night Light" desc="Reduces blue light in the evening to help you sleep">
            <Toggle checked={nightLight} onChange={applyNightLight} />
          </SettingRow>

          {nightLight && (
            <SettingRow label="Color Temperature" desc="Lower = warmer, higher = cooler">
              <div className="slider-row">
                <input
                  type="range"
                  className="slider"
                  min={1000}
                  max={6500}
                  step={100}
                  value={nightTemp}
                  onChange={(e) => {
                    setNightTemp(Number(e.target.value));
                    run(`hyprctl keyword decoration:screen_shader ''`);
                  }}
                />
                <span className="slider-value">{nightTemp}K</span>
              </div>
            </SettingRow>
          )}
        </div>

        {/* Taskbar mode */}
        <div className="setting-group">
          <div className="setting-group-title">Window Layout</div>
          <SettingRow label="Taskbar Mode" desc="Switch between tiling and floating/taskbar window layout">
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => run("flux-taskbar-mode enable")}>
                Taskbar
              </button>
              <button className="btn btn-secondary" onClick={() => run("flux-taskbar-mode disable")}>
                Tiling
              </button>
            </div>
          </SettingRow>
        </div>

      </div>
    </>
  );
}
