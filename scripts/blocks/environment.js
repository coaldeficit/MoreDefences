// fieros
let fierosCoreZone = extend(Floor, "fieros-core-zone", {});

let niebieskiteBoulder = extend(Prop, "niebieskite-boulder", {});
let niebieskite = extend(Floor, "niebieskite", {});
let hotNiebieskite = extend(Floor, "niebieskite-hot", {});
hotNiebieskite.attributes.set(Attribute.heat, 0.5);
let niebieskiteWall = extend(StaticWall, "niebieskite-wall", {});

let cinnabarBoulder = extend(Prop, "cinnabar-boulder", {});
let cinnabar = extend(Floor, "cinnabar", {});
let cinnabarWall = extend(StaticWall, "cinnabar-wall", {});

let lithimentBoulder = extend(Prop, "lithiment-boulder", {});
let lithiment = extend(Floor, "lithiment", {});
let lithimentWall = extend(StaticWall, "lithiment-wall", {});

let mercuricBoulder = extend(Prop, "mercuric-boulder", {});
let mercuricRock = extend(Floor, "mercuric-rock", {});
let mercuricWall = extend(StaticWall, "mercuric-wall", {});

let metacinnabarBoulder = extend(Prop, "metacinnabar-boulder", {});
let metacinnabar = extend(Floor, "metacinnabar", {});
let hotMetacinnabar = extend(Floor, "metacinnabar-hot", {});
hotMetacinnabar.attributes.set(Attribute.heat, 0.5);
let metacinnabarWall = extend(StaticWall, "metacinnabar-wall", {});

let pessegiteBoulder = extend(Prop, "pessegite-boulder", {});
let pessegite = extend(Floor, "pessegite", {});
let pessegiteWall = extend(StaticWall, "pessegite-wall", {});
let frozenMercury = extend(Floor, "frozen-mercury", {});

let sulfuricBoulder = extend(Prop, "sulfuric-boulder", {});
let sulfuricRock = extend(Floor, "sulfuric-rock", {});
let sulfuricRockDense = extend(Floor, "sulfuric-rock-dense", {});
let sulfuricVent = extend(SteamVent, "sulfuric-vent", {});
sulfuricVent.attributes.set(Attribute.heat, 0.5);
let sulfuricWall = extend(StaticWall, "sulfuric-wall", {});

let dimethyl = extend(Floor, "dimethyl", {});
let lithimentDMM = extend(Floor, "lithiment-dimethyl", {});
let lithimentDMMWall = extend(StaticWall, "lithiment-dimethyl-wall", {});
let cinnabarDMM = extend(Floor, "cinnabar-dimethyl", {});
let cinnabarDMMWall = extend(StaticWall, "cinnabar-dimethyl-wall", {});

// misc
let dioriteBoulder = extend(Prop, "diorite-boulder", {});
let diorite = extend(Floor, "diorite", {});
let dioriteWall = extend(StaticWall, "diorite-wall", {});

let graniteBoulder = extend(Prop, "granite-boulder", {});
let granite = extend(Floor, "granite", {});
let graniteWall = extend(StaticWall, "granite-wall", {});

let limestoneBoulder = extend(Prop, "limestone-boulder", {});
let limestone = extend(Floor, "limestone", {});
let limestoneWall = extend(StaticWall, "limestone-wall", {});

let tholinBoulder = extend(Prop, "tholin-boulder", {});
let tholin = extend(Floor, "tholin", {});
let tholinWall = extend(StaticWall, "tholin-wall", {});
let tholinWhiteBoulder = extend(Prop, "tholin-white-boulder", {});
let tholinWhite = extend(Floor, "tholin-white", {});
let tholinWhiteWall = extend(StaticWall, "tholin-white-wall", {});

module.exports = {
  // fieros
  fierosCoreZone: fierosCoreZone,
  
  niebieskiteBoulder: niebieskiteBoulder,
  niebieskite: niebieskite,
  hotNiebieskite: hotNiebieskite,
  niebieskiteWall: niebieskiteWall,
  
  cinnabarBoulder: cinnabarBoulder,
  cinnabar: cinnabar,
  cinnabarWall: cinnabarWall,
  
  lithimentBoulder: lithimentBoulder,
  lithiment: lithiment,
  lithimentWall: lithimentWall,
  
  mercuricBoulder: mercuricBoulder,
  mercuricRock: mercuricRock,
  mercuricWall: mercuricWall,
  
  metacinnabarBoulder: metacinnabarBoulder,
  metacinnabar: metacinnabar,
  hotMetacinnabar: hotMetacinnabar,
  metacinnabarWall: metacinnabarWall,
  
  pessegiteBoulder: pessegiteBoulder,
  pessegite: pessegite,
  pessegiteWall: pessegiteWall,
  frozenMercury: frozenMercury,
  
  sulfuricBoulder: sulfuricBoulder,
  sulfuricRock: sulfuricRock,
  sulfuricRockDense: sulfuricRockDense,
  sulfuricVent: sulfuricVent,
  sulfuricWall: sulfuricWall,
  
  dimethyl: dimethyl,
  lithimentDMM: lithimentDMM,
  lithimentDMMWall: lithimentDMMWall,
  cinnabarDMM: cinnabarDMM,
  cinnabarDMMWall: cinnabarDMMWall,
  
  // misc
  dioriteBoulder: dioriteBoulder,
  diorite: diorite,
  dioriteWall: dioriteWall,
  
  graniteBoulder: graniteBoulder,
  granite: granite,
  graniteWall: graniteWall,
  
  limestoneBoulder: limestoneBoulder,
  limestone: limestone,
  limestoneWall: limestoneWall,
  
  tholinBoulder: tholinBoulder,
  tholin: tholin,
  tholinWall: tholinWall,
  tholinWhiteBoulder: tholinWhiteBoulder,
  tholinWhite: tholinWhite,
  tholinWhiteWall: tholinWhiteWall,
};
