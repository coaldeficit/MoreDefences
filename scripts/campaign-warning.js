Events.on(ClientLoadEvent, () => {
  if (Core.settings.getString("md3-internal-campaignwarn") != "accepted") {
    let cause = ""
    if (SectorPresets.impact0078.unlocked()) cause += "Impact 0078 unlocked";
    if (Planets.serpulo.sectors.get(75).save instanceof Saves.SaveSlot) {
      if (cause.length == 0) {
        cause += "Serpulo 75 has save file"
      } else {
        cause += ", Serpulo 75 has save file"
      }
    }
    if (Planets.serpulo.sectors.get(112).save instanceof Saves.SaveSlot) {
      if (cause.length == 0) {
        cause += "Serpulo 112 has save file"
      } else {
        cause += ", Serpulo 112 has save file"
      }
    }
    if (Planets.erekir.sectors.get(63).save instanceof Saves.SaveSlot) {
      if (cause.length == 0) {
        cause += "Erekir 63 has save file"
      } else {
        cause += ", Erekir 63 has save file"
      }
    }
    //if (Planets.erekir.sectors.get(41).save instanceof Saves.SaveSlot) {
    //  if (cause.length == 0) {
    //    cause += "Lake has save file"
    //  } else {
    //    cause += ", Lake has save file"
    //  }
    //}
    if (SectorPresets.planetaryTerminal.unlocked()) {
      if (cause.length == 0) {
        cause += "Planetary Launch Terminal unlocked"
      } else {
        cause += ", Planetary Launch Terminal unlocked"
      }
    }
    if (SectorPresets.craters.sector.save instanceof Saves.SaveSlot) {
      if (cause.length == 0) {
        cause += "The Craters has save file"
      } else {
        cause += ", The Craters has save file"
      }
    }
    if (cause != "") Vars.ui.showOkText("MoreDefences Progression Alert", "Your campaign save data contains deep campaign progress or sector saves that conflict with new MoreDefences sectors.\n\nContinuing to play the mod like this is perfectly fine, however for the ideal MoreDefences experience we recommend starting over on a new save with MoreDefences.\n\nThis popup will never appear again.\n\n[gray]Cause: "+cause+".[]",()=>{})
    Core.settings.put("md3-internal-campaignwarn", "accepted")
  }
})
