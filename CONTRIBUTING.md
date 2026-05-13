# Contributing to Flux OS

Thanks for your interest in contributing! Flux is built by developers, for developers. All contributions are welcome.

## Ways to contribute

- **Bug reports** — open an issue with your hardware info and what went wrong
- **Hardware compatibility** — test on your machine, submit fixes for your specific hardware
- **New apps** — add entries to the app catalog
- **New themes** — design and submit a new theme
- **Documentation** — improve or translate the docs
- **Code** — fix bugs, add features, improve scripts

## Getting started

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/flux-os.git
cd flux-os
git checkout -b feature/your-feature-name
```

## Adding an app to the installer

Edit `flux-installer/src/catalog.js` and add an entry:

```js
{
  id:        "myapp",          // unique id, lowercase, no spaces
  name:      "My App",         // display name
  icon:      "🔥",             // emoji icon
  desc:      "What it does.",  // one sentence
  category:  "utilities",      // see CATEGORIES list
  pkg:       "myapp-bin",      // package name
  pkgType:   "aur",            // pacman | aur | npm | pip | docker | webapp
  featured:  false,            // show in featured section?
  installed: false,            // default installed with Flux?
},
```

## Adding a theme

1. Create `themes/my-theme/` directory
2. Add `colors.toml` — see any existing theme for the format
3. Add `preview.png` — 800×500 screenshot
4. Add backgrounds in `themes/my-theme/backgrounds/`
5. The theme system auto-generates terminal, waybar, and hyprlock configs from `colors.toml`

## Adding a bin script

Scripts in `bin/` follow the `flux-*` naming convention:

```bash
#!/bin/bash
# flux-my-script — short description
# omarchy:summary=Short description shown in menu
# omarchy:group=category

set -euo pipefail

# your code here
```

Make it executable: `chmod +x bin/flux-my-script`

## Pull request guidelines

- Keep PRs focused — one thing per PR
- Test on real hardware when possible
- Include a description of what changed and why
- Screenshots for UI changes are helpful

## Code style

- Shell scripts: `set -euo pipefail`, 2-space indent
- React: functional components, hooks, no class components
- Keep things simple — Flux is supposed to be understandable

## License

By contributing, you agree your contributions are licensed under the MIT License.
