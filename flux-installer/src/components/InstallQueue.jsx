export default function InstallQueue({ queue, removing, apps, onRemoveFromQueue, onRemoveFromRemoving, onApply }) {
  const getApp = id => apps.find(a => a.id === id);
  const total = queue.length + removing.length;

  return (
    <div className="queue-drawer">
      <div style={{ fontSize: "0.85rem", fontWeight: 600, flexShrink: 0 }}>
        Pending changes:
      </div>

      <div className="queue-list">
        {queue.map(id => {
          const app = getApp(id);
          if (!app) return null;
          return (
            <div key={id} className="queue-chip">
              <span>{app.icon}</span>
              <span>{app.name}</span>
              <span
                className="queue-chip-remove"
                onClick={() => onRemoveFromQueue(id)}
              >×</span>
            </div>
          );
        })}

        {removing.map(id => {
          const app = getApp(id);
          if (!app) return null;
          return (
            <div key={id} className="queue-chip" style={{ borderColor: "var(--danger)", opacity: 0.8 }}>
              <span>{app.icon}</span>
              <span style={{ textDecoration: "line-through", color: "var(--danger)" }}>{app.name}</span>
              <span
                className="queue-chip-remove"
                onClick={() => onRemoveFromRemoving(id)}
              >×</span>
            </div>
          );
        })}
      </div>

      <button className="btn btn-primary" onClick={onApply}>
        Apply {total} Change{total !== 1 ? "s" : ""}
      </button>
    </div>
  );
}
