# Building the Flux OS ISO

## Requirements

- Arch Linux machine (physical or VM)
- Root access
- 20GB+ free disk space
- Internet connection (downloads packages)
- ~30 minutes

## Quick Build

```bash
git clone https://github.com/Kikobuf/flux-os.git
cd flux-os
sudo ./build-iso.sh
```

The ISO will be in `out/flux-<version>-x86_64.iso`.

## Options

```bash
sudo ./build-iso.sh           # full build (recommended)
sudo ./build-iso.sh --fast    # skip dependency check
sudo ./build-iso.sh --clean   # clean temp build dirs
```

## Writing to USB

```bash
# Find your USB device
lsblk

# Write (replace sdX with your device — be careful!)
sudo dd if=out/flux-*.iso of=/dev/sdX bs=4M status=progress && sync
```

On Windows/macOS: use [balenaEtcher](https://etcher.balena.io/)

## GitHub Actions (Automated)

The `.github/workflows/build-iso.yml` workflow automatically builds and
publishes ISOs when you push a version tag:

```bash
git tag v0.2.0
git push origin v0.2.0
```

This triggers a build in GitHub Actions and creates a Release with the ISO attached.

## Build on a VM

If you don't have an Arch machine, you can build in a VM:

```bash
# Install Arch Linux in VirtualBox/VMware (20GB disk)
# Then inside the VM:
git clone https://github.com/Kikobuf/flux-os.git
cd flux-os
sudo ./build-iso.sh
# Copy the ISO out of the VM via shared folder
```

## Troubleshooting

**"archiso not found"** — the script installs it automatically, or run `sudo pacman -S archiso`

**Build fails on packages** — check internet connection, run `sudo pacman -Syu` first

**Out of disk space** — need 15GB+ free in /tmp, or set TMPDIR to a larger partition
