#!/bin/bash
# flux/install/ai/core.sh
# Installs the full Flux AI stack

set -euo pipefail

echo "  → Installing AI stack..."

# ── mise (runtime manager, needed for npm-based agents) ──────────────────────
if ! command -v mise &>/dev/null; then
  curl https://mise.run | sh
  echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc
  export PATH="$HOME/.local/bin:$PATH"
  eval "$(mise activate bash)"
fi

mise use --global node@latest

# ── Claude Code ───────────────────────────────────────────────────────────────
echo "  → Installing Claude Code..."
npm install -g @anthropic-ai/claude-code
# cx alias = claude code in accept-all (danger) mode
echo 'alias cx="claude --dangerously-skip-permissions"' >> ~/.zshrc

# ── OpenCode ──────────────────────────────────────────────────────────────────
echo "  → Installing OpenCode..."
npm install -g opencode-ai
echo 'alias c="opencode"' >> ~/.zshrc

# ── Lazy-loaded agent stubs ───────────────────────────────────────────────────
# These install on first run via npx, nothing downloaded until used
STUB_DIR="$HOME/.local/bin"
mkdir -p "$STUB_DIR"

create_stub() {
  local name=$1
  local npx_pkg=$2
  cat > "${STUB_DIR}/${name}" << EOF
#!/bin/bash
exec npx --yes ${npx_pkg} "\$@"
EOF
  chmod +x "${STUB_DIR}/${name}"
}

echo "  → Creating lazy agent stubs..."
create_stub "gemini"     "@google/generative-ai-cli"
create_stub "codex"      "@openai/codex"
create_stub "copilot"    "@github/copilot-cli"
create_stub "antigravity" "antigravity-cli"

# ── Ollama ────────────────────────────────────────────────────────────────────
echo "  → Installing Ollama..."
curl -fsSL https://ollama.com/install.sh | sh
sudo systemctl enable --now ollama

# ── LM Studio ────────────────────────────────────────────────────────────────
echo "  → Installing LM Studio..."
yay -S --noconfirm lmstudio

# ── Open WebUI ────────────────────────────────────────────────────────────────
echo "  → Installing Open WebUI (browser UI for Ollama)..."
# Run via Docker for simplest setup
if command -v docker &>/dev/null; then
  docker pull ghcr.io/open-webui/open-webui:main
  # Systemd service so it starts on boot
  sudo tee /etc/systemd/system/open-webui.service > /dev/null << 'EOF'
[Unit]
Description=Open WebUI (Ollama frontend)
After=docker.service ollama.service
Requires=docker.service

[Service]
Restart=always
ExecStart=/usr/bin/docker run --rm \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  --add-host=host.docker.internal:host-gateway \
  ghcr.io/open-webui/open-webui:main
ExecStop=/usr/bin/docker stop open-webui

[Install]
WantedBy=multi-user.target
EOF
  sudo systemctl enable --now open-webui
fi

# ── Voxtype (AI dictation) ────────────────────────────────────────────────────
echo "  → Installing Voxtype..."
yay -S --noconfirm voxtype
# Default hotkey: F9 to hold-and-dictate, Super+Ctrl+X to toggle

echo "  ✓ AI stack installed"
echo ""
echo "  AI tools available:"
echo "    c         → OpenCode (multi-model)"
echo "    cx        → Claude Code (Anthropic)"
echo "    gemini    → Gemini CLI (first run downloads)"
echo "    codex     → OpenAI Codex CLI (first run downloads)"
echo "    copilot   → GitHub Copilot CLI (first run downloads)"
echo "    antigravity → Antigravity CLI (first run downloads)"
echo "    ollama    → Local model runner"
echo "    http://localhost:3000 → Open WebUI"
