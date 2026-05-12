import { useState } from "react";
import Welcome from "./screens/Welcome";
import CreateUser from "./screens/CreateUser";
import PickBrowser from "./screens/PickBrowser";
import PickEditor from "./screens/PickEditor";
import PickAgent from "./screens/PickAgent";
import PickTerminal from "./screens/PickTerminal";
import PickTheme from "./screens/PickTheme";
import PickAppearance from "./screens/PickAppearance";
import Finishing from "./screens/Finishing";
import "./App.css";

const SCREENS = [
  "welcome",
  "create-user",
  "pick-browser",
  "pick-editor",
  "pick-agent",
  "pick-terminal",
  "pick-theme",
  "pick-appearance",
  "finishing",
];

export default function App() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [selections, setSelections] = useState({
    user: { name: "", username: "", password: "" },
    browsers: ["chrome"],
    editors: ["cursor"],
    agents: ["claude-code", "opencode"],
    terminal: "alacritty",
    theme: "tokyo-night",
    mode: "dark",
    accent: "#00ff88",
  });

  const screen = SCREENS[screenIndex];
  const isFirst = screenIndex === 0;
  const isLast = screenIndex === SCREENS.length - 1;

  const next = () => !isLast && setScreenIndex((i) => i + 1);
  const back = () => !isFirst && setScreenIndex((i) => i - 1);

  const update = (key, value) =>
    setSelections((s) => ({ ...s, [key]: value }));

  const props = { selections, update, next, back, screenIndex, totalScreens: SCREENS.length };

  return (
    <div className="app">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((screenIndex) / (SCREENS.length - 1)) * 100}%` }}
        />
      </div>

      {screen === "welcome"       && <Welcome       {...props} />}
      {screen === "create-user"   && <CreateUser    {...props} />}
      {screen === "pick-browser"  && <PickBrowser   {...props} />}
      {screen === "pick-editor"   && <PickEditor    {...props} />}
      {screen === "pick-agent"    && <PickAgent     {...props} />}
      {screen === "pick-terminal" && <PickTerminal  {...props} />}
      {screen === "pick-theme"    && <PickTheme     {...props} />}
      {screen === "pick-appearance" && <PickAppearance {...props} />}
      {screen === "finishing"     && <Finishing     {...props} />}
    </div>
  );
}
