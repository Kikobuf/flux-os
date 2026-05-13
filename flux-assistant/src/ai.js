// flux-assistant/src/ai.js
// Handles Claude API (primary) + Ollama (fallback)

const CLAUDE_MODEL = "claude-opus-4-5";
const OLLAMA_URL   = "http://localhost:11434";

// System prompt — gives the AI full context about the Flux system
export const SYSTEM_PROMPT = `You are the Flux Assistant, an AI built into Flux OS — an AI-first Linux distribution based on Arch Linux and Hyprland.

You help users configure and troubleshoot their system through natural language. You can:
- Change themes, wallpapers, fonts, accent colors
- Install and remove apps
- Configure display settings, monitors, scaling
- Set up WiFi, VPN connections
- Toggle firewall, auto-updates, screen lock
- Adjust performance and battery mode
- Explain how things work on Flux
- Troubleshoot common Linux/Hyprland issues

When the user asks you to DO something (not just explain), respond with:
1. A brief confirmation of what you're going to do
2. A JSON block with the shell commands to run, in this exact format:
\`\`\`json
{"commands": ["cmd1", "cmd2"]}
\`\`\`

Examples:
- "make my terminal bigger" → {"commands": ["flux-font-set 'JetBrains Mono' 16"]}
- "switch to Tokyo Night theme" → {"commands": ["flux-theme-set tokyo-night"]}
- "install Discord" → {"commands": ["yay -S --noconfirm discord"]}
- "turn on battery saver" → {"commands": ["flux-battery-mode saver"]}
- "show my IP address" → {"commands": ["ip addr show | grep 'inet '"]}

Available Flux commands:
- flux-theme-set <name> — change theme
- flux-font-set <name> — change font  
- flux-battery-mode <saver|balanced|performance> — power profile
- flux-taskbar-mode <enable|disable> — toggle taskbar mode
- flux-toggle-nightlight — toggle night light
- flux-screenshot — take screenshot
- flux-install-browser/editor/agent <name> — install apps
- flux-settings — open settings panel
- flux-installer — open app installer
- flux-monitor-wizard — configure monitors
- hyprctl keyword <setting> <value> — change Hyprland settings
- yay -S --noconfirm <pkg> — install AUR package
- sudo pacman -S --noconfirm <pkg> — install pacman package

Keep responses concise and friendly. If you're not sure about something, say so.
If the user asks you something unrelated to their system, answer helpfully but briefly.

Current system context:
- OS: Flux 0.1.0 (Arch Linux)
- Desktop: Hyprland
- Default terminal: Alacritty
- Default editor: Cursor
- AI agents installed: Claude Code, OpenCode, Ollama`;

// ── Provider detection ────────────────────────────────────────────────────

export async function detectProvider(apiKey) {
  if (apiKey && apiKey.startsWith("sk-ant-")) {
    return "claude";
  }

  // Try Ollama
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      const models = data.models || [];
      if (models.length > 0) return "ollama";
    }
  } catch {
    // Ollama not running
  }

  return "none";
}

export async function getOllamaModels() {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`);
    const data = await res.json();
    return (data.models || []).map(m => m.name);
  } catch {
    return [];
  }
}

// ── Claude API ────────────────────────────────────────────────────────────

async function askClaude(messages, apiKey) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "Claude API error");
  }

  const data = await response.json();
  return data.content[0].text;
}

// ── Ollama API ────────────────────────────────────────────────────────────

async function askOllama(messages, model) {
  const ollamaMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map(m => ({ role: m.role, content: m.content })),
  ];

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model || "llama3",
      messages: ollamaMessages,
      stream: false,
    }),
  });

  if (!response.ok) throw new Error("Ollama error");
  const data = await response.json();
  return data.message.content;
}

// ── Unified send ──────────────────────────────────────────────────────────

export async function sendMessage(messages, { apiKey, ollamaModel }) {
  // Try Claude first if API key provided
  if (apiKey && apiKey.startsWith("sk-ant-")) {
    try {
      return { text: await askClaude(messages, apiKey), provider: "claude" };
    } catch (e) {
      console.warn("Claude failed, falling back to Ollama:", e.message);
    }
  }

  // Fallback to Ollama
  try {
    const text = await askOllama(messages, ollamaModel);
    return { text, provider: "ollama" };
  } catch (e) {
    throw new Error("No AI provider available. Add a Claude API key or start Ollama.");
  }
}

// ── Parse commands from AI response ───────────────────────────────────────

export function parseCommands(text) {
  const match = text.match(/```json\s*(\{[\s\S]*?\})\s*```/);
  if (!match) return [];
  try {
    const parsed = JSON.parse(match[1]);
    return Array.isArray(parsed.commands) ? parsed.commands : [];
  } catch {
    return [];
  }
}

// ── Run shell command via Tauri ───────────────────────────────────────────

export async function runCommand(cmd) {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    return await invoke("run_shell", { cmd });
  } catch {
    console.log("[flux-assistant] would run:", cmd);
    await new Promise(r => setTimeout(r, 600));
    return `[simulated] ${cmd}`;
  }
}
