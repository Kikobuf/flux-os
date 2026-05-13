# Changelog

All notable changes to Flux OS will be documented here.

## [0.1.0] — 2026-05-12

### Initial Release

First public release of Flux OS — a fork of Omarchy rebuilt for AI developers.

#### Added
- **Onboarding Wizard** — Windows-style first-boot setup (browser, editor, AI agent, terminal, theme selection)
- **GUI Settings Panel** — 8-tab visual settings app replacing all vim config editing
- **Visual App Installer** — grid UI for 70+ apps across 12 categories
- **AI Assistant** — Claude API + Ollama fallback conversational system configurator
- **GPU auto-detection** — NVIDIA/AMD/Intel driver install with Hyprland NVIDIA fixes
- **Touchpad gestures** — 3-finger workspace swipe, pinch zoom, tap-to-click
- **Right-click desktop menu** — Files, Browser, Terminal, Wallpaper, Settings, Power
- **Taskbar mode** — toggle between tiling and traditional window layout
- **Monitor wizard** — auto-detects new monitors with Extend/Mirror/External GUI
- **Battery optimization mode** — Saver/Balanced/Performance profiles
- **Screenshot tool** — region/window/fullscreen with annotation (swappy)
- **Dolphin file manager** — replaces Nautilus
- **KDE Connect** — phone/desktop integration
- **19 themes** — Tokyo Night, Catppuccin, Gruvbox, Nord, Rosé Pine, and more

#### AI Stack
- Claude Code (primary agent, `cx` alias)
- OpenCode (multi-model, `c` alias)
- Ollama (local models)
- LM Studio (local model GUI)
- Open WebUI (browser UI for Ollama)
- Voxtype (AI dictation)
- Lazy-loaded stubs: Gemini CLI, Codex CLI, Copilot CLI, Antigravity

#### Default Apps
- Chrome, Cursor, VSCode, Alacritty, Obsidian, Discord, Slack (web)
- GIMP, OBS Studio, mpv, Spotify
- Bruno (API client), DBeaver (database GUI)
- 1Password, Bitwarden, LocalSend

#### Base
- Arch Linux + Hyprland
- Forked from [Omarchy](https://github.com/basecamp/omarchy) by DHH (MIT)
