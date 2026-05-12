import { useState, useMemo } from "react";
import { APPS, CATEGORIES } from "./catalog.js";
import AppCard from "./components/AppCard.jsx";
import InstallQueue from "./components/InstallQueue.jsx";
import InstallModal from "./components/InstallModal.jsx";

export default function App() {
  const [category, setCategory]   = useState("all");
  const [search, setSearch]       = useState("");
  const [queue, setQueue]         = useState([]);          // ids queued to install
  const [removing, setRemoving]   = useState([]);          // ids queued to remove
  const [installed, setInstalled] = useState(            // track install state
    () => new Set(APPS.filter(a => a.installed).map(a => a.id))
  );
  const [showModal, setShowModal] = useState(false);

  // Filter apps
  const filtered = useMemo(() => {
    let apps = APPS;
    if (category !== "all") apps = apps.filter(a => a.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      apps = apps.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q)
      );
    }
    return apps;
  }, [category, search]);

  // Featured (only in "all" with no search)
  const featured = category === "all" && !search.trim()
    ? filtered.filter(a => a.featured)
    : [];
  const rest = category === "all" && !search.trim()
    ? filtered.filter(a => !a.featured)
    : filtered;

  const toggleQueue = (id) => {
    if (installed.has(id)) {
      // Toggle removal queue
      setRemoving(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id]);
    } else {
      // Toggle install queue
      setQueue(q => q.includes(id) ? q.filter(x => x !== id) : [...q, id]);
    }
  };

  const isQueued   = (id) => queue.includes(id);
  const isRemoving = (id) => removing.includes(id);

  const applyChanges = () => {
    if (queue.length === 0 && removing.length === 0) return;
    setShowModal(true);
  };

  const onInstallComplete = (installedIds, removedIds) => {
    setInstalled(prev => {
      const next = new Set(prev);
      installedIds.forEach(id => next.add(id));
      removedIds.forEach(id => next.delete(id));
      return next;
    });
    setQueue([]);
    setRemoving([]);
    setShowModal(false);
  };

  const catCounts = useMemo(() => {
    const counts = {};
    APPS.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    counts.all = APPS.length;
    return counts;
  }, []);

  const totalChanges = queue.length + removing.length;

  return (
    <div className="app">
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-logo">FLUX</div>
        <div className="topbar-title">App Installer</div>
        <input
          className="search-box"
          placeholder="Search apps..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
        <div className="topbar-right">
          {totalChanges > 0 && (
            <div className="queue-badge" onClick={applyChanges}>
              {totalChanges} change{totalChanges !== 1 ? "s" : ""} pending
            </div>
          )}
          <button
            className="btn btn-primary"
            onClick={applyChanges}
            disabled={totalChanges === 0}
          >
            Apply Changes
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="body">
        {/* Sidebar */}
        <aside className="sidebar">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              className={`cat-item ${category === cat.id ? "active" : ""}`}
              onClick={() => setCategory(cat.id)}
            >
              <span className="cat-icon">{cat.icon}</span>
              {cat.label}
              <span className="cat-count">{catCounts[cat.id] || 0}</span>
            </div>
          ))}
        </aside>

        {/* Grid */}
        <div className="grid-area">
          {featured.length > 0 && (
            <>
              <div className="grid-section-title">⭐ Featured</div>
              <div className="app-grid">
                {featured.map(app => (
                  <AppCard
                    key={app.id}
                    app={app}
                    installed={installed.has(app.id)}
                    queued={isQueued(app.id)}
                    removing={isRemoving(app.id)}
                    onToggle={toggleQueue}
                  />
                ))}
              </div>
            </>
          )}

          {rest.length > 0 && (
            <>
              {featured.length > 0 && (
                <div className="grid-section-title">All Apps</div>
              )}
              <div className="app-grid">
                {rest.map(app => (
                  <AppCard
                    key={app.id}
                    app={app}
                    installed={installed.has(app.id)}
                    queued={isQueued(app.id)}
                    removing={isRemoving(app.id)}
                    onToggle={toggleQueue}
                  />
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-3)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>🔍</div>
              <div>No apps found for "{search}"</div>
            </div>
          )}

          {/* Bottom padding for queue drawer */}
          {totalChanges > 0 && <div style={{ height: 72 }} />}
        </div>
      </div>

      {/* Queue drawer */}
      {totalChanges > 0 && (
        <InstallQueue
          queue={queue}
          removing={removing}
          apps={APPS}
          onRemoveFromQueue={(id) => setQueue(q => q.filter(x => x !== id))}
          onRemoveFromRemoving={(id) => setRemoving(r => r.filter(x => x !== id))}
          onApply={applyChanges}
        />
      )}

      {/* Install modal */}
      {showModal && (
        <InstallModal
          queue={queue}
          removing={removing}
          apps={APPS}
          onComplete={onInstallComplete}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
