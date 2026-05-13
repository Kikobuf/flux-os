import { useState } from "react";
import { parseCommands, runCommand } from "../ai.js";

function CommandBlock({ text }) {
  const commands = parseCommands(text);
  const [statuses, setStatuses] = useState({});
  const [running, setRunning]   = useState(false);

  if (commands.length === 0) return null;

  const runAll = async () => {
    setRunning(true);
    for (let i = 0; i < commands.length; i++) {
      setStatuses(s => ({ ...s, [i]: "running" }));
      try {
        await runCommand(commands[i]);
        setStatuses(s => ({ ...s, [i]: "done" }));
      } catch {
        setStatuses(s => ({ ...s, [i]: "error" }));
      }
    }
    setRunning(false);
  };

  const allDone = commands.every((_, i) => statuses[i] === "done");

  return (
    <div className="cmd-block">
      <div className="cmd-block-header">
        <span>Commands to run</span>
        {!allDone && (
          <button className="cmd-run-btn" onClick={runAll} disabled={running}>
            {running ? "Running..." : "▶ Run"}
          </button>
        )}
        {allDone && <span style={{ color: "var(--accent)", fontSize: "0.75rem" }}>✓ Done</span>}
      </div>
      <div className="cmd-list">
        {commands.map((cmd, i) => (
          <div key={i} className="cmd-line">
            <span className="cmd-status">
              {statuses[i] === "done"    && "✓"}
              {statuses[i] === "running" && "⟳"}
              {statuses[i] === "error"   && "✗"}
              {!statuses[i]              && "›"}
            </span>
            <span>{cmd}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Format message text — strip the JSON block before displaying
function formatText(text) {
  return text.replace(/```json[\s\S]*?```/g, "").trim();
}

export default function Message({ msg }) {
  const isUser = msg.role === "user";
  const displayText = isUser ? msg.content : formatText(msg.content);

  return (
    <div className={`msg msg-${isUser ? "user" : "assistant"}`}>
      <div className="msg-bubble">
        {displayText.split("\n").map((line, i) => (
          <span key={i}>{line}{i < displayText.split("\n").length - 1 && <br />}</span>
        ))}
      </div>
      {!isUser && <CommandBlock text={msg.content} />}
      <div className="msg-meta">{msg.time}</div>
    </div>
  );
}
