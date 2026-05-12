echo "Create Mako and Walker toggle configs"

mkdir -p ~/.local/state/flux/toggles
[[ -f ~/.local/state/flux/toggles/mako.ini ]] || touch ~/.local/state/flux/toggles/mako.ini
[[ -f ~/.local/state/flux/toggles/walker.css ]] || touch ~/.local/state/flux/toggles/walker.css
