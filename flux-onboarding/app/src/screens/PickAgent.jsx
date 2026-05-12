import { PickMany } from "./PickHelpers";

const AGENTS = [
  { id: "claude-code",  name: "Claude Code",    icon: "🧠", recommended: true },
  { id: "opencode",     name: "OpenCode",        icon: "🔮", recommended: true },
  { id: "gemini",       name: "Gemini CLI",      icon: "♊" },
  { id: "codex",        name: "OpenAI Codex",    icon: "🤖" },
  { id: "copilot",      name: "GitHub Copilot",  icon: "🐙" },
  { id: "antigravity",  name: "Antigravity",     icon: "🚀" },
  { id: "aider",        name: "Aider",           icon: "🛠️" },
  { id: "continue",     name: "Continue",        icon: "▶️" },
];

export default function PickAgent({ selections, update, next, back }) {
  const toggle = (id) => {
    const cur = selections.agents;
    update("agents", cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  };

  return (
    <PickMany
      title="Pick your AI coding agents"
      subtitle="Choose which AI agents to install. You can add more later."
      options={AGENTS}
      selected={selections.agents}
      onToggle={toggle}
      next={next}
      back={back}
    />
  );
}
