export default function Welcome({ next }) {
  return (
    <div className="screen">
      <div className="welcome-logo">
        <div className="flux-logo">FLUX</div>
      </div>

      <div className="screen-header">
        <div className="screen-title">Welcome to Flux</div>
        <div className="screen-subtitle">
          Linux, reimagined for the AI age. Let's get you set up in just a few steps.
        </div>
      </div>

      <button className="btn btn-primary btn-large" onClick={next}>
        Get Started →
      </button>

      <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
        Takes about 2 minutes
      </div>
    </div>
  );
}
