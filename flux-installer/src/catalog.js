// Full Flux app catalog

export const CATEGORIES = [
  { id: "all",           label: "All Apps",      icon: "🔲" },
  { id: "ai",            label: "AI & Agents",   icon: "🤖" },
  { id: "editors",       label: "Editors",       icon: "✏️"  },
  { id: "browsers",      label: "Browsers",      icon: "🌐" },
  { id: "terminals",     label: "Terminals",     icon: "💻" },
  { id: "dev",           label: "Development",   icon: "⚙️"  },
  { id: "productivity",  label: "Productivity",  icon: "📋" },
  { id: "media",         label: "Media",         icon: "🎬" },
  { id: "communication", label: "Communication", icon: "💬" },
  { id: "gaming",        label: "Gaming",        icon: "🎮" },
  { id: "security",      label: "Security",      icon: "🔒" },
  { id: "utilities",     label: "Utilities",     icon: "🔧" },
];

export const APPS = [
  // ── AI & Agents ───────────────────────────────────────────────
  { id:"claude-code",  name:"Claude Code",   icon:"🧠", desc:"Anthropic's AI coding agent. Primary Flux agent.",          category:"ai",           pkg:"@anthropic-ai/claude-code", pkgType:"npm",    featured:true,  installed:true  },
  { id:"opencode",     name:"OpenCode",      icon:"🔮", desc:"Multi-model agent — Claude, GPT, Gemini and more.",          category:"ai",           pkg:"opencode-ai",              pkgType:"npm",    featured:true,  installed:true  },
  { id:"ollama",       name:"Ollama",        icon:"🦙", desc:"Run AI models locally. Llama, Mistral, CodeLlama.",          category:"ai",           pkg:"ollama",                   pkgType:"pacman", featured:true,  installed:true  },
  { id:"lmstudio",     name:"LM Studio",     icon:"🖥️", desc:"GUI for downloading and running local AI models.",           category:"ai",           pkg:"lmstudio",                 pkgType:"aur",    featured:true,  installed:true  },
  { id:"open-webui",   name:"Open WebUI",    icon:"🌐", desc:"Browser chat UI for your local Ollama models.",              category:"ai",           pkg:"open-webui",               pkgType:"docker", featured:true,  installed:true  },
  { id:"voxtype",      name:"Voxtype",       icon:"🎙️", desc:"AI dictation — speak anywhere in any app.",                  category:"ai",           pkg:"voxtype",                  pkgType:"aur",    featured:false, installed:true  },
  { id:"gemini-cli",   name:"Gemini CLI",    icon:"♊", desc:"Google Gemini AI in your terminal.",                          category:"ai",           pkg:"@google/gemini-cli",        pkgType:"npm",    featured:false, installed:false },
  { id:"codex-cli",    name:"Codex CLI",     icon:"🤖", desc:"OpenAI Codex coding agent.",                                 category:"ai",           pkg:"@openai/codex",             pkgType:"npm",    featured:false, installed:false },
  { id:"copilot-cli",  name:"Copilot CLI",   icon:"🐙", desc:"GitHub Copilot in the terminal.",                            category:"ai",           pkg:"@github/copilot",           pkgType:"npm",    featured:false, installed:false },
  { id:"antigravity",  name:"Antigravity",   icon:"🚀", desc:"AI coding agent with multi-file editing.",                   category:"ai",           pkg:"antigravity-cli",           pkgType:"npm",    featured:false, installed:false },
  { id:"aider",        name:"Aider",         icon:"🛠️", desc:"AI pair programmer that edits code in your repo.",           category:"ai",           pkg:"aider-chat",                pkgType:"pip",    featured:false, installed:false },

  // ── Editors ───────────────────────────────────────────────────
  { id:"cursor",       name:"Cursor",        icon:"⚡", desc:"VS Code fork with AI built in. Best for AI-assisted coding.", category:"editors",      pkg:"cursor-bin",                pkgType:"aur",    featured:true,  installed:true  },
  { id:"vscode",       name:"VS Code",       icon:"💙", desc:"Microsoft's popular open source code editor.",               category:"editors",      pkg:"visual-studio-code-bin",    pkgType:"aur",    featured:true,  installed:true  },
  { id:"zed",          name:"Zed",           icon:"⚡", desc:"Fast, multiplayer code editor written in Rust.",              category:"editors",      pkg:"zed",                       pkgType:"aur",    featured:false, installed:false },
  { id:"neovim",       name:"Neovim",        icon:"💚", desc:"Hyperextensible Vim-based text editor.",                     category:"editors",      pkg:"neovim",                    pkgType:"pacman", featured:false, installed:false },
  { id:"vim",          name:"Vim",           icon:"🟢", desc:"The classic terminal text editor.",                          category:"editors",      pkg:"vim",                       pkgType:"pacman", featured:false, installed:false },
  { id:"helix",        name:"Helix",         icon:"🌀", desc:"Post-modern modal text editor.",                             category:"editors",      pkg:"helix",                     pkgType:"pacman", featured:false, installed:false },
  { id:"sublime",      name:"Sublime Text",  icon:"🟠", desc:"Sophisticated text editor for code. $99 license.",           category:"editors",      pkg:"sublime-text-4",            pkgType:"aur",    featured:false, installed:false },
  { id:"jetbrains",    name:"JetBrains",     icon:"🧠", desc:"Toolbox for JetBrains IDEs (IntelliJ, PyCharm, etc.)",      category:"editors",      pkg:"jetbrains-toolbox",         pkgType:"aur",    featured:false, installed:false },
  { id:"emacs",        name:"Emacs",         icon:"🟣", desc:"Extensible, self-documenting text editor.",                  category:"editors",      pkg:"emacs",                     pkgType:"pacman", featured:false, installed:false },

  // ── Browsers ──────────────────────────────────────────────────
  { id:"chrome",       name:"Chrome",        icon:"🌐", desc:"Google Chrome — fast, popular, great DevTools.",             category:"browsers",     pkg:"google-chrome",             pkgType:"aur",    featured:true,  installed:true  },
  { id:"firefox",      name:"Firefox",       icon:"🦊", desc:"Fast, private browser by Mozilla.",                         category:"browsers",     pkg:"firefox",                   pkgType:"pacman", featured:true,  installed:false },
  { id:"brave",        name:"Brave",         icon:"🦁", desc:"Privacy-focused browser with built-in ad block.",           category:"browsers",     pkg:"brave-bin",                 pkgType:"aur",    featured:true,  installed:false },
  { id:"chromium",     name:"Chromium",      icon:"🔵", desc:"Open source base of Chrome without Google services.",        category:"browsers",     pkg:"chromium",                  pkgType:"pacman", featured:false, installed:false },
  { id:"opera",        name:"Opera",         icon:"🔴", desc:"Feature-rich browser with built-in VPN.",                   category:"browsers",     pkg:"opera",                     pkgType:"aur",    featured:false, installed:false },
  { id:"vivaldi",      name:"Vivaldi",       icon:"🎵", desc:"Highly customizable browser for power users.",              category:"browsers",     pkg:"vivaldi",                   pkgType:"aur",    featured:false, installed:false },
  { id:"zen",          name:"Zen Browser",   icon:"🧘", desc:"Minimalist Firefox-based browser.",                         category:"browsers",     pkg:"zen-browser-bin",           pkgType:"aur",    featured:false, installed:false },
  { id:"librewolf",    name:"LibreWolf",     icon:"🐺", desc:"Privacy-hardened Firefox fork. No telemetry.",              category:"browsers",     pkg:"librewolf-bin",             pkgType:"aur",    featured:false, installed:false },

  // ── Terminals ─────────────────────────────────────────────────
  { id:"alacritty",    name:"Alacritty",     icon:"⚡", desc:"GPU-accelerated terminal. Fast and minimal.",               category:"terminals",    pkg:"alacritty",                 pkgType:"pacman", featured:true,  installed:true  },
  { id:"warp",         name:"Warp",          icon:"🌊", desc:"AI-native terminal with autocomplete and workflows.",        category:"terminals",    pkg:"warp-terminal",             pkgType:"aur",    featured:true,  installed:false },
  { id:"ghostty",      name:"Ghostty",       icon:"👻", desc:"Fast, feature-rich terminal built in Zig.",                 category:"terminals",    pkg:"ghostty",                   pkgType:"pacman", featured:false, installed:false },
  { id:"kitty",        name:"Kitty",         icon:"🐱", desc:"GPU-based terminal with tabs and splits.",                  category:"terminals",    pkg:"kitty",                     pkgType:"pacman", featured:false, installed:false },
  { id:"foot",         name:"Foot",          icon:"🦶", desc:"Lightweight Wayland-native terminal.",                      category:"terminals",    pkg:"foot",                      pkgType:"pacman", featured:false, installed:false },

  // ── Development ───────────────────────────────────────────────
  { id:"docker",       name:"Docker",        icon:"🐳", desc:"Container platform for building and running apps.",          category:"dev",          pkg:"docker",                    pkgType:"pacman", featured:true,  installed:true  },
  { id:"lazygit",      name:"Lazygit",       icon:"🦊", desc:"Terminal UI for git. Much nicer than raw git commands.",    category:"dev",          pkg:"lazygit",                   pkgType:"pacman", featured:true,  installed:true  },
  { id:"lazydocker",   name:"Lazydocker",    icon:"🐳", desc:"Terminal UI for Docker containers and images.",             category:"dev",          pkg:"lazydocker",                pkgType:"pacman", featured:false, installed:true  },
  { id:"bruno",        name:"Bruno",         icon:"🐶", desc:"Offline API client. Like Postman but local.",               category:"dev",          pkg:"bruno-bin",                 pkgType:"aur",    featured:true,  installed:true  },
  { id:"dbeaver",      name:"DBeaver",       icon:"🦫", desc:"Universal database GUI. PostgreSQL, MySQL, SQLite.",        category:"dev",          pkg:"dbeaver",                   pkgType:"aur",    featured:true,  installed:true  },
  { id:"nodejs",       name:"Node.js",       icon:"💚", desc:"JavaScript runtime. Installed via mise.",                   category:"dev",          pkg:"node@lts",                  pkgType:"mise",   featured:false, installed:true  },
  { id:"python",       name:"Python",        icon:"🐍", desc:"Python programming language. Installed via mise.",           category:"dev",          pkg:"python@latest",             pkgType:"mise",   featured:false, installed:true  },
  { id:"github-cli",   name:"GitHub CLI",    icon:"🐙", desc:"GitHub from the terminal. PRs, issues, repos.",             category:"dev",          pkg:"github-cli",                pkgType:"pacman", featured:false, installed:true  },
  { id:"postman",      name:"Postman",       icon:"📮", desc:"API testing platform. Requires account.",                   category:"dev",          pkg:"postman-bin",               pkgType:"aur",    featured:false, installed:false },
  { id:"insomnia",     name:"Insomnia",      icon:"😴", desc:"Open source API client.",                                   category:"dev",          pkg:"insomnia-bin",              pkgType:"aur",    featured:false, installed:false },

  // ── Productivity ──────────────────────────────────────────────
  { id:"obsidian",     name:"Obsidian",      icon:"💎", desc:"Knowledge base and note-taking with Markdown.",             category:"productivity", pkg:"obsidian",                  pkgType:"pacman", featured:true,  installed:true  },
  { id:"libreoffice",  name:"LibreOffice",   icon:"📄", desc:"Full office suite. Compatible with Word, Excel, PowerPoint.", category:"productivity", pkg:"libreoffice-fresh",       pkgType:"pacman", featured:false, installed:false },
  { id:"typora",       name:"Typora",        icon:"📝", desc:"Minimal Markdown writing app. $15 one-time.",              category:"productivity", pkg:"typora",                    pkgType:"aur",    featured:false, installed:false },
  { id:"localsend",    name:"LocalSend",     icon:"📡", desc:"AirDrop for all platforms — share files over local network.", category:"productivity", pkg:"localsend-bin",           pkgType:"aur",    featured:true,  installed:true  },
  { id:"kdeconnect",   name:"KDE Connect",   icon:"📱", desc:"Link your phone and desktop. Share clipboard, files, notifications.", category:"productivity", pkg:"kdeconnect", pkgType:"pacman", featured:true,  installed:true  },

  // ── Media ─────────────────────────────────────────────────────
  { id:"obs",          name:"OBS Studio",    icon:"🎥", desc:"Screen recording and live streaming.",                      category:"media",        pkg:"obs-studio",                pkgType:"pacman", featured:true,  installed:true  },
  { id:"gimp",         name:"GIMP",          icon:"🎨", desc:"Professional image editor. Free Photoshop alternative.",   category:"media",        pkg:"gimp",                      pkgType:"pacman", featured:true,  installed:true  },
  { id:"mpv",          name:"mpv",           icon:"▶️", desc:"Lightweight, powerful media player. Plays anything.",      category:"media",        pkg:"mpv",                       pkgType:"pacman", featured:false, installed:true  },
  { id:"kdenlive",     name:"Kdenlive",      icon:"🎬", desc:"Professional video editor.",                               category:"media",        pkg:"kdenlive",                  pkgType:"pacman", featured:false, installed:false },
  { id:"spotify",      name:"Spotify",       icon:"🎵", desc:"Music streaming. 100M+ songs.",                            category:"media",        pkg:"spotify",                   pkgType:"aur",    featured:true,  installed:true  },
  { id:"vlc",          name:"VLC",           icon:"🦺", desc:"Open source media player. Plays every format.",            category:"media",        pkg:"vlc",                       pkgType:"pacman", featured:false, installed:false },
  { id:"inkscape",     name:"Inkscape",      icon:"✒️", desc:"Professional vector graphics editor.",                     category:"media",        pkg:"inkscape",                  pkgType:"pacman", featured:false, installed:false },
  { id:"blender",      name:"Blender",       icon:"🧊", desc:"3D creation suite — modeling, animation, rendering.",      category:"media",        pkg:"blender",                   pkgType:"pacman", featured:false, installed:false },

  // ── Communication ─────────────────────────────────────────────
  { id:"discord",      name:"Discord",       icon:"💬", desc:"Voice, video, and text chat for communities.",              category:"communication", pkg:"discord",                  pkgType:"aur",    featured:true,  installed:true  },
  { id:"slack",        name:"Slack",         icon:"💼", desc:"Team messaging and collaboration. Web app.",               category:"communication", pkg:"",                         pkgType:"webapp", featured:true,  installed:true  },
  { id:"signal",       name:"Signal",        icon:"🔐", desc:"End-to-end encrypted private messaging.",                  category:"communication", pkg:"signal-desktop",           pkgType:"pacman", featured:false, installed:false },
  { id:"zoom",         name:"Zoom",          icon:"📹", desc:"Video conferencing. Web app.",                             category:"communication", pkg:"",                         pkgType:"webapp", featured:false, installed:true  },
  { id:"telegram",     name:"Telegram",      icon:"✈️", desc:"Fast, secure messaging app.",                              category:"communication", pkg:"telegram-desktop",         pkgType:"pacman", featured:false, installed:false },
  { id:"whatsapp",     name:"WhatsApp",      icon:"📱", desc:"WhatsApp Web app wrapper.",                                category:"communication", pkg:"",                         pkgType:"webapp", featured:false, installed:false },

  // ── Gaming ────────────────────────────────────────────────────
  { id:"steam",        name:"Steam",         icon:"🎮", desc:"Valve's gaming platform. Thousands of Linux games.",       category:"gaming",       pkg:"steam",                     pkgType:"pacman", featured:true,  installed:false },
  { id:"heroic",       name:"Heroic",        icon:"🦸", desc:"Epic Games and GOG launcher for Linux.",                   category:"gaming",       pkg:"heroic-games-launcher-bin", pkgType:"aur",    featured:true,  installed:false },
  { id:"lutris",       name:"Lutris",        icon:"🦦", desc:"Game manager. Runs Windows games via Wine/Proton.",        category:"gaming",       pkg:"lutris",                    pkgType:"pacman", featured:false, installed:false },
  { id:"retroarch",    name:"RetroArch",     icon:"🕹️", desc:"Multi-system emulator frontend.",                          category:"gaming",       pkg:"retroarch",                 pkgType:"pacman", featured:false, installed:false },
  { id:"moonlight",    name:"Moonlight",     icon:"🌙", desc:"Stream games from your gaming PC over network.",           category:"gaming",       pkg:"moonlight-qt",              pkgType:"pacman", featured:false, installed:false },
  { id:"bottles",      name:"Bottles",       icon:"🍾", desc:"Run Windows apps and games via Wine.",                     category:"gaming",       pkg:"bottles",                   pkgType:"pacman", featured:false, installed:false },

  // ── Security ──────────────────────────────────────────────────
  { id:"1password",    name:"1Password",     icon:"🔑", desc:"Password manager. Best-in-class security.",               category:"security",     pkg:"1password",                 pkgType:"aur",    featured:true,  installed:true  },
  { id:"bitwarden",    name:"Bitwarden",     icon:"🛡️", desc:"Open source password manager. Free.",                     category:"security",     pkg:"bitwarden",                 pkgType:"pacman", featured:true,  installed:true  },
  { id:"tailscale",    name:"Tailscale",     icon:"🌐", desc:"Mesh VPN. Securely connect all your devices.",            category:"security",     pkg:"tailscale",                 pkgType:"pacman", featured:false, installed:false },
  { id:"nordvpn",      name:"NordVPN",       icon:"🔒", desc:"VPN service with servers worldwide.",                     category:"security",     pkg:"nordvpn-bin",               pkgType:"aur",    featured:false, installed:false },

  // ── Utilities ─────────────────────────────────────────────────
  { id:"dolphin",      name:"Dolphin",       icon:"🐬", desc:"KDE file manager. Default in Flux.",                      category:"utilities",    pkg:"dolphin",                   pkgType:"pacman", featured:false, installed:true  },
  { id:"btop",         name:"Btop",          icon:"📊", desc:"Beautiful system resource monitor.",                      category:"utilities",    pkg:"btop",                      pkgType:"pacman", featured:false, installed:true  },
  { id:"yazi",         name:"Yazi",          icon:"🗂️", desc:"Blazing fast terminal file manager.",                     category:"utilities",    pkg:"yazi",                      pkgType:"pacman", featured:false, installed:true  },
  { id:"dropbox",      name:"Dropbox",       icon:"📦", desc:"Cloud file sync and backup.",                             category:"utilities",    pkg:"dropbox",                   pkgType:"aur",    featured:false, installed:false },
  { id:"windows-vm",   name:"Windows VM",    icon:"🪟", desc:"Run Windows in a virtual machine via QEMU/KVM.",          category:"utilities",    pkg:"",                          pkgType:"script", featured:false, installed:false },
];
