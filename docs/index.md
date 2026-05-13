# Flux OS Documentation

**Linux, reimagined for the AI age.**

Flux is a beginner-friendly, AI-first Linux distribution based on [Arch Linux](https://archlinux.org) and [Hyprland](https://hypr.land). It's a fork of [Omarchy](https://omarchy.org) by DHH, rebuilt for developers and AI builders.

---

## Table of Contents

- [Installation](#installation)
- [First Boot](#first-boot)
- [Key Features](#key-features)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Flux Settings](#flux-settings)
- [App Installer](#app-installer)
- [AI Assistant](#ai-assistant)
- [Theming](#theming)
- [AI Tools](#ai-tools)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Installation

### Requirements
- 64-bit x86 processor
- 8GB RAM minimum (16GB recommended)
- 40GB disk space minimum
- Dedicated drive (Flux installs to the full drive)
- Internet connection

### Steps

1. **Download the ISO** — ISO releases coming soon. For now, install via `curl -fsSL https://raw.githubusercontent.com/Kikobuf/flux-os/main/boot.sh | bash` on an existing Arch Linux system.

2. **Write to USB** (8GB+ drive):
   ```bash
   # Linux/macOS
   sudo dd if=flux-*.iso of=/dev/sdX bs=4M status=progress

   # Windows — use balenaEtcher
   ```

3. **Boot from USB** — disable Secure Boot in BIOS first

4. **Follow the installer** — select your drive, set timezone and locale

5. **Reboot** into the Flux onboarding wizard

---

## First Boot

When Flux boots for the first time, the **Onboarding Wizard** launches automatically — just like Windows setup. It walks you through:

1. **Create your account** — name, username, password
2. **Pick your browser** — Chrome, Firefox, Brave, and more
3. **Pick your editor** — Cursor, VSCode, Neovim, and more
4. **Pick your AI agents** — Claude Code, OpenCode, Gemini, and more
5. **Pick your terminal** — Alacritty, Warp, Ghostty, and more
6. **Pick your theme** — 19 beautiful themes
7. **Choose appearance** — dark/light mode, accent color
8. **Done** — your system sets itself up

---

## Key Features

### GUI Settings Panel
Open with `Super + ,` or search "Settings" in the app launcher.

No vim config editing — ever. Change themes, display settings, VPN, firewall, startup apps, and more through a visual interface.

### AI Assistant
Open with `Super + A`.

Powered by Claude API (with Ollama fallback). Ask it anything:
- *"Switch to Tokyo Night theme"*
- *"Install Discord"*
- *"My WiFi isn't working"*
- *"Turn on battery saver"*

### Visual App Installer
Open with `Super + Alt + I`.

Browse 70+ apps across 12 categories. Click Install, click Apply — done. No terminal required.

### Taskbar Mode
Press `Super + Alt + T` to toggle between tiling and traditional taskbar layout.

---

## Keyboard Shortcuts

### Essential
| Shortcut | Action |
|---|---|
| `Super + Space` | App launcher |
| `Super + Return` | Open terminal |
| `Super + E` | Open file manager |
| `Super + W` | Close window |
| `Super + F` | Fullscreen |
| `Super + ,` | Flux Settings |
| `Super + A` | AI Assistant |
| `Super + Alt + I` | App Installer |

### Window Management
| Shortcut | Action |
|---|---|
| `Super + Alt + T` | Toggle taskbar/tiling mode |
| `Super + T` | Toggle floating/tiled |
| `Super + J` | Toggle window layout |
| `Super + Arrow` | Move focus |
| `Super + Shift + Arrow` | Move window |

### AI & Tools
| Shortcut | Action |
|---|---|
| `Super + A` | Toggle AI Assistant |
| `Super + Alt + I` | App Installer |
| `Super + Alt + M` | Monitor wizard |
| `Super + Alt + B` | Battery mode toggle |
| `Print` | Screenshot menu |
| `Super + Print` | Screenshot region |
| `Ctrl + X` (hold F9) | AI dictation |

### System
| Shortcut | Action |
|---|---|
| `Super + Ctrl + L` | Lock screen |
| `Super + Escape` | Power menu |
| `Super + Ctrl + W` | WiFi controls |
| `Super + Ctrl + B` | Bluetooth |
| `Super + Ctrl + A` | Audio controls |

---

## Flux Settings

Open with `Super + ,`

### Tabs

**Appearance**
- 19 themes with visual preview
- Dark/light mode toggle
- Accent color picker (10 colors)
- Font picker
- Rounded corners + animations toggle
- Wallpaper browser

**Display**
- Monitor layout and arrangement
- Display scale (0.5x–2.0x)
- Refresh rate
- Night light + color temperature
- Taskbar/tiling mode toggle

**Network & VPN**
- WiFi management
- WireGuard/OpenVPN import
- VPN status
- Network speed indicator toggle

**Security**
- Firewall toggle (ufw)
- Auto-updates toggle
- Screen lock timeout
- Disk encryption status
- Fingerprint + FIDO2 setup

**Performance**
- Battery mode (Saver / Balanced / Performance)
- CPU & RAM taskbar toggle
- SSD TRIM management

**Startup Apps**
- Toggle apps that launch on login
- Add custom startup apps

**Updates**
- Manual or automatic updates
- Update channel (stable/edge)
- AUR package management

**About**
- System info
- Debug info copy
- Snapshot creator

---

## App Installer

Open with `Super + Alt + I`

Browse apps by category:
- **AI & Agents** — Claude Code, OpenCode, Ollama, LM Studio, Gemini CLI, Aider...
- **Editors** — Cursor, VSCode, Zed, Neovim, Helix...
- **Browsers** — Chrome, Firefox, Brave, Vivaldi, Zen...
- **Terminals** — Alacritty, Warp, Ghostty, Kitty...
- **Development** — Docker, Bruno, DBeaver, Postman...
- **Gaming** — Steam, Heroic, Lutris, RetroArch...
- And more

**How to install:**
1. Browse or search for an app
2. Click **Install**
3. Click **Apply Changes**
4. Watch the live install log

---

## AI Assistant

Open with `Super + A`

### Setup

On first open, choose your AI provider:

**Claude (Recommended)**
1. Get an API key at [console.anthropic.com](https://console.anthropic.com)
2. Paste it in the setup screen
3. Cost: ~$0.01 per conversation

**Ollama (Free)**
1. Make sure Ollama is running: `ollama serve`
2. The assistant auto-detects it
3. Completely free and private

The assistant tries Claude first, falls back to Ollama automatically.

### What it can do

| Say this | It does this |
|---|---|
| "Switch to Catppuccin theme" | `flux-theme-set catppuccin` |
| "Install Slack" | `yay -S --noconfirm slack-desktop` |
| "Turn on battery saver" | `flux-battery-mode saver` |
| "Make my font bigger" | `flux-font-set 'JetBrains Mono' 16` |
| "My WiFi isn't working" | Troubleshooting steps + commands |
| "Show my IP address" | `ip addr show` |

Commands appear in a block with a **▶ Run** button — you approve before anything runs.

---

## Theming

Flux includes 19 themes:

| Theme | Style |
|---|---|
| Tokyo Night | Dark blue/purple |
| Catppuccin | Pastel dark |
| Gruvbox | Retro warm |
| Nord | Cool arctic |
| Rosé Pine | Soft dark |
| Everforest | Nature green |
| Hackerman | Terminal green |
| Kanagawa | Japanese ink |
| Matte Black | Pure dark |
| Osaka Jade | Deep teal |
| Retro 82 | Synthwave |
| Lumon | Severance-inspired |
| Ethereal | Deep space |
| Vantablack | Absolute dark |
| White | Pure light |
| Last Horizon | Cyberpunk pink |
| Solitude | Muted blue |
| Miasma | Earth tones |

**Change theme:**
- Settings → Appearance → Theme grid
- `Super + Ctrl + Shift + Space` → theme picker
- `flux-theme-set <name>` in terminal
- Ask the AI: *"switch to Nord"*

---

## AI Tools

### Claude Code
Primary AI coding agent.
```bash
cx                    # start Claude Code (accept-all mode)
claude                # standard mode
```

### OpenCode
Multi-model agent — supports Claude, GPT, Gemini, and local models.
```bash
c                     # start OpenCode
```

### Ollama
Run AI models locally.
```bash
ollama run llama3     # chat with Llama 3
ollama run codellama  # code-focused model
ollama list           # see installed models
ollama pull mistral   # download a new model
```

### Open WebUI
Browser UI for Ollama at [localhost:3000](http://localhost:3000)

### Voxtype
AI dictation — hold `F9` to speak, text appears wherever your cursor is.

---

## Development

### Default stack
- **Node.js** via mise — `node`, `npm`, `npx`
- **Python** via mise — `python`, `pip`
- **Docker** — `docker`, `docker compose`
- **Git** — with Lazygit TUI (`lazygit`)

### Editors
- **Cursor** — AI-powered VSCode fork (default)
- **VSCode** — `code .`
- More in the App Installer

### Dev tools
- **Bruno** — API client (like Postman, but offline)
- **DBeaver** — database GUI
- **Lazydocker** — Docker TUI (`Super + Shift + D`)

---

## Troubleshooting

### NVIDIA GPU issues
Flux auto-detects NVIDIA and applies Hyprland fixes. If you still have issues:
```bash
# Check if NVIDIA DRM is enabled
cat /proc/cmdline | grep nvidia_drm

# Re-apply NVIDIA fixes
sudo bash ~/.local/share/flux/install/hardware/gpu-detect.sh
```

### WiFi not working
```bash
# Open WiFi UI
Super + Ctrl + W

# Or terminal
nmcli device wifi list
nmcli device wifi connect "NetworkName" password "password"
```

### Black screen on boot
1. At GRUB, press `e`
2. Add `nomodeset` to the kernel line
3. Boot, then fix drivers from terminal

### App won't install
```bash
# Update AUR helper first
yay -Syu

# Try manual install
yay -S --noconfirm <package-name>
```

### Reset to defaults
```bash
flux-reinstall-configs    # reset all configs
flux-reinstall-pkgs       # reinstall all packages
```

---

## Contributing

Flux is open source (MIT license). Contributions welcome!

### How to contribute
1. Fork [github.com/Kikobuf/flux-os](https://github.com/Kikobuf/flux-os)
2. Create a branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Test on a real machine or VM
5. Submit a pull request

### What we need
- Bug fixes and hardware compatibility improvements
- New app entries in `flux-installer/src/catalog.js`
- New themes in `themes/`
- Documentation improvements
- Testing on different hardware

### Code structure
```
flux-os/
├── bin/              # 300+ flux-* CLI scripts
├── default/          # Hyprland, waybar, walker configs
├── themes/           # 19 color themes
├── install/          # Install scripts
├── flux-settings/    # GUI Settings Panel (React)
├── flux-installer/   # Visual App Installer (React)
├── flux-onboarding/  # First-boot wizard (React)
├── flux-assistant/   # AI Assistant (React)
└── build-iso.sh      # ISO build script
```

---

*Flux OS is a fork of [Omarchy](https://github.com/basecamp/omarchy) by DHH. Both are MIT licensed.*
