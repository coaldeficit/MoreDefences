Events.on(ClientLoadEvent, () => {
  if (Core.settings.getBool("md3-autoupdate", true)) {
    Http.get("https://raw.githubusercontent.com/coaldeficit/MoreDefences/master/mod.hjson",
      (result) => {
        let response = result.getResultAsString()
        let jsonnery = Jval.read(response)
        if (Vars.mods.getMod("md3").meta.version != jsonnery.get('version')) {
          try {
            Vars.ui.showCustomConfirm("MoreDefences Update Available", "Would you like to download it and restart the game?", "OK", "Ignore",
              () => {
                if (true == true) {
                  Vars.ui.mods.githubImportMod(
                    Vars.mods.locateMod("md3").getRepo(),
                    Vars.mods.locateMod("md3").isJava()
                  );
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
          } catch (error) {
            Log.info("Error: " + error.toString());
          }
        }
        //print(Vars.mods.getMod("md3").meta.version)
        //print(jsonnery.get('version'))
      },(error) => {print("Failed to check MoreDefences update")}
    );
  };
});
