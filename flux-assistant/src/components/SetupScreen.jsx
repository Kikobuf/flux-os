import { useState, useEffect } from "react";
import { detectProvider, getOllamaModels } from "../ai.js";

export default function SetupScreen({ onComplete }) {
  const [mode, setMode]           = useState("detecting");  // detecting | claude | ollama | none
  const [apiKey, setApiKey]       = useState("");
  const [ollamaModels, setOllamaModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    // Check what's available
    const savedKey = localStorage.getItem("flux-assistant-api-key") || "";
    const savedModel = localStorage.getItem("flux-assistant-ollama-model") || "";

    detectProvider(savedKey).then(async (provider) => {
      if (provider === "claude") {
        setApiKey(savedKey);
        onComplete({ apiKey: savedKey, ollamaModel: savedModel, provider: "claude" });
        return;
      }
      if (provider === "ollama") {
        const models = await getOllamaModels();
        setOllamaModels(models);
        setSelectedModel(savedModel || models[0] || "");
        setMode("ollama");
        return;
      }
      setMode("choose");
    });
  }, []);

  const handleClaudeSubmit = async () => {
    if (!apiKey.startsWith("sk-ant-")) {
      setError("API key should start with sk-ant-");
      return;
    }
    setLoading(true);
    setError("");
    // Quick validation ping
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 10,
          messages: [{ role: "user", content: "hi" }],
        }),
      });
      if (!res.ok) throw new Error("Invalid API key");
      localStorage.setItem("flux-assistant-api-key", apiKey);
      onComplete({ apiKey, ollamaModel: "", provider: "claude" });
    } catch {
      setError("Couldn't connect. Check your API key and internet connection.");
    }
    setLoading(false);
  };

  const handleOllamaSubmit = () => {
    localStorage.setItem("flux-assistant-ollama-model", selectedModel);
    onComplete({ apiKey: "", ollamaModel: selectedModel, provider: "ollama" });
  };

  if (mode === "detecting") {
    return (
      <div className="setup-screen">
        <div className="setup-logo">FLUX</div>
        <div className="setup-title">Setting up assistant...</div>
      </div>
    );
  }

  if (mode === "ollama") {
    return (
      <div className="setup-screen">
        <div className="setup-logo">FLUX</div>
        <div className="setup-title">Ollama detected ✓</div>
        <div className="setup-desc">
          Using your local Ollama models. Free and private.
          Add a Claude API key for better responses.
        </div>

        <div className="setup-options" style={{ gap: 12 }}>
          <div>
            <label style={{ fontSize: "0.78rem", color: "var(--text-2)", display: "block", marginBottom: 6 }}>
              Select model
            </label>
            <select
              className="setup-input"
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value)}
              style={{ cursor: "pointer" }}
            >
              {ollamaModels.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <button className="btn btn-primary" onClick={handleOllamaSubmit}>
            Use Ollama →
          </button>

          <button className="btn btn-secondary" onClick={() => setMode("claude")}>
            Add Claude API key instead
          </button>
        </div>
      </div>
    );
  }

  if (mode === "claude") {
    return (
      <div className="setup-screen">
        <div className="setup-logo">FLUX</div>
        <div className="setup-title">Connect Claude</div>
        <div className="setup-desc">
          Paste your Anthropic API key below. Get one free at
          <a href="https://console.anthropic.com" style={{ color: "var(--accent)" }}> console.anthropic.com</a>
        </div>

        <div className="setup-options">
          <input
            className="setup-input"
            placeholder="sk-ant-api03-..."
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            type="password"
            autoFocus
          />
          {error && <div className="error-msg">{error}</div>}
          <button
            className="btn btn-primary"
            onClick={handleClaudeSubmit}
            disabled={loading || !apiKey}
          >
            {loading ? "Connecting..." : "Connect →"}
          </button>
          <button className="btn btn-secondary" onClick={() => setMode("ollama-fallback")}>
            Use Ollama instead (free)
          </button>
        </div>
      </div>
    );
  }

  if (mode === "ollama-fallback") {
    return (
      <div className="setup-screen">
        <div className="setup-logo">FLUX</div>
        <div className="setup-title">No Ollama detected</div>
        <div className="setup-desc">
          Ollama is not running. Start it with <code style={{ color: "var(--accent)" }}>ollama serve</code>,
          then restart the assistant. Or add a Claude API key for instant access.
        </div>
        <div className="setup-options">
          <button className="btn btn-primary" onClick={() => setMode("claude")}>
            Add Claude API Key
          </button>
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>
            Retry Ollama
          </button>
        </div>
      </div>
    );
  }

  // mode === "choose"
  return (
    <div className="setup-screen">
      <div className="setup-logo">FLUX</div>
      <div className="setup-title">Welcome to Flux Assistant</div>
      <div className="setup-desc">
        Your AI-powered system configurator. Choose how to power it.
      </div>

      <div className="setup-options">
        <div className="setup-option" onClick={() => setMode("claude")}>
          <div className="setup-option-title">🧠 Claude (Recommended)</div>
          <div className="setup-option-desc">Best responses. Requires Anthropic API key. Costs ~$0.01/conversation.</div>
        </div>
        <div className="setup-option" onClick={() => setMode("ollama-fallback")}>
          <div className="setup-option-title">🦙 Ollama (Free & Local)</div>
          <div className="setup-option-desc">Runs on your machine. Free, private, works offline. Start Ollama first.</div>
        </div>
      </div>
    </div>
  );
}
