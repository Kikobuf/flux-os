<div align="center">

# FLUX

**Linux, reimagined for the AI age.**

[![License: MIT](https://img.shields.io/badge/License-MIT-00ff88.svg)](LICENSE)
[![Based on Omarchy](https://img.shields.io/badge/based%20on-Omarchy-blue)](https://github.com/basecamp/omarchy)
[![Arch Linux](https://img.shields.io/badge/Arch-Linux-1793d1?logo=arch-linux)](https://archlinux.org)
[![Hyprland](https://img.shields.io/badge/Hyprland-WM-58e1ff)](https://hypr.land)

A beautiful, beginner-friendly, AI-first Linux distribution built on [Arch Linux](https://archlinux.org) and [Hyprland](https://hypr.land). A fork of [Omarchy](https://github.com/basecamp/omarchy) by DHH — rebuilt for developers and AI builders who want the power of Linux without the pain.

</div>

---

## What makes Flux different?

| Feature | Flux | Omarchy |
|---|---|---|
| First-boot setup wizard | ✅ Windows-style OOBE | ❌ Manual |
| GUI Settings Panel | ✅ No vim configs ever | ❌ Edit files manually |
| Visual App Installer | ✅ 70+ apps, grid UI | ❌ Terminal menu |
| AI Assistant | ✅ Claude + Ollama | ❌ None |
| GPU auto-detection | ✅ NVIDIA/AMD/Intel | ⚠️ Partial |
| Default editor | Cursor (AI-first) | Neovim |
| File manager | Dolphin | Nautilus |
| Default browser | Chrome | Chromium |

---

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/Kikobuf/flux-os/main/boot.sh | bash
```

> Requires a dedicated drive. Full disk encryption enabled by default.
> Disable Secure Boot in BIOS before installing.

Or download the ISO from [Releases](https://github.com/Kikobuf/flux-os/releases) and write to USB:
```bash
sudo dd if=flux-*.iso of=/dev/sdX bs=4M status=progress
```

---

## First Boot

The onboarding wizard launches automatically — pick your browser, editor, AI agents, terminal, and theme. Takes 2 minutes.

---

## Key Features

### 🤖 AI-First Stack
Claude Code, OpenCode, Ollama, LM Studio, Open WebUI, and Voxtype AI dictation — all pre-configured. Claude Code is the primary agent (`cx` alias), OpenCode handles multi-model workflows (`c` alias).

### ⚙️ GUI Settings Panel
Open with `Super + ,` — change themes, display settings, VPN, firewall, battery mode, startup apps. No terminal required. No vim.

### 📦 Visual App Installer
Open with `Super + Alt + I` — browse 70+ apps across 12 categories. Install in one click.

### 🧠 AI Setup Assistant
Open with `Super + A` — powered by Claude API with Ollama fallback. Ask it to configure your system, install apps, or troubleshoot issues through conversation.

### 🖥️ Smart Hardware Support
Auto-detects NVIDIA/AMD/Intel GPUs and installs the right drivers. Monitor wizard pops up when you plug in a display. Touchpad gestures work out of the box.

### 🎨 19 Themes
Tokyo Night, Catppuccin, Gruvbox, Nord, Rosé Pine, Everforest, Hackerman, Kanagawa, and more — all with matching terminal, waybar, and lock screen.

---

## Default Apps

See [APPS.md](APPS.md) for the full list. Highlights:

**AI:** Claude Code · OpenCode · Ollama · LM Studio · Open WebUI · Voxtype  
**Editors:** Cursor · VSCode  
**Browser:** Chrome  
**Terminal:** Alacritty  
**Dev:** Docker · Lazygit · Bruno · DBeaver · Node.js · Python  
**Media:** GIMP · OBS Studio · Spotify  
**Comms:** Discord · Slack  
**Security:** 1Password · Bitwarden  

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Super + Space` | App launcher |
| `Super + Return` | Terminal |
| `Super + E` | File manager |
| `Super + ,` | Flux Settings |
| `Super + A` | AI Assistant |
| `Super + Alt + I` | App Installer |
| `Super + Alt + T` | Taskbar/tiling toggle |
| `Print` | Screenshot |
| `Super + K` | Show all shortcuts |

---

## Features

See [FEATURES.md](FEATURES.md) for the complete feature list.

---

## Documentation

See [docs/](docs/) for full documentation including:
- Installation guide
- Keyboard shortcuts
- AI tools guide
- Theming guide
- Troubleshooting
- Contributing guide

---

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the build plan.

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

---

## Credits

Flux is a fork of [Omarchy](https://github.com/basecamp/omarchy) by DHH. Built on [Arch Linux](https://archlinux.org) and [Hyprland](https://hypr.land).

## License

MIT — see [LICENSE](LICENSE)
