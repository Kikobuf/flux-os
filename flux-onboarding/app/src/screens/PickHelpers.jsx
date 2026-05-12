export function PickMany({ title, subtitle, options, selected, onToggle, next, back }) {
  return (
    <div className="screen">
      <div className="screen-header">
        <div className="screen-title">{title}</div>
        <div className="screen-subtitle">{subtitle}</div>
      </div>

      <div className="option-grid">
        {options.map((opt) => (
          <div
            key={opt.id}
            className={`option-card ${selected.includes(opt.id) ? "selected" : ""}`}
            onClick={() => onToggle(opt.id)}
          >
            <div className="check">✓</div>
            <div className="option-icon">{opt.icon}</div>
            <div className="option-name">{opt.name}</div>
            {opt.recommended && <div className="option-badge">Popular</div>}
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={back}>Back</button>
        <button
          className="btn btn-primary"
          onClick={next}
          disabled={selected.length === 0}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

export function PickOne({ title, subtitle, options, selected, onSelect, next, back }) {
  return (
    <div className="screen">
      <div className="screen-header">
        <div className="screen-title">{title}</div>
        <div className="screen-subtitle">{subtitle}</div>
      </div>

      <div className="option-grid single">
        {options.map((opt) => (
          <div
            key={opt.id}
            className={`option-card ${selected === opt.id ? "selected" : ""}`}
            onClick={() => onSelect(opt.id)}
          >
            <div className="check">✓</div>
            <div className="option-icon">{opt.icon}</div>
            <div className="option-name">{opt.name}</div>
            {opt.recommended && <div className="option-badge">Popular</div>}
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={back}>Back</button>
        <button
          className="btn btn-primary"
          onClick={next}
          disabled={!selected}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
