import { PickMany } from "./PickHelpers";

const EDITORS = [
  { id: "cursor",    name: "Cursor",       icon: "⚡", recommended: true },
  { id: "vscode",    name: "VS Code",      icon: "💙", recommended: true },
  { id: "zed",       name: "Zed",          icon: "⚡" },
  { id: "neovim",    name: "Neovim",       icon: "💚" },
  { id: "vim",       name: "Vim",          icon: "🟢" },
  { id: "helix",     name: "Helix",        icon: "🌀" },
  { id: "sublime",   name: "Sublime Text", icon: "🟠" },
  { id: "jetbrains", name: "JetBrains",    icon: "🧠" },
  { id: "emacs",     name: "Emacs",        icon: "🟣" },
  { id: "gedit",     name: "gedit",        icon: "📝" },
];

export default function PickEditor({ selections, update, next, back }) {
  const toggle = (id) => {
    const cur = selections.editors;
    update("editors", cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  };

  return (
    <PickMany
      title="Pick your code editor"
      subtitle="Choose one or more. Your first pick becomes the default."
      options={EDITORS}
      selected={selections.editors}
      onToggle={toggle}
      next={next}
      back={back}
    />
  );
}
