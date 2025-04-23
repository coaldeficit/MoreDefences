Events.on(ClientLoadEvent, () => {
  if (Core.settings.getBool("md3-autoupdate", true)) {
    Http.get("https://raw.githubusercontent.com/coaldeficit/MoreDefences/master/mod.hjson",
      (result) => {
        let response = result.getResultAsString()
        let jsonnery = Jval.read(response)
        if (Vars.mods.getMod("md3").meta.version != jsonnery.get('version')) {
          try {
            if (parseInt(jsonnery.get('minGameVersion')) <= parseInt(Vars.mods.getMod("md3").meta.minGameVersion)) {
              Vars.ui.showCustomConfirm("MoreDefences Update Available", "Would you like to download it and restart the game?\n\n[gray]Local version: " + Vars.mods.getMod("md3").meta.version + "\nUpdated version: " + jsonnery.get('version') + "[]", "OK", "Ignore",
                () => {
                  if (true == true) {
                    Vars.ui.mods.githubImportMod(
                      Vars.mods.locateMod("md3").getRepo(),
                      Vars.mods.locateMod("md3").isJava()
                    )
                    let shown = false;
                    Timer.schedule(() => {
                      if (Vars.mods.requiresReload() && !shown) {
                        shown = true;
                        Vars.ui.showInfoOnHidden("@mods.reloadexit",() => {Core.app.exit();})
                      }
                    }, 2, 2);
                  }
                },
              ()=>{})
            } else {
              Vars.ui.showCustomConfirm("MoreDefences Auto-Update Warning", "An update for MoreDefences is available, however it requires a newer version of the game.\nGo to Github download page for Mindustry?\n\n[gray]Local minimum game version: " + Vars.mods.getMod("md3").meta.minGameVersion + "\nUpdated minimum game version: " + jsonnery.get('minGameVersion') + "[]", "OK", "Ignore",
                () => {
                  if (parseInt(jsonnery.get('minGameVersion')) >= 20000) {
                    Core.app.openURI("https://github.com/Anuken/MindustryBuilds/releases")
                  } else {
                    Core.app.openURI("https://github.com/Anuken/Mindustry/releases")
                  }
                },
              ()=>{})
            }
          } catch (error) {
            Log.info("Error: " + error.toString());
          }
        }
        print(Vars.mods.getMod("md3").meta.version)
        print(jsonnery.get('version'))
      },(error) => {print("Failed to check MoreDefences update")}
    );
  };
});
