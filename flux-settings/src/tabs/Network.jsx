import { useState } from "react";
import Toggle from "../components/Toggle";
import SettingRow from "../components/SettingRow";

export default function Network({ run }) {
  const [speedIndicator, setSpeedIndicator] = useState(true);
  const [vpnConnected, setVpnConnected]     = useState(false);
  const [vpnConfig, setVpnConfig]           = useState("");

  const applySpeedIndicator = (val) => {
    setSpeedIndicator(val);
    run(`flux toggle network-speed-indicator ${val ? "on" : "off"}`);
    run("flux-refresh-waybar");
  };

  const connectVpn = () => {
    if (!vpnConfig.trim()) return;
    run(`nmcli connection import type wireguard file "${vpnConfig}"`);
    setVpnConnected(true);
  };

  return (
    <>
      <div className="content-header">
        <div className="content-title">Network & VPN</div>
        <div className="content-subtitle">WiFi, VPN connections, and network indicators</div>
      </div>

      <div className="content-body">

        {/* WiFi */}
        <div className="setting-group">
          <div className="setting-group-title">WiFi</div>
          <SettingRow label="WiFi Networks" desc="View and connect to nearby networks">
            <button className="btn btn-secondary" onClick={() => run("flux-launch-wifi")}>
              Manage WiFi
            </button>
          </SettingRow>
        </div>

        {/* VPN */}
        <div className="setting-group">
          <div className="setting-group-title">VPN</div>
          <SettingRow
            label="VPN Status"
            desc={vpnConnected ? "Connected" : "Not connected"}
          >
            <span className={`badge ${vpnConnected ? "badge-green" : "badge-red"}`}>
              {vpnConnected ? "● Connected" : "○ Disconnected"}
            </span>
          </SettingRow>

          <SettingRow label="WireGuard Config" desc="Import a .conf file to add a VPN connection">
            <div style={{ display: "flex", gap: 8 }}>
              <input
                className="input"
                placeholder="/path/to/vpn.conf"
                value={vpnConfig}
                onChange={(e) => setVpnConfig(e.target.value)}
                style={{ minWidth: 200 }}
              />
              <button className="btn btn-primary" onClick={connectVpn}>
                Import
              </button>
            </div>
          </SettingRow>

          <SettingRow label="Manage VPN Connections" desc="View, connect, or remove VPN profiles">
            <button className="btn btn-secondary" onClick={() => run("nm-connection-editor")}>
              Open Network Manager
            </button>
          </SettingRow>

          <SettingRow label="Quick VPN Services" desc="Install a popular VPN with one click">
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => run("flux-install-tailscale")}>
                Tailscale
              </button>
              <button className="btn btn-secondary" onClick={() => run("flux-install-nordvpn")}>
                NordVPN
              </button>
            </div>
          </SettingRow>
        </div>

        {/* Indicators */}
        <div className="setting-group">
          <div className="setting-group-title">Taskbar Indicators</div>
          <SettingRow
            label="Network Speed"
            desc="Show upload/download speed in the taskbar"
          >
            <Toggle checked={speedIndicator} onChange={applySpeedIndicator} />
          </SettingRow>
        </div>

      </div>
    </>
  );
}
