# Place in each assistant's global skills directory so the Flux skill is available on first install
mkdir -p ~/.agents/skills ~/.claude/skills ~/.codex/skills ~/.pi/agent/skills
ln -sfn "$FLUX_PATH/default/flux-skill" ~/.agents/skills/flux
ln -sfn "$FLUX_PATH/default/flux-skill" ~/.claude/skills/flux
ln -sfn "$FLUX_PATH/default/flux-skill" ~/.codex/skills/flux
ln -sfn "$FLUX_PATH/default/flux-skill" ~/.pi/agent/skills/flux
