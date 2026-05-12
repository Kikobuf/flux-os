FLUX_MIGRATIONS_STATE_PATH=~/.local/state/flux/migrations
mkdir -p $FLUX_MIGRATIONS_STATE_PATH

for file in ~/.local/share/flux/migrations/*.sh; do
  touch "$FLUX_MIGRATIONS_STATE_PATH/$(basename "$file")"
done
