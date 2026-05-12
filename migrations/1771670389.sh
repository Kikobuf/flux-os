echo "Add Logout option to system menu"

flux-refresh-sddm

if [[ -f /etc/sddm.conf.d/autologin.conf ]]; then
  sudo sed -i 's/^Current=.*/Current=flux/' /etc/sddm.conf.d/autologin.conf
fi
