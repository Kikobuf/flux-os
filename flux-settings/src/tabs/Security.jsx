import { useState } from "react";
import Toggle from "../components/Toggle";
import SettingRow from "../components/SettingRow";

export default function Security({ run }) {
  const [firewall, setFirewall]     = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(false);
  const [screenLock, setScreenLock] = useState(true);
  const [lockTimeout, setLockTimeout] = useState(5);

  const applyFirewall = (val) => {
    setFirewall(val);
    run(val ? "sudo ufw enable" : "sudo ufw disable");
  };

  const applyAutoUpdates = (val) => {
    setAutoUpdates(val);
    run(val
      ? "sudo systemctl enable --now flux-autoupdate.timer"
      : "sudo systemctl disable --now flux-autoupdate.timer"
    );
  };

  const applyScreenLock = (val) => {
    setScreenLock(val);
    run(`flux toggle screensaver ${val ? "on" : "off"}`);
  };

  return (
    <>
      <div className="content-header">
        <div className="content-title">Security & Privacy</div>
        <div className="content-subtitle">Firewall, updates, screen lock, and encryption</div>
      </div>

      <div className="content-body">

        {/* Firewall */}
        <div className="setting-group">
          <div className="setting-group-title">Firewall</div>
          <SettingRow
            label="Firewall"
            desc="Blocks unauthorized incoming network connections (ufw)"
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span className={`badge ${firewall ? "badge-green" : "badge-red"}`}>
                {firewall ? "Active" : "Disabled"}
              </span>
              <Toggle checked={firewall} onChange={applyFirewall} />
            </div>
          </SettingRow>
          <SettingRow label="Firewall Rules" desc="View and manage allowed apps and ports">
            <button className="btn btn-secondary" onClick={() => run("sudo ufw status verbose")}>
              View Rules
            </button>
          </SettingRow>
        </div>

        {/* Updates */}
        <div className="setting-group">
          <div className="setting-group-title">System Updates</div>
          <SettingRow
            label="Automatic Updates"
            desc="Automatically install system updates daily"
          >
            <Toggle checked={autoUpdates} onChange={applyAutoUpdates} />
          </SettingRow>
          <SettingRow label="Check for Updates Now" desc="Manually trigger a system update">
            <button className="btn btn-primary" onClick={() => run("flux-update")}>
              Update Now
            </button>
          </SettingRow>
        </div>

        {/* Screen lock */}
        <div className="setting-group">
          <div className="setting-group-title">Screen Lock</div>
          <SettingRow label="Auto Screen Lock" desc="Lock screen when idle">
            <Toggle checked={screenLock} onChange={applyScreenLock} />
          </SettingRow>
          {screenLock && (
            <SettingRow label="Lock After" desc="How long to wait before locking">
              <select
                className="select"
                value={lockTimeout}
                onChange={(e) => {
                  setLockTimeout(Number(e.target.value));
                  run(`flux set lock-timeout ${e.target.value}`);
                }}
              >
                {[1, 2, 5, 10, 15, 30].map((m) => (
                  <option key={m} value={m}>{m} minute{m > 1 ? "s" : ""}</option>
                ))}
              </select>
            </SettingRow>
          )}
        </div>

        {/* Disk encryption */}
        <div className="setting-group">
          <div className="setting-group-title">Disk Encryption</div>
          <SettingRow
            label="Full Disk Encryption"
            desc="Your disk is encrypted with LUKS. Data is safe if your device is lost."
          >
            <span className="badge badge-green">● Active</span>
          </SettingRow>
          <SettingRow label="Change Encryption Password" desc="Update your disk encryption passphrase">
            <button className="btn btn-secondary" onClick={() => run("flux-drive-password")}>
              Change Password
            </button>
          </SettingRow>
        </div>

        {/* Auth */}
        <div className="setting-group">
          <div className="setting-group-title">Authentication</div>
          <SettingRow label="Fingerprint Login" desc="Use fingerprint to unlock your device">
            <button className="btn btn-secondary" onClick={() => run("flux-setup-security-fingerprint")}>
              Set Up Fingerprint
            </button>
          </SettingRow>
          <SettingRow label="Security Key (FIDO2)" desc="Use a hardware security key like YubiKey">
            <button className="btn btn-secondary" onClick={() => run("flux-setup-security-fido2")}>
              Set Up Security Key
            </button>
          </SettingRow>
        </div>

      </div>
    </>
  );
}
