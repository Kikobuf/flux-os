import { PickMany } from "./PickHelpers";

const BROWSERS = [
  { id: "chrome",     name: "Chrome",      icon: "🌐", recommended: true },
  { id: "firefox",    name: "Firefox",     icon: "🦊", recommended: true },
  { id: "brave",      name: "Brave",       icon: "🦁", recommended: true },
  { id: "chromium",   name: "Chromium",    icon: "🔵" },
  { id: "opera",      name: "Opera",       icon: "🔴" },
  { id: "vivaldi",    name: "Vivaldi",     icon: "🎵" },
  { id: "zen",        name: "Zen",         icon: "🧘" },
  { id: "librewolf",  name: "LibreWolf",   icon: "🐺" },
];

export default function PickBrowser({ selections, update, next, back }) {
  const toggle = (id) => {
    const cur = selections.browsers;
    update("browsers", cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  };

  return (
    <PickMany
      title="Pick your browser"
      subtitle="Choose one or more. Your first pick becomes the default."
      options={BROWSERS}
      selected={selections.browsers}
      onToggle={toggle}
      next={next}
      back={back}
    />
  );
}
