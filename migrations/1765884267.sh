echo "Change to openai-codex instead of openai-codex-bin"

if flux-pkg-present openai-codex-bin; then
    flux-pkg-drop openai-codex-bin
    flux-pkg-add openai-codex
fi
