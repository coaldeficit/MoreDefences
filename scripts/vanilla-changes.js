const vfx = require("md3/libs/vfx")
const rng = require("md3/libs/rng")

// AMMO
let blastFuse = extend(ShrapnelBulletType, {
  length: Blocks.fuse.range+10+38,
  ammoMultiplier: 6,
  damage: 163,
  reloadMultiplier: 0.8,
  serrationLenScl: 13.8,
  toColor: Color.valueOf("FF795E"),
  rangeChange: 38,
  shootEffect: vfx.blastFuseShoot,
  smokeEffect: vfx.blastFuseShoot,
  status: StatusEffects.blasted,
})
Blocks.fuse.ammoTypes.put(
  Items.blastCompound, blastFuse
);
let surgeSpectre = extend(BasicBulletType, {
  speed: 9,
  lifetime: 30,
  damage: 116,
  hitSize: 5,
  width: 17,
  height: 25,
  shootEffect: Fx.shootBig,
  knockback: 1.6,
  ammoMultiplier: 6,
  lightning: 3,
  lightningLength: 9,
  lightningDamage: 12,
  status: StatusEffects.shocked,
  frontColor: Pal.surge,
  backColor: Color.valueOf("#c7b55d")
})
Blocks.spectre.ammoTypes.put(
  Items.surgeAlloy, surgeSpectre
);
let phaseForeshadow = extend(RailBulletType, {
  shootEffect: Fx.instShoot,
  hitEffect: Fx.instHit,
  pierceEffect: Fx.railHit,
  smokeEffect: Fx.smokeCloud,
  pointEffect: vfx.phaseForeshadowTrail,
  despawnEffect: Fx.instBomb,
  pointEffectSpace: 20,
  damage: 2650,
  buildingDamageMultiplier: 0.1,
  maxDamageFraction: 0.4,
  pierceDamageFactor: 1,
  length: Blocks.foreshadow.range-80,
  hitShake: 8,
  ammoMultiplier: 1,
  status: StatusEffects.overclock,
  statusDuration: 600,
  rangeChange: -80,
})
Blocks.foreshadow.ammoTypes.put(
  Items.phaseFabric, phaseForeshadow
);

// ITS STRICTLY PERSONAL
UnitTypes.flare.itemCapacity = 6
UnitTypes.horizon.itemCapacity = 0 // already 0 in vanilla but just in case it gets increased
UnitTypes.zenith.itemCapacity = 0
UnitTypes.antumbra.itemCapacity = 30
UnitTypes.eclipse.itemCapacity = 70
UnitTypes.poly.itemCapacity = 20
UnitTypes.mega.itemCapacity = 40
UnitTypes.quad.itemCapacity = 80
UnitTypes.oct.itemCapacity = 140

// UNIT BLOCK HEALING REBALANCE
UnitTypes.vela.weapons.get(0).bullet.healPercent = 3.5 // vela is a sad and worthless healer in vanilla. 5.40845070423% heal per second per block bruh...
UnitTypes.corvus.weapons.get(0).bullet.healPercent = 33.3334 // corvus is a burst healer for when you desperately need health and lots of it Right Fucking Now, this should make it more viable as such
UnitTypes.quad.weapons.get(0).bullet.healPercent = 6 // on the opposite end of the spectrum quad is just fucking overpowered for this
for (let i=0;i<4;i++) { 
  UnitTypes.navanax.weapons.get(i).bullet.healPercent = 1.6 // navanax is a weird case since the lasers are just as pathetic as vela (and also like never actually attempt to heal at all)...
}
UnitTypes.navanax.weapons.get(4).bullet.healPercent = 8 // ...whereas the main gun's bullet is literally just a direct upgrade to quad healing

// i dont get this
UnitTypes.mega.isEnemy = true

// VANILLA UNIT IMMUNITIES
UnitTypes.nova.immunities.add(StatusEffects.electrified) // suggested by sh1p, thought it was a fun idea since i want to add a turret that applies electrified in the future
UnitTypes.pulsar.immunities.add(StatusEffects.electrified)
UnitTypes.quasar.immunities.add(StatusEffects.electrified)
UnitTypes.vela.immunities.add(StatusEffects.electrified)
UnitTypes.corvus.immunities.add(StatusEffects.electrified)
UnitTypes.retusa.immunities.add(StatusEffects.electrified) // incase you cant use the nova unit line for some reason but have access to navals
UnitTypes.oxynoe.immunities.add(StatusEffects.electrified)
UnitTypes.cyerce.immunities.add(StatusEffects.electrified)
UnitTypes.aegires.immunities.add(StatusEffects.electrified)
UnitTypes.navanax.immunities.add(StatusEffects.electrified)
UnitTypes.mono.immunities.add(StatusEffects.electrified) // screw it lets also make mono immune for consistency sounds funny
UnitTypes.poly.immunities.add(StatusEffects.electrified)
UnitTypes.mega.immunities.add(StatusEffects.electrified)
UnitTypes.quad.immunities.add(StatusEffects.electrified)
UnitTypes.oct.immunities.add(StatusEffects.electrified)

function getMDUnit(unit) {return Vars.content.getByName(ContentType.unit, "md3-" + unit)}
function getModUnit(mod, unit) {return Vars.content.getByName(ContentType.unit, mod + "-" + unit)}

// NUMBERED WAVEGEN
function numberedWaves(sector,enemyBase,airOnly,navalWaves) {
  rng.setIndex(sector.id)
  let groundenemies = [
    [UnitTypes.dagger,UnitTypes.mace,UnitTypes.fortress,UnitTypes.scepter,UnitTypes.reign],
    [UnitTypes.crawler,UnitTypes.atrax,UnitTypes.spiroct,UnitTypes.arkyid,UnitTypes.toxopid],
    [UnitTypes.nova,UnitTypes.pulsar,UnitTypes.quasar,UnitTypes.vela,UnitTypes.corvus]
  ]
  if (Planets.serpulo.sectors.get(212).info.wasCaptured) groundenemies.push([getMDUnit("shotgunner-mech"),getMDUnit("pounder-mech"),getMDUnit("slugger-mech"),getMDUnit("rocketeer-mech"),getMDUnit("blitz-mech")])
  let airenemies = [
    [UnitTypes.flare,UnitTypes.horizon,UnitTypes.zenith,UnitTypes.antumbra,UnitTypes.eclipse],
    [UnitTypes.flare,UnitTypes.poly,UnitTypes.mega,UnitTypes.quad,UnitTypes.oct]
  ]
  if (Planets.serpulo.sectors.get(268).info.wasCaptured) airenemies.push([getMDUnit("flocker-ship"),getMDUnit("bee-ship"),getMDUnit("hornet-ship"),getMDUnit("messenger-ship"),getMDUnit("tundra-ship")])
  if (enemyBase) {
    airenemies[1][4] = UnitTypes.eclipse
  }
  let navalenemies = [
    [UnitTypes.risso,UnitTypes.minke,UnitTypes.bryde,UnitTypes.sei,UnitTypes.omura],
    [UnitTypes.retusa,UnitTypes.oxynoe,UnitTypes.cyerce,UnitTypes.aegires,UnitTypes.navanax]
  ]
  if (Planets.serpulo.sectors.get(268).info.wasCaptured) navalenemies.push([getMDUnit("mycena-boat"),getMDUnit("panaeolus-boat"),getMDUnit("agaricus-boat"),getMDUnit("macrocybe-boat"),getMDUnit("armillaria-boat")])
      
  // mod compat shenanigans, listed by order of addition to this
    // if you're a mod dev and want compat with this, ping me on discord and i'll try to see what i can do
  // uaw
  if (Vars.mods.getMod("uaw") != null) {
    groundenemies.push([UnitTypes.dagger,UnitTypes.mace,getModUnit("uaw","cavalier"),getModUnit("uaw","centurion"),getModUnit("uaw","caernarvon")])
    airenemies = airenemies.concat([
      [UnitTypes.flare,UnitTypes.horizon,getModUnit("uaw","aglovale"),getModUnit("uaw","bedivere"),getModUnit("uaw","calogrenant")],
      [UnitTypes.flare,UnitTypes.horizon,getModUnit("uaw","crotchety"),getModUnit("uaw","cantankerous"),getModUnit("uaw","calogrenant")],
    ])
    navalenemies = navalenemies.concat([
      [UnitTypes.risso,UnitTypes.minke,getModUnit("uaw","arquebus"),getModUnit("uaw","carronade"),getModUnit("uaw","falconet")],
      [UnitTypes.risso,UnitTypes.minke,getModUnit("uaw","megaera"),getModUnit("uaw","alecto"),UnitTypes.omura],
    ])
  }
  // project restoration
  if (Vars.mods.getMod("restored-mind") != null) {
    groundenemies = groundenemies.concat([
      [getModUnit("restored-mind","dagger"),getModUnit("restored-mind","titan"),getModUnit("restored-mind","fortress"),getModUnit("restored-mind","chaos-array"),getModUnit("restored-mind","eradicator")],
      [getModUnit("restored-mind","crawler"),getModUnit("restored-mind","eruptor"),getModUnit("restored-mind","fortress"),getModUnit("restored-mind","chaos-array"),getModUnit("restored-mind","eradicator")],
    ])
    airenemies.push([getModUnit("restored-mind","wraith"),getModUnit("restored-mind","ghoul"),getModUnit("restored-mind","revenant"),getModUnit("restored-mind","lich"),getModUnit("restored-mind","reaper")])
  }
  
  let picks = []
  picks = picks.concat(airenemies)
  if (!airOnly && Vars.spawner.firstSpawn != null) {
    picks = picks.concat(navalWaves?navalenemies:groundenemies)
  }
  rng.setIndex(sector.id*(22+picks.length))
  let mainLines = []
  for (let i=0;i<Math.min(picks.length,4);i++) {
    let line = -1
    do {
      line = Math.floor(picks.length*(rng.randomUnsynced()/1000))
    } while (mainLines.includes(line))
    mainLines.push(line)
  }
  function createSpawnGroup(pickunit) {
    let o = new SpawnGroup(pickunit.type)
    Object.keys(pickunit).forEach(function(prop){
      if (prop != 'type') o[prop] = pickunit[prop]
    })
    return o
  }
  let waves = new Seq()
  let settings = {
    evolveInterval: (2.18-sector.threat)*4,
    tierOffset: sector.threat > 0.6 ? 1 : 0,
    maxTier: Math.min(Math.max(1,Math.ceil((sector.threat-0.33)*5)),4),
    unitScaling: 2.18 - sector.threat
  }
  let mainLineIndex = 0
  function generateUnitLine(index,startWave) {
    let wave = startWave
    let endWave = startWave + settings.evolveInterval + (settings.evolveInterval*(rng.randomUnsynced()/1000))
    let spawnPick = -1
    for (let i=settings.tierOffset;i<Math.min(settings.maxTier+1,3);i++) {
      if (!enemyBase && Vars.spawner.spawns.size > 1) spawnPick = Vars.spawner.spawns.get(Math.floor(Vars.spawner.spawns.size*(rng.randomUnsynced()/1000))).pos()
      waves.add(createSpawnGroup({
        type: picks[mainLines[index]][i],
        begin: wave,
        end: endWave,
        unitScaling: settings.unitScaling*(enemyBase?(picks[mainLines[index]][i].flying?Vars.spawner.countFlyerSpawns():Vars.spawner.countGroundSpawns()):1),
        unitAmount: 1,
        spacing: i-settings.tierOffset ? 2 : 1,
        spawn: spawnPick,
      }))
      waves.add(createSpawnGroup({
        type: picks[mainLines[index]][i],
        begin: endWave+1,
        unitScaling: settings.unitScaling*4*(picks[mainLines[index]][i].flying?Vars.spawner.countFlyerSpawns():Vars.spawner.countGroundSpawns()),
        unitAmount: Math.ceil(((((endWave-wave)/settings.unitScaling)/(i-settings.tierOffset ? 2 : 1))/2)/(enemyBase?(picks[mainLines[index]][i].flying?Vars.spawner.countFlyerSpawns():Vars.spawner.countGroundSpawns()):1)),
        spacing: 1,
      }))
      wave = endWave - 1
      endWave += settings.evolveInterval + (settings.evolveInterval*(rng.randomUnsynced()/1000))
    }
    if (!enemyBase && Vars.spawner.spawns.size > 1) spawnPick = Vars.spawner.spawns.get(Math.floor(Vars.spawner.spawns.size*(rng.randomUnsynced()/1000))).pos()
    if (settings.maxTier > 2) {
      wave = endWave + 6 + (settings.evolveInterval*(rng.randomUnsynced()/1000))
      waves.add(createSpawnGroup({ // non-guardian t4s
        type: picks[mainLines[index]][3],
        begin: wave,
        unitScaling: 1.5,
        unitAmount: 1,
        spacing: 3,
        spawn: spawnPick,
      }))
      wave += settings.evolveInterval + (settings.evolveInterval*(rng.randomUnsynced()/1000))
    }
    if (!enemyBase && Vars.spawner.spawns.size > 1) spawnPick = Vars.spawner.spawns.get(Math.floor(Vars.spawner.spawns.size*(rng.randomUnsynced()/1000))).pos()
    if (settings.maxTier > 3) {
      wave += 11 + (settings.evolveInterval*(rng.randomUnsynced()/1000))
      waves.add(createSpawnGroup({ // non-guardian t5s
        type: picks[mainLines[index]][4],
        begin: wave,
        unitScaling: 1.5,
        unitAmount: 1,
        spacing: 4,
        spawn: spawnPick,
      }))
      wave += settings.evolveInterval + (settings.evolveInterval*(rng.randomUnsynced()/1000))
    }
  }
  for (let i=0;i<mainLines.length;i++) {
    generateUnitLine(i, i * (settings.evolveInterval + (settings.evolveInterval*(rng.randomUnsynced()/1000))))
  }
  if (sector.threat > 0.25 && !enemyBase) {
    let spawnPick = -1
    if (settings.maxTier < 3) {
      if (!enemyBase && Vars.spawner.spawns.size > 1) spawnPick = Vars.spawner.spawns.get(Math.floor(Vars.spawner.spawns.size*(rng.randomUnsynced()/1000))).pos()
      waves.add(createSpawnGroup({
        type: picks[mainLines[0]][settings.maxTier+1],
        begin: Vars.state.rules.winWave-2,
        unitScaling: 1,
        unitAmount: 1,
        spacing: Math.max(Vars.state.rules.winWave/2,18),
        effect: StatusEffects.boss,
        spawn: spawnPick,
      }))
    } else {
      if (!enemyBase && Vars.spawner.spawns.size > 1) spawnPick = Vars.spawner.spawns.get(Math.floor(Vars.spawner.spawns.size*(rng.randomUnsynced()/1000))).pos()
      waves.add(createSpawnGroup({
        type: picks[mainLines[0]][settings.maxTier],
        begin: (Vars.state.rules.winWave/2)-2,
        unitScaling: 0.4,
        unitAmount: 1,
        spacing: Vars.state.rules.winWave,
        effect: StatusEffects.boss,
        spawn: spawnPick,
      }))
      if (!enemyBase && Vars.spawner.spawns.size > 1) spawnPick = Vars.spawner.spawns.get(Math.floor(Vars.spawner.spawns.size*(rng.randomUnsynced()/1000))).pos()
      if (settings.maxTier != 4) {
        waves.add(createSpawnGroup({
          type: picks[mainLines[0]][Math.min(settings.maxTier+1,4)],
          begin: Vars.state.rules.winWave-2,
          unitScaling: 0.7,
          unitAmount: 1,
          spacing: Vars.state.rules.winWave,
          effect: StatusEffects.boss,
          spawn: spawnPick,
        }))
      } else {
        let spawnOct = mainLines.includes(1)
        let offset = (mainLines[1] == 1)+1
        if (!enemyBase && Vars.spawner.spawns.size > 1) spawnPick = Vars.spawner.spawns.get(Math.floor(Vars.spawner.spawns.size*(rng.randomUnsynced()/1000))).pos()
        waves.add(createSpawnGroup({
          type: picks[mainLines[Math.min(offset,mainLines.length-1)]][settings.maxTier],
          begin: Vars.state.rules.winWave-2,
          unitScaling: 0.4/(1+spawnOct),
          unitAmount: 3-spawnOct,
          spacing: Vars.state.rules.winWave,
          effect: StatusEffects.boss,
          spawn: spawnPick,
        }))
        if (!enemyBase && Vars.spawner.spawns.size > 1) spawnPick = Vars.spawner.spawns.get(Math.floor(Vars.spawner.spawns.size*(rng.randomUnsynced()/1000))).pos()
        waves.add(createSpawnGroup({
          type: picks[mainLines[Math.min(1+offset,mainLines.length-1)]][settings.maxTier],
          begin: Vars.state.rules.winWave-2,
          unitScaling: 0.4,
          unitAmount: 2,
          spacing: Vars.state.rules.winWave,
          effect: StatusEffects.boss,
          spawn: spawnPick,
        }))
        if (spawnOct) {
          waves.add(createSpawnGroup({
            type: UnitTypes.oct,
            begin: Vars.state.rules.winWave-2,
            unitScaling: 0.6*Vars.spawner.countFlyerSpawns(),
            unitAmount: 1,
            spacing: Vars.state.rules.winWave,
            effect: StatusEffects.boss,
          }))
        }
      }
    }
  } else if (enemyBase) {
    let spacing = Math.min(Math.floor(50-(sector.threat*31)),30)
    let type = mainLines[0] == 1 && settings.maxTier >= 3 ? picks[mainLines[1]] : picks[mainLines[0]]
    waves.add(createSpawnGroup({
      type: type[Math.min(settings.maxTier+1,4)],
      begin: spacing-2,
      unitScaling: 1,
      unitAmount: 1,
      spacing: spacing,
      effect: StatusEffects.boss
    }))
    if (settings.maxTier == 4) {
      waves.add(createSpawnGroup({
        type: UnitTypes.oct,
        begin: spacing-2,
        unitScaling: 1,
        unitAmount: 1,
        spacing: spacing,
        effect: StatusEffects.boss
      }))
    }
  }
  return waves
}

// SERPULO GENERATOR
let basegen = new BaseGenerator()
Planets.serpulo.generator = extend(SerpuloPlanetGenerator, {
  basegen: basegen,
  /*generate(tiles,sec,seed) { // yeah this aint happening
    this.super.super$generate(tiles,sec,seed)
    const removeTit = [
      63,170,171,175,180,218,219, // g0 area
      222,146, // ff area
      71,188,189,193,241, // craters area
      141,162, // bsf area
      176, // misc
    ]
    const removeThor = [
      124,125,180,218, // g0 area
      71,131,241,127, // craters area
      162, // bsf area
    ]
    let tlen = tiles.width * tiles.height
    for (let i=0;i<tlen;i++) {
      let tile = tiles.geti(i)
      if (removeTit.includes(Vars.state.rules.sector.id) && tile.overlay() == Blocks.oreTitanium) {
        tile.clearOverlay()
      }
      if (removeThor.includes(Vars.state.rules.sector.id) && tile.overlay() == Blocks.oreThorium) {
        tile.clearOverlay()
      }
    }
  },*/
  postGenerate(tiles) {
    let curTile = Vars.spawner.getFirstSpawn()
    let tiles = []
    let core = Vars.indexer.getEnemy(Team.crux,BlockFlag.core).get(0).tile
    let distance = Infinity
    if (curTile != null) {
      do {
        tiles.push(curTile)
        curTile = Vars.pathfinder.getTargetTile(curTile,Vars.pathfinder.getField(Team.crux,Vars.pathfinder.costNaval,Vars.pathfinder.fieldCore))
      } while (!tiles.includes(curTile) && tiles.length < 1000)
      if (tiles.length >= 10) {
        let endTile = tiles[tiles.length-1]
        distance = Math.max(Math.abs(endTile.x-core.x),Math.abs(endTile.y-core.y))
      }
    }
    if (distance > 20) {
      Vars.state.rules.spawns = numberedWaves(Vars.state.rules.sector,Vars.state.rules.sector.hasEnemyBase(),false,false)
      //print(Vars.state.rules.sector.id + ' not naval, distance: ' + distance) // debug
    } else {
      Vars.state.rules.spawns = numberedWaves(Vars.state.rules.sector,Vars.state.rules.sector.hasEnemyBase(),false,true)
      //print(Vars.state.rules.sector.id + ' NAVAL, distance: ' + distance) // debug
    }
    if (Vars.state.rules.sector.hasEnemyBase()) {
      basegen.postGenerate()
      if (!Vars.spawner.countGroundSpawns()) {
        Vars.state.rules.spawns = numberedWaves(Vars.state.rules.sector,true,true,false)
      }
    }
    if (Vars.state.rules.sector.threat >= 0.5) Vars.state.rules.airUseSpawns = true
  }
})

// FORCE SECTOR DIFFICULY
function forceSectorDifficulty() {
  for (let i=0;i<Planets.serpulo.sectors.size;i++) {
    let sect = Planets.serpulo.sectors.get(i)
    if (sect.preset != null) {
      if (sect.preset.requireUnlock != true && sect.preset.isModded() && sect.preset.minfo.mod.name == 'md3') sect.threat = sect.preset.difficulty/10
      continue
    }
    if (Simplex.noise3d(Planets.serpulo.sectorSeed, 2, 0.5, 1, sect.tile.v.x, sect.tile.v.y, sect.tile.v.z)*0.5+Math.abs(sect.tile.v.y) <= 0.325) { // give Coal Deficit sectors no difficulty at all
      sect.threat = 0.2 // these sectors being medium threat is a waste of time
      continue
    }
    if (sect.threat < 0.38) sect.threat = 0.38 // if you're gonna make low threat sectors extinct atleast make the medium threat sectors in their place actually proper medium threat
    let dontfuckingbuff = [199]
    if (!dontfuckingbuff.includes(sect.id) && !sect.generateEnemyBase) {
      if (Simplex.noise3d(Planets.serpulo.sectorSeed, 2, 0.5, 1, sect.tile.v.x+2, sect.tile.v.y, sect.tile.v.z)*0.5+Math.abs(sect.tile.v.y) > 0.91) { // give thorium sectors extra difficulty
        sect.threat += 0.09
      } else {
        if (sect.id % 2 == 1) sect.threat += 0.09 // make odd numbered sectors a little harder
      }
    }
  }
}

// REMAP VANILLA SECTORS
let vanillaSectorRemap = {
  // SERPULO
  groundZero: 220,
  saltFlats: 98,
  testingGrounds: 3,
  frozenForest: 86,
  biomassFacility: 81,
  taintedWoods: 221,
  craters: 241,
  ruinousShores: 213,
  seaPort: 47,
  facility32m: 175,
  windsweptIslands: 242,
  stainedMountains: 20,
  extractionOutpost: 37,
  polarAerodrome: 68,
  coastline: 108,
  weatheredChannels: 217,
  navalFortress: 216,
  frontier: 50,
  fungalPass: 21,
  infestedCanyons: 210,
  atolls: 1,
  mycelialBastion: 261,
  overgrowth: 134,
  tarFields: 23,
  impact0078: 227,
  desolateRift: 123,
  nuclearComplex: 130,
  planetaryTerminal: 93,
  geothermalStronghold: 264,
  cruxscape: 54,
  
  // EREKIR
  onset: 10,
  aegis: 88,
  lake: 41,
  intersect: 36,
  atlas: 14,
  split: 19,
  basin: 29,
  marsh: 25,
  peaks: 30,
  ravine: 39,
  "caldera-erekir": 43,
  stronghold: 18,
  crevice: 3,
  siege: 58,
  crossroads: 37,
  karst: 5,
  origin: 12,
}
if (Version.build != 149) {
  for (let i=0;i<Vars.content.sectors().size;i++) {
    let sect = Vars.content.sectors().get(i)
    if (sect.isModded()) break // only care for vanilla sectors
    if (sect.sector.preset == sect) sect.sector.preset = null
    let swap = vanillaSectorRemap[sect.name] != null ? vanillaSectorRemap[sect.name] : sect.originalPosition
    sect.originalPosition = sect.sector.id
    sect.sector = sect.planet.sectors.get(swap)
    sect.planet.preset(sect.sector.id,sect)
  }
}
Planets.serpulo.startSector = SectorPresets.groundZero.sector.id
// HIDDEN SECTORS
let mdHiddenSectors = [
  //[199,"199old",65,10],
  //[157,"157md",0,2],
]
let hiddenSectArray = []
for (let i=0;i<mdHiddenSectors.length;i++) {
  let sect = new SectorPreset(mdHiddenSectors[i][1], Planets.serpulo, mdHiddenSectors[i][0])
  sect.requireUnlock = false
  sect.captureWave = mdHiddenSectors[i][2]
  sect.difficulty = mdHiddenSectors[i][3]
  hiddenSectArray.push(sect)
}
// ON CLIENT LOAD
Events.on(ClientLoadEvent, e => {
  // FUCK OFF MOUNTAIN ICON
  for (let i=0;i<hiddenSectArray.length;i++) {
    hiddenSectArray[i].uiIcon = Core.atlas.find("md3-sector-md3-hidden")
    hiddenSectArray[i].sector.threat = hiddenSectArray[i].difficulty/10
  }
  // WIPE ALL NUMBERED BASES
  for (let i=0;i<272;i++){
    Planets.serpulo.sectors.get(i).generateEnemyBase = false
  }
  
  // NUMBERED ENEMY BASES
  const convertToBase = [
    63,124, // g0/deso/32m area
    10, // ff/tw/tf area
    19,84,194,198,229, // 199 must be funny
    25,66,68,126,128,225,232,233,234,235, // north pole
    28,29,30,53,57,58,60,79,80,117,118,120,139,250,255,257,258,259, // south pole
    2,11,148,149,157,182, // windswept area
    32,33,34,36,92,94, // plt area
    31,38,56,132,133, // scourged rivers area
  ]
  for (let i=0;i<convertToBase.length;i++) {
    Planets.serpulo.sectors.get(convertToBase[i]).generateEnemyBase = true
  }
  
  // REMOVE PROBLEMATIC HIDDEN SECTORS
  const removeHidden = [
    // isolated sectors
    6,12,76,111,133,230,248,
    // twin sectors
    19,197,
    55,116,
    67,127,
    191,192,
    // 3 sector clusters
    0,92,94,
    13,161,162,
    16,176,180,
    20,200,204,
    47,185,207,
    // north pole
    24,66,69,225,
    // south pole
    30,254,259,263,265,
    // megabase
    27,103,138,150,157,237,242,243,244,245,246,247,251,
  ]
  if (Version.build != 149) {
    for (let i=0;i<removeHidden.length;i++) {
      let sect = Planets.serpulo.sectors.get(removeHidden[i])
      if (sect.preset != null && sect.preset.requireUnlock == false && !(sect.preset.isModded() && sect.preset.minfo.mod.name == 'md3')) { // check for modded non-hidden sectors so we dont fuck up anything
        Planets.serpulo.sectors.get(removeHidden[i]).preset = null
      }
    }
  }
  Planets.serpulo.updateBaseCoverage()
  if (Version.build != 149) Planets.serpulo.reloadMeshAsync()

  // FORCE SECTOR DIFFICULY
  forceSectorDifficulty()
  
  // RESEARCH
  // allow hail in craters
  //TechTree.all.find(t => t.content == Blocks.hail).objectives.remove(2) // todo: find way to do this without hardcoded index
  //TechTree.all.find(t => t.content == Blocks.hail).objectives.add(new Objectives.OnSector(SectorPresets.craters))
  // restrict early titanium
  let stainORwind = extend(Objectives.Objective,{
    complete() {
      return SectorPresets.stainedMountains.sector.hasBase() || SectorPresets.windsweptIslands.sector.hasBase()
    },
    display() {
      return Core.bundle.format("requirement.md3-stain-or-wind");
    }
  })
  TechTree.all.find(t => t.content == Blocks.lancer).objectives.add(stainORwind)
  TechTree.all.find(t => t.content == Blocks.parallax).objectives.add(stainORwind)
  TechTree.all.find(t => t.content == Blocks.salvo).objectives.add(stainORwind)
  TechTree.all.find(t => t.content == Vars.content.getByName(ContentType.block, "md3-tearer")).objectives.add(stainORwind)
  // restrict early thorium
  let tarORover = extend(Objectives.Objective,{
    complete() {
      return SectorPresets.tarFields.sector.hasBase() || SectorPresets.overgrowth.sector.hasBase()
    },
    display() {
      return Core.bundle.format("requirement.md3-tar-or-over");
    }
  })
  TechTree.all.find(t => t.content == Blocks.fuse).objectives.add(tarORover)
  TechTree.all.find(t => t.content == Blocks.tsunami).objectives.add(tarORover)
  TechTree.all.find(t => t.content == Blocks.meltdown).objectives.add(tarORover)
  TechTree.all.find(t => t.content == Blocks.surgeSmelter).objectives.add(tarORover)
  TechTree.all.find(t => t.content == Blocks.thoriumReactor).objectives.add(tarORover)
  // linearize post-thorium
  TechTree.all.find(t => t.content == SectorPresets.impact0078).objectives.add(new Objectives.Research(Blocks.spectre))
  TechTree.all.find(t => t.content == SectorPresets.impact0078).objectives.add(new Objectives.Research(Vars.content.getByName(ContentType.block, "md3-firenado")))
  TechTree.all.find(t => t.content == SectorPresets.impact0078).objectives.add(new Objectives.SectorComplete(Vars.content.getByName(ContentType.sector, "md3-reentry")))
  // better integrate BE sectors
  TechTree.all.find(t => t.content == SectorPresets.taintedWoods).objectives.add(new Objectives.SectorComplete(SectorPresets.fungalPass))
  // PLT sector requirements
  TechTree.all.find(t => t.content == SectorPresets.planetaryTerminal).objectives.add(new Objectives.SectorComplete(Vars.content.getByName(ContentType.sector, "md3-scourged-rivers")))
  
  // UTILITIES
  MapResizeDialog.minSize = 1 // maps outside of the 50x50 - 600x600 range are unsupported by anuke!!!
  MapResizeDialog.maxSize = 1000
  Vars.maxSchematicSize = 100 // we're making entire popular mods unnecessary with this one
})

// CAPTURE TOAST
Events.on(SectorCaptureEvent, e => {
  if (Core.settings.getBool("md3-forcecapturetoast", true) && e.sector.isBeingPlayed()) {
    Vars.ui.hudfrag.showToast(Core.bundle.format("sector.capture", ""))
  }
  if (!Vars.net.client() && Vars.state.isCampaign()) {
    Vars.state.getSector().planet.updateBaseCoverage()
    Time.runTask(7, () => forceSectorDifficulty())
  }
})

// GUARDIAN WARNINGS
const shittyalarm = Vars.tree.loadSound("weak-boss-warning")
const mediumalarm = Vars.tree.loadSound("medium-boss-warning")
const shittingyourselfalarm = Vars.tree.loadSound("strong-boss-warning")
function playAlarm(sound,loop,time) {
  for (let i=0;i<loop;i++) Time.run(time*i, () => sound.play(Core.settings.getInt("sfxvol")/100,1,0,false,true))
}
Events.on(WaveEvent, e => {
  if (Core.settings.getBool("md3-guardianwarn", true)) {
    let bosses = []
    let diff = 69420
    let health = 0
    let healthDiv = 70 // serpulo and mixtech default
    let alarmCubedHPDivs = [231798,11941690]
    switch (Vars.state.planet) {
      case Planets.erekir:
        healthDiv = 600
        alarmCubedHPDivs = [1000,8000]
        break
      // TODO: no data for fieros rn
      // mod compat, listed by order of addition to this list
      case Vars.content.getByName(ContentType.planet, "asthosus-asthosus"): // asthosus
        healthDiv = 170
        alarmCubedHPDivs = [62598,963397]
        break
      case Vars.content.getByName(ContentType.planet, "meld-ikaru"): // meld
        healthDiv = 60
        alarmCubedHPDivs = [27000,2744000]
        break
      case Vars.content.getByName(ContentType.planet, "moon-mod-Zilo"): // frozen farlands
        healthDiv = 120
        alarmCubedHPDivs = [72337,1953125]
        break
      // PLANNED MOD COMPAT: biotech (once thats done lmao)
      // if you're a mod dev and want compat with this, ping me on discord and i'll try to see what i can do
      // do note to atleast provide me a reference of what units can be considered what tier if your mod doesnt follow typical unit line conventions
      // alternatively make a PR if you dont want to bother me. healthDiv should be the lowest health value any unit that can show up as an enemy has
      // and the 2 alarmCubedHPDivs values should be the lowest health of any enemy-usable t4 unit on your planet
      // and lowest health of any enemy-usable t5 unit on your planet both divided by healthDiv, raised to the 3rd power, and rounded down
    }
    let winWave = Vars.state.rules.winWave > 0 ? Vars.state.rules.winWave-2 : Vars.state.wave+11
    let stop = false
    for (let i=Math.max(0,Vars.state.wave-2);i<=Math.min(Vars.state.wave+5,winWave);i++) {
      if (!stop) {
        let bruh = []
        for (let j=0;j<Vars.state.rules.spawns.size;j++) {
          bruh.push(Vars.state.rules.spawns.get(j))
        }
        for (let group of bruh) {
          if (group.effect == StatusEffects.boss && group.getSpawned(i) > 0) {
            diff = (i+2)-Vars.state.wave
            if (diff <= 5) {
              if (group.spawn > -0.5) {
                for (let j=0;j<group.getSpawned(i);j++) {
                  bosses.push(group.type.localizedName)
                }
                health += Math.pow(group.type.health/healthDiv,3)
              } else {
                health += Math.pow(group.type.health/healthDiv,3) * Vars.spawner.spawns.size
                for (let j=0;j<Vars.spawner.spawns.size*group.getSpawned(i);j++) {
                  bosses.push(group.type.localizedName)
                }
              }
              stop = true
            }
          }
        }
      }
    }
    if (diff <= 5) {
      bosses.sort()
      let format = ""
      let a = []
      let b = []
      for (let i=0;i<bosses.length;i++) {
        if (!a.includes(bosses[i])) {
          a.push(bosses[i])
          b.push(1)
        } else {
          b[b.length-1]++
        }
      }
      for (let i=0;i<a.length;i++) {
        if (i != 0) format += "\n"
        format += a[i]
        if (b[i] > 1) format += " " + b[i] + "x"
      }
      switch (diff) {
        case 5:
          if (health < alarmCubedHPDivs[0]) {
            Vars.ui.announce(Core.bundle.format("wave.md3-weakguardianwarn5", format), 5)
            playAlarm(shittyalarm,3,60)
          } else if (health < alarmCubedHPDivs[1]) {
            Vars.ui.announce(Core.bundle.format("wave.md3-mediumguardianwarn5", format), 5)
            playAlarm(mediumalarm,3,90)
          } else if (alarmCubedHPDivs[2] == null || health < alarmCubedHPDivs[2]) {
            Vars.ui.announce(Core.bundle.format("wave.md3-strongguardianwarn5" + (bosses.length > 1 ? "b" : "a"), format), 5)
            playAlarm(shittingyourselfalarm,3,90)
          } else {
            Vars.ui.announce(Core.bundle.format("wave.md3-strongguardianwarn5" + (bosses.length > 1 ? "b" : "a"), format), 5)
            playAlarm(shittingyourselfalarm,3,90)
          }
          break
        case 1:
          if (health < alarmCubedHPDivs[0]) {
            Vars.ui.announce(Core.bundle.format("wave.md3-weakguardianwarn1", format), 5)
            playAlarm(shittyalarm,3,60)
          } else if (health < alarmCubedHPDivs[1]) {
            Vars.ui.announce(Core.bundle.format("wave.md3-mediumguardianwarn1", format), 5)
            playAlarm(mediumalarm,3,90)
          } else if (alarmCubedHPDivs[2] == null || health < alarmCubedHPDivs[2]) {
            Vars.ui.announce(Core.bundle.format("wave.md3-strongguardianwarn1" + (bosses.length > 1 ? "b" : "a"), format), 5)
            playAlarm(shittingyourselfalarm,3,90)
          } else {
            Vars.ui.announce(Core.bundle.format("wave.md3-strongguardianwarn1" + (bosses.length > 1 ? "b" : "a"), format), 5)
            playAlarm(shittingyourselfalarm,3,90)
          }
          break
        case 0:
          if (health < alarmCubedHPDivs[0]) {
            Vars.ui.announce(Core.bundle.format("wave.md3-weakguardianwarn0" + (bosses.length > 1 ? "b" : "a"), format), 5)
          } else if (health < alarmCubedHPDivs[1]) {
            Vars.ui.announce(Core.bundle.format("wave.md3-mediumguardianwarn0", format), 5)
          } else if (alarmCubedHPDivs[2] == null || health < alarmCubedHPDivs[2]) {
            Vars.ui.announce(Core.bundle.format("wave.md3-strongguardianwarn0", format), 5)
          } else {
            Vars.ui.announce(Core.bundle.format("wave.md3-strongguardianwarn0", format), 5)
          }
          break
      }
    }
  }
})
