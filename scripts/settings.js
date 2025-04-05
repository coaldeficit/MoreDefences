let canReinstall = true
Events.on(ClientLoadEvent, () => {
  if (Core.settings.getString("md3-internal-settingsver") != "2") {
    switch (Core.settings.getString("md3-internal-settingsver")) {
      case "1":
        Core.settings.put("md3-internal-betawarning", false)
      case "2":
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
        Core.settings.put("md3-internal-betawarning", false)
        break
    }
    Core.settings.put("md3-internal-settingsver", "2")
  }
  Vars.ui.settings.addCategory(Core.bundle.get("setting.md3-config-title"), Icon.turret, cons((t) => {
    // V1
    t.checkPref("md3-autoupdate", true);
    t.checkPref("md3-loadshaders", !Vars.mobile);
    t.checkPref("md3-forcecapturetoast", true);
    t.checkPref("md3-guardianwarn", true);
    // V2
    // N/A (add new settings here after public release)
    // BETA BUTTON
    t.row()
    t.button("Reinstall Beta", ()=>{
      function reinstall() {
        if (canReinstall) {
          canReinstall = false
          Reflect.invoke(Vars.ui.mods,"githubImportBranch",["beta",Vars.mods.locateMod("md3").getRepo(),null], java.lang.String,java.lang.String,java.lang.String)
          Vars.ui.showOkText("MoreDefences Beta Install", "MoreDefences Beta is now installing, please wait and do not close the game or this message yet.",()=>{
            Vars.ui.showOkText("MoreDefences Beta Install", "Uh, i told you not to close this message.",()=>{
              Vars.ui.showOkText("MoreDefences Beta Install", "Powiedziałem aby nie zamykać tej wiadomości.",()=>{
                Vars.ui.showOkText("MoreDefences Beta Install", "...",()=>{
                  Vars.ui.showOkText("MoreDefences Beta Install", "Dude.",()=>{
                    Vars.ui.showOkText("MoreDefences Beta Install", "Do you not understand what \"Don't close this message\" means?",()=>{
                      Vars.ui.showOkText("MoreDefences Beta Install", "How are you even reading this right now? Shouldn't the message saying the game will now close to reload mods already have appeared?",()=>{
                        Vars.ui.showOkText("MoreDefences Beta Install", "...",()=>{
                          Vars.ui.showOkText("MoreDefences Beta Install", "Fine.",()=>{
                            Vars.ui.showOkText("MoreDefences Beta Install", "I give up.",()=>{
                              Vars.ui.showOkText("MoreDefences Beta Install", "You win.",()=>{
                                Vars.ui.showOkText("MoreDefences Beta Install", "Gg.",()=>{
                                  Vars.ui.showOkText("MoreDefences Beta Install", "Good game.",()=>{
                                    Vars.ui.showOkText("MoreDefences Beta Install", "I take the L.",()=>{
                                      Vars.ui.showOkText("MoreDefences Beta Install", "The victory is yours.",()=>{
                                        Vars.ui.showOkText("MoreDefences Beta Install", "I lose.",()=>{
                                          Vars.ui.showOkText("MoreDefences Beta Install", "...",()=>{
                                            Vars.ui.showOkText("MoreDefences Beta Install", "......",()=>{
                                              Vars.ui.showOkText("MoreDefences Beta Install", "Bro.",()=>{
                                                Vars.ui.showOkText("MoreDefences Beta Install", "How the hell are you even reading this right now?",()=>{
                                                  // Snooping in the source code are we? lol
                                                })
                                              })
                                            })
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
          let shown = false;
          Timer.schedule(() => {
            if (Vars.mods.requiresReload() && !shown) {
              shown = true;
              Vars.ui.showInfoOnHidden("@mods.reloadexit",() => {Core.app.exit();})
            }
          }, 2, 2);
        }
      }
      if (!Core.settings.getBool("md3-internal-betawarning")) {
        Vars.ui.showCustomConfirm("MoreDefences Beta Install Warning", "Are you ABSOLUTELY SURE you want to install the beta version of MoreDefences?\nWhile it may contain new content, it may also contain new bugs, aswell as things that may run you the risk of corrupting or losing your save file.\n\nIf you proceed, you can return to the latest stable version by reinstalling the mod from the Mods menu, or via Auto-Update if its enabled and appears for you.","I know what im doing","NOPENOPENOPE",()=>{
          Core.settings.put("md3-internal-betawarning", true)
          reinstall()
        },()=>{})
      } else {
        reinstall()
      }
    }).margin(14).width(240).pad(6)
    t.row()
  }));
})
