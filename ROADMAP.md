# Flux Development Roadmap

## Phase 1 — Fork & App Swap (Week 1-2)
Get a working Flux install that boots and has the right app stack.

- [ ] Fork basecamp/omarchy on GitHub
- [ ] Update branding (name, logo, README, boot screen)
- [ ] Swap default app installs (remove HEY/Basecamp/Neovim defaults)
- [ ] Add new default apps (Discord, Bruno, DBeaver, GIMP, Dolphin, etc.)
- [ ] Add AI stack installs (Claude Code, OpenCode, Ollama, LM Studio, Open WebUI, Voxtype)
- [ ] Add lazy-loaded agent stubs (Gemini, Codex, Copilot, Antigravity)
- [ ] Add dev env installs (Node, Python, Docker, VSCode, Cursor)
- [ ] Add security defaults (ufw, SSD TRIM, crash reporter)
- [ ] GPU auto-detection script (NVIDIA/AMD/Intel)
- [ ] NVIDIA Hyprland compatibility fixes

## Phase 2 — Hardware & UX Basics (Week 3-4)
Fix the pain points that break beginner experiences.

- [ ] Auto monitor detection wizard
- [ ] Touchpad gestures config
- [ ] Battery optimization mode toggle
- [ ] Right-click desktop menu
- [ ] Taskbar mode option (alongside tiling)
- [ ] Dolphin as default file manager
- [ ] Trash that always works
- [ ] Recent files in launcher and file manager
- [ ] Screenshot tool GUI (grimblast + swappy)
- [ ] KDE Connect setup
- [ ] LocalSend setup

## Phase 3 — Flux Settings GUI (Week 5-8)
The biggest lift. Replaces all vim config editing with a visual panel.

- [ ] Settings app scaffold (Tauri + React)
- [ ] Appearance tab (dark/light mode, accent color, wallpaper, fonts)
- [ ] Display tab (monitor arrangement, scaling, refresh rate)
- [ ] Network tab (WiFi, VPN client UI, network speed toggle)
- [ ] Security tab (firewall GUI, auto-updates toggle, encryption)
- [ ] Performance tab (CPU/RAM taskbar toggle, battery mode)
- [ ] Startup Apps tab (manage boot apps)
- [ ] Updates tab (manual vs automatic, update now)
- [ ] About tab (Flux version, system info)

## Phase 4 — Visual App Installer (Week 9-10)
Replace the terminal menu with a grid UI.

- [ ] App installer scaffold (Tauri + React)
- [ ] App grid with categories and icons
- [ ] Install / uninstall from UI
- [ ] Search
- [ ] Tie into pacman / yay / AUR under the hood

## Phase 5 — Onboarding Wizard (Week 11-12)
First boot experience.

- [ ] Welcome screen with Flux branding
- [ ] WiFi / network setup step
- [ ] Theme / accent color picker step
- [ ] App selection step (what do you want installed?)
- [ ] Password manager setup step
- [ ] "Meet your AI assistant" step (introduces Claude assistant)
- [ ] Done screen with quick-start tips

## Phase 6 — AI Setup Assistant (Week 13-16)
The flagship feature. Claude-powered conversational system configuration.

- [ ] Floating assistant widget (always accessible)
- [ ] Natural language system config ("make my terminal look like X")
- [ ] App install via chat ("install Slack")
- [ ] Troubleshooting via chat ("my WiFi isn't working")
- [ ] Anthropic API integration
- [ ] Works offline with Ollama fallback

## Phase 7 — Polish & Release (Week 17-20)
- [ ] ISO build pipeline
- [ ] fluxos.dev website
- [ ] Documentation site
- [ ] GitHub Discussions / community
- [ ] v1.0 release
