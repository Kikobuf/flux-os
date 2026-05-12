import { PickOne } from "./PickHelpers";

const TERMINALS = [
  { id: "alacritty", name: "Alacritty",  icon: "⚡", recommended: true },
  { id: "warp",      name: "Warp",        icon: "🌊", recommended: true },
  { id: "ghostty",   name: "Ghostty",     icon: "👻" },
  { id: "kitty",     name: "Kitty",       icon: "🐱" },
  { id: "foot",      name: "Foot",        icon: "🦶" },
];

export default function PickTerminal({ selections, update, next, back }) {
  return (
    <PickOne
      title="Pick your terminal"
      subtitle="Choose one terminal. You can install others later."
      options={TERMINALS}
      selected={selections.terminal}
      onSelect={(id) => update("terminal", id)}
      next={next}
      back={back}
    />
  );
}
