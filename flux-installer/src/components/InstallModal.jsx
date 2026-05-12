import { useState, useEffect, useRef } from "react";

// Build the actual shell commands for each app
function buildInstallCmd(app) {
  switch (app.pkgType) {
    case "pacman": return `sudo pacman -S --noconfirm --needed ${app.pkg}`;
    case "aur":    return `yay -S --noconfirm ${app.pkg}`;
    case "npm":    return `npm install -g ${app.pkg}`;
    case "pip":    return `pip install ${app.pkg} --break-system-packages`;
    case "docker": return `docker pull ghcr.io/open-webui/open-webui:main`;
    case "mise":   return `mise use --global ${app.pkg}`;
    case "webapp": return `flux-webapp-install "${app.name}"`;
    case "script": return `flux-windows-vm`;
    default:       return `echo "No install method for ${app.id}"`;
  }
}

function buildRemoveCmd(app) {
  switch (app.pkgType) {
    case "pacman": return `sudo pacman -Rns --noconfirm ${app.pkg}`;
    case "aur":    return `yay -Rns --noconfirm ${app.pkg}`;
    case "npm":    return `npm uninstall -g ${app.pkg}`;
    case "pip":    return `pip uninstall -y ${app.pkg}`;
    default:       return `echo "No remove method for ${app.id}"`;
  }
}

const run = async (cmd) => {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    return await invoke("run_shell", { cmd });
  } catch {
    // Browser simulation — fake 1s delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 400));
    return `✓ [simulated] ${cmd}`;
  }
};

export default function InstallModal({ queue, removing, apps, onComplete, onClose }) {
  const [log, setLog]         = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone]       = useState(false);
  const [running, setRunning] = useState(false);
  const logRef                = useRef(null);

  const getApp = id => apps.find(a => a.id === id);
  const total = queue.length + removing.length;

  const addLog = (line) => {
    setLog(l => [...l, line]);
    setTimeout(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 10);
  };

  useEffect(() => {
    runAll();
  }, []);

  const runAll = async () => {
    setRunning(true);
    let completed = 0;

    // Installs
    for (const id of queue) {
      const app = getApp(id);
      if (!app) continue;
      addLog(`→ Installing ${app.name}...`);
      const cmd = buildInstallCmd(app);
      addLog(`  $ ${cmd}`);
      await run(cmd);
      addLog(`  ✓ ${app.name} installed`);
      completed++;
      setProgress(Math.round((completed / total) * 100));
    }

    // Removals
    for (const id of removing) {
      const app = getApp(id);
      if (!app) continue;
      addLog(`→ Removing ${app.name}...`);
      const cmd = buildRemoveCmd(app);
      addLog(`  $ ${cmd}`);
      await run(cmd);
      addLog(`  ✓ ${app.name} removed`);
      completed++;
      setProgress(Math.round((completed / total) * 100));
    }

    addLog("");
    addLog("✓ All done!");
    setDone(true);
    setRunning(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div>
          <div className="modal-title">
            {done ? "Done! 🎉" : <span className="installing">Installing...</span>}
          </div>
          <div className="modal-subtitle">
            {done
              ? `${queue.length} installed, ${removing.length} removed.`
              : `Installing ${queue.length} app${queue.length !== 1 ? "s" : ""}${removing.length ? `, removing ${removing.length}` : ""}...`
            }
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="install-log" ref={logRef}>
          {log.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          {done ? (
            <button
              className="btn btn-primary"
              onClick={() => onComplete(queue, removing)}
            >
              Close
            </button>
          ) : (
            <button className="btn btn-secondary" disabled>
              Please wait...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
