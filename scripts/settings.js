Events.on(ClientLoadEvent, () => {
  if (Core.settings.getString("md3-internal-settingsver") != "1") {
    switch (Core.settings.getString("md3-internal-settingsver")) {
      case "1":
        // update this part of the code when adding a new setting
        // there is a simpler, naive way to do it but it'd reset your md settings anytime we add new ones
        // therefore instead we have a settings version system that only updates new settings
        break
      default:
        // if there is no valid internal settings version, assume first time install and set everything to default
        Core.settings.put("md3-autoupdate", true)
        Core.settings.put("md3-loadshaders", !Vars.mobile)
        Core.settings.put("md3-forcecapturetoast", true)
        Core.settings.put("md3-guardianwarn", true)
        break
    }
    Core.settings.put("md3-internal-settingsver", "1")
  }
  Vars.ui.settings.addCategory(Core.bundle.get("setting.md3-config-title"), Icon.turret, cons((t) => {
    // V1
    t.checkPref("md3-autoupdate", true);
    t.checkPref("md3-loadshaders", !Vars.mobile);
    t.checkPref("md3-forcecapturetoast", true);
    t.checkPref("md3-guardianwarn", true);
    // V2
    // N/A (add new settings here after public release)
  }));
})