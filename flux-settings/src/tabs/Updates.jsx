import { useState } from "react";
import Toggle from "../components/Toggle";
import SettingRow from "../components/SettingRow";

export default function Updates({ run }) {
  const [autoUpdates, setAutoUpdates] = useState(false);
  const [updating, setUpdating]       = useState(false);
  const [lastCheck, setLastCheck]     = useState("Never");

  const applyAutoUpdates = (val) => {
    setAutoUpdates(val);
    run(val
      ? "sudo systemctl enable --now flux-autoupdate.timer"
      : "sudo systemctl disable --now flux-autoupdate.timer"
    );
  };

  const checkNow = async () => {
    setUpdating(true);
    await run("flux-update");
    setLastCheck(new Date().toLocaleString());
    setUpdating(false);
  };

  return (
    <>
      <div className="content-header">
        <div className="content-title">Updates</div>
        <div className="content-subtitle">Keep Flux and your apps up to date</div>
      </div>

      <div className="content-body">

        <div className="setting-group">
          <div className="setting-group-title">System Updates</div>

          <SettingRow label="Automatic Updates" desc="Install system updates daily in the background">
            <Toggle checked={autoUpdates} onChange={applyAutoUpdates} />
          </SettingRow>

          <SettingRow label="Last Checked" desc={lastCheck}>
            <button
              className="btn btn-primary"
              onClick={checkNow}
              disabled={updating}
            >
              {updating ? "Updating..." : "Check Now"}
            </button>
          </SettingRow>

          <SettingRow label="Update Channel" desc="Choose between stable and edge releases">
            <select className="select" onChange={(e) => run(`flux-channel-set ${e.target.value}`)}>
              <option value="stable">Stable</option>
              <option value="rc">Release Candidate</option>
              <option value="edge">Edge (latest)</option>
            </select>
          </SettingRow>
        </div>

        <div className="setting-group">
          <div className="setting-group-title">Flux OS</div>
          <SettingRow label="Flux Version" desc="Currently installed version">
            <span style={{ fontFamily: "monospace", color: "var(--accent)" }}>v0.1.0</span>
          </SettingRow>
          <SettingRow label="Upstream (Omarchy)" desc="Pull latest fixes from Omarchy base">
            <button className="btn btn-secondary" onClick={() => run("flux-reinstall-git")}>
              Sync Upstream
            </button>
          </SettingRow>
        </div>

        <div className="setting-group">
          <div className="setting-group-title">AUR Packages</div>
          <SettingRow label="Update AUR Packages" desc="Update packages installed from the Arch User Repository">
            <button className="btn btn-secondary" onClick={() => run("flux-update-aur-pkgs")}>
              Update AUR
            </button>
          </SettingRow>
          <SettingRow label="Clean Orphaned Packages" desc="Remove unused packages to free up space">
            <button className="btn btn-secondary" onClick={() => run("flux-update-orphan-pkgs")}>
              Clean Orphans
            </button>
          </SettingRow>
        </div>

      </div>
    </>
  );
}
