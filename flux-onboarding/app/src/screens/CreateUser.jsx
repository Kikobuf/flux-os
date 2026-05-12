import { useState, useEffect } from "react";

export default function CreateUser({ selections, update, next, back }) {
  const [form, setForm] = useState(selections.user);
  const [errors, setErrors] = useState({});

  // Auto-generate username from full name
  useEffect(() => {
    if (form.name) {
      const auto = form.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 16);
      setForm((f) => ({ ...f, username: auto }));
    }
  }, [form.name]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.username.trim()) e.username = "Username is required";
    if (!/^[a-z][a-z0-9_-]{0,15}$/.test(form.username))
      e.username = "Lowercase letters, numbers, _ or - only";
    if (form.password.length < 6) e.password = "At least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      update("user", form);
      next();
    }
  };

  const initials = form.name
    ? form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const field = (key, label, type = "text", hint = "") => (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        value={form[key] || ""}
        className={errors[key] ? "error" : ""}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        onKeyDown={(e) => e.key === "Enter" && handleNext()}
        autoComplete="off"
      />
      {hint && !errors[key] && <div className="field-hint">{hint}</div>}
      {errors[key] && <div className="field-error">{errors[key]}</div>}
    </div>
  );

  return (
    <div className="screen">
      <div className="screen-header">
        <div className="screen-title">Create your account</div>
        <div className="screen-subtitle">This is your local user account on this machine.</div>
      </div>

      <div className="avatar-row">
        <div className="avatar">{initials}</div>
        <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Your avatar is generated from your initials.
        </div>
      </div>

      <div className="form">
        {field("name", "Full Name", "text", "e.g. Jane Smith")}
        {field("username", "Username", "text", "Used to log in. Lowercase only.")}
        {field("password", "Password", "password", "At least 6 characters")}
        {field("confirm", "Confirm Password", "password")}
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={back}>Back</button>
        <button className="btn btn-primary" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}
