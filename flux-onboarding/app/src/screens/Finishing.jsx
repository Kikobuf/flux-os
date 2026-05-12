import { useState, useEffect } from "react";

const STEPS = [
  { id: "user",     label: "Creating your account" },
  { id: "browser",  label: "Installing browser" },
  { id: "editor",   label: "Installing code editor" },
  { id: "agent",    label: "Installing AI agents" },
  { id: "terminal", label: "Setting up terminal" },
  { id: "theme",    label: "Applying theme" },
  { id: "services", label: "Starting services" },
  { id: "done",     label: "Almost there..." },
];

function runSetup(selections) {
  // Build the shell command that will be executed via Tauri
  const { user, browsers, editors, agents, terminal, theme, mode, accent } = selections;

  const cmds = [
    // Create user
    `useradd -m -s /bin/zsh ${user.username}`,
    `echo "${user.username}:${user.password}" | chpasswd`,
    `usermod -aG wheel,docker,video,audio,input ${user.username}`,
    // Apply theme
    `sudo -u ${user.username} flux-theme-set ${theme}`,
    // Set dark/light mode
    mode === "light" ? `sudo -u ${user.username} flux-theme-set-gnome light` : "",
    // Install browsers
    ...browsers.map(b => `flux-install-browser ${b}`),
    // Install editors  
    ...editors.map(e => `flux-install-editor ${e}`),
    // Install agents
    ...agents.map(a => `flux-install-agent ${a}`),
    // Set terminal
    `flux-default-terminal ${terminal}`,
    // Mark setup complete
    `mkdir -p /home/${user.username}/.config/flux && touch /home/${user.username}/.config/flux/setup-complete`,
  ].filter(Boolean).join("\n");

  return cmds;
}

export default function Finishing({ selections }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);
  const [scriptOutput, setScriptOutput] = useState("");

  useEffect(() => {
    // Simulate step-by-step progress
    // In production this is driven by actual command execution via Tauri
    const timer = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= STEPS.length - 1) {
          clearInterval(timer);
          setTimeout(() => setDone(true), 800);
          return s;
        }
        return s + 1;
      });
    }, 900);

    // Generate the setup script
    const script = runSetup(selections);
    setScriptOutput(script);

    // In Tauri, this would be:
    // invoke("run_setup", { script, selections })

    return () => clearInterval(timer);
  }, []);

  const handleLaunch = () => {
    // In Tauri: invoke("launch_desktop", { username: selections.user.username })
    // For now, write the script and signal completion
    console.log("Setup script:\n", scriptOutput);
    window.location.href = "flux://launch";
  };

  return (
    <div className="screen">
      <div className="screen-header">
        <div className="flux-logo" style={{ fontSize: "2.5rem" }}>FLUX</div>
        <div className="screen-title">
          {done ? "You're all set! 🎉" : "Setting up your system..."}
        </div>
        <div className="screen-subtitle">
          {done
            ? `Welcome, ${selections.user.name || "friend"}. Your AI-powered Linux desktop is ready.`
            : "This takes about a minute. Go grab a coffee."}
        </div>
      </div>

      <div className="finishing-items">
        {STEPS.map((step, i) => {
          const status =
            i < currentStep ? "done" :
            i === currentStep ? "active" :
            "pending";

          return (
            <div key={step.id} className={`finishing-item ${status}`}>
              <div className="status">
                {status === "done"   && "✓"}
                {status === "active" && <span className="spinner">⟳</span>}
                {status === "pending" && "○"}
              </div>
              <div className="label">{step.label}</div>
            </div>
          );
        })}
      </div>

      {done && (
        <button
          className="btn btn-primary btn-large"
          onClick={handleLaunch}
          style={{ marginTop: 8 }}
        >
          Launch Flux →
        </button>
      )}
    </div>
  );
}
