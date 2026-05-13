import { useState, useRef, useEffect } from "react";
import { sendMessage } from "./ai.js";
import SetupScreen from "./components/SetupScreen.jsx";
import Message from "./components/Message.jsx";

const SUGGESTIONS = [
  "Switch to Tokyo Night theme",
  "Install Discord",
  "Turn on battery saver",
  "How do I take a screenshot?",
  "Make my terminal font bigger",
  "Set up a VPN",
  "Show my IP address",
  "Open the app installer",
];

const WELCOME = {
  role: "assistant",
  content: `Hey! I'm your Flux Assistant. I can help you configure your system, install apps, change themes, troubleshoot issues — all through conversation.

What would you like to do?`,
  time: now(),
};

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function App() {
  const [config, setConfig]       = useState(null);   // { apiKey, ollamaModel, provider }
  const [messages, setMessages]   = useState([WELCOME]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef            = useRef(null);
  const inputRef                  = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    setInput("");
    const userMsg = { role: "user", content, time: now() };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    try {
      const { text: reply, provider } = await sendMessage(
        history.filter(m => m.role !== "system"),
        config
      );
      setMessages(h => [...h, { role: "assistant", content: reply, time: now(), provider }]);
    } catch (e) {
      setMessages(h => [...h, {
        role: "assistant",
        content: `Sorry, I hit an error: ${e.message}`,
        time: now(),
      }]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const providerLabel = config?.provider === "claude" ? "Claude"
    : config?.provider === "ollama" ? `Ollama · ${config.ollamaModel}`
    : "No AI";

  const providerClass = config?.provider === "claude" ? "provider-claude"
    : config?.provider === "ollama" ? "provider-ollama"
    : "provider-none";

  if (!config) {
    return <SetupScreen onComplete={setConfig} />;
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-logo">FLUX</div>
        <div className="header-title">Assistant</div>
        <div className={`provider-pill ${providerClass}`}>
          ● {providerLabel}
        </div>
        <button
          className="settings-btn"
          title="Change AI provider"
          onClick={() => setConfig(null)}
        >⚙</button>
      </div>

      {/* Messages */}
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}

        {loading && (
          <div className="typing">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (only on first message) */}
      {messages.length === 1 && (
        <div className="suggestions">
          {SUGGESTIONS.map((s) => (
            <div key={s} className="suggestion" onClick={() => send(s)}>
              {s}
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="input-bar">
        <textarea
          ref={inputRef}
          className="input-box"
          placeholder="Ask me anything about your system..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          autoFocus
        />
        <button
          className="send-btn"
          onClick={() => send()}
          disabled={!input.trim() || loading}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
