# Set identification from install inputs
if [[ -n ${FLUX_USER_NAME//[[:space:]]/} ]]; then
  git config --global user.name "$FLUX_USER_NAME"
fi

if [[ -n ${FLUX_USER_EMAIL//[[:space:]]/} ]]; then
  git config --global user.email "$FLUX_USER_EMAIL"
fi
