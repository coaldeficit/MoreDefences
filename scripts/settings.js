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
      let disobedience = 0
      let disobedienceText = [
        "MoreDefences Beta is now installing, please wait and do not close the game or this message yet.",
        "Uh, i told you not to close this message.",
        "Powiedziałem aby nie zamykać tej wiadomości.",
        "...",
        "Dude.",
        "Do you not understand what \"Don't close this message\" means?",
        "How are you even reading this right now? Shouldn't the message saying the game will now close to reload mods already have appeared?",
        "Or is your device just that bad that you've been able to go through ALL this text and read it in time?",
        "My condolences if so, lol.",
        "Genuinely wondering if anyone who ever installs the beta will ever get to see this and read it.",
        "Or if people actually even install the beta for that matter.",
        "Do people know this mod has its own settings category?",
        "By the way, the code for this sequence of text used to be *so* bad.",
        "I mean just look at this shit.",
        "https://github.com/coaldeficit/MoreDefences/blob/2028b2f99ae0e4e611230fb5f581336f05d65254/scripts/settings.js",
        "Atrocious.",
        "If you can actually read this without looking at the settings.js file you either have a really shit device or a really good reading speed.",
        "I am impressed either way.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "Haha you probably skipped over this if you're clicking manually.",
        "Nice autoclicker btw.",
        "Nice autoclicker btw.",
        "(And reading everything.)",
        "Nice autoclicker btw.",
        "Buffer message.",
        "Ok you can stop spam clicking now.",
        "Hot take: Autoclickers aren't even cheating.",
        "Oh no, i can press a button with a short cooldown ever so slightly faster without breaking my fingers.",
        "Oh the humanity.",
        "Its only cheating if the game is poorly designed and lacks clicking cooldowns.",
        "Like clicker games.",
        "Or i guess this silly easter egg nobody will find.",
        "But thats technically not even a game so who cares.",
        "Check out my other projects btw.",
        "Like c-gon.",
        "https://coaldeficit.github.io/c-gon/",
        "How the hell are you reading this, if at all.",
        "Snooping through the code, are we?", // Of course you are. Lmao. Read this ingame no balls.
        "Because i refuse to believe it is possible for a device or network that can run this game to be *this* bad.",
        "That it takes so long to download 2 - 3 mb of data that you get to read this much text in the meantime.",
        "Did you know this text will loop eventually btw?",
        "This message was going to tell you how many times you've looped through this text.", // `You've seen this exact message ${Math.ceil(disobedience/disobedienceText.length)} time${(disobedience/disobedienceText.length > 1 ? "s" : "")}.`
        "Unfortunately mindustry's text display doesn't support the js feature i was gonna use for that.",
        "Xd.",
        "I wonder how many of the people who currently play this mod have played it while it wasn't owned by me.",
        "Obviously excluding the dev team.",
        "I have ran out of funny things to say and will now loop through my monologue.",
        "Or monolog.",
        "Idk.",
        "Anyways."
      ]
      function getNextDisobedienceText() {
        Vars.ui.showOkText("MoreDefences Beta Install", disobedienceText[disobedience%disobedienceText.length],()=>{
          disobedience++
          getNextDisobedienceText()
        })
      }
      function reinstall() {
        if (canReinstall) {
          canReinstall = false
          Reflect.invoke(Vars.ui.mods,"githubImportBranch",["beta",Vars.mods.locateMod("md3").getRepo(),null], java.lang.String,java.lang.String,java.lang.String)
          getNextDisobedienceText()
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