const bulLib = require("md3/libs/bulletlib")
const FlockT2 = extend(UnitType, "apis-ship", {});
FlockT2.constructor = () => extend(UnitEntity, {});

const apisGun = extend(Weapon, {
  name: "md3-apis-gun",
  y: 2,
  x: 5,
  top: true,
  rotate: true,
  rotateSpeed: 5,
  inaccuracy: 5,
  reload: 13,
  shootSound: Sounds.shootSalvo,
  alternate: false,
  bullet: bulLib.makeBullet({
    type: BasicBulletType,
    sprite: "circle-bullet",
    speed: 6,
    lifetime: 20,
    damage: 25,
    lightning: 2,
    lightningLength: 5,
    lightningLengthRand: 2,
    lightningDamage: 12,
    shrinkX: 0,
    shrinkY: 0,
    width: 4,
    height: 4,
    frontColor: Color.white,
    backColor: Pal.surge
  }),
});
const flare = extend(MissileUnitType, "apis-ship-frag", {
  targetAir: false,
  speed: 2,
  accel: 0,
  drag: 1/25,
  lifetime: 360,
  outlineColor: Pal.darkOutline,
  health: 260,
  armor: 2,
  loopSound: Sounds.none,
  rotateSpeed: 0,
  trailLength: 0,
  engineSize: 0,
  physics: false,
  targetPriority: 0,
});
flare.controller = () => extend(FlyingAI, {})
flare.constructor = () => extend(TimedKillUnit, {});
const flareWeapon = extend(Weapon, {
  name: "md3-generic-bomber-weapon",
  y: 0,
  x: 0,
  top: true,
  inaccuracy: 30,
  reload: 60,
  shootSound: Sounds.none,
  shootCone: 361,
  shootOnDeath: true,
  shoot: new ShootSpread(3,120),
  controllable: false,
  aiControllable: false,
  display: false,
  bullet: bulLib.makeBullet({
    type: BulletType,
    shootEffect: Fx.shootBig,
    smokeEffect: Fx.shootBigSmoke2,
    speed: 0,
    keepVelocity: false,
    collides: false,
    spawnUnit: flare,
    rangeOverride: 1
  }),
});
FlockT2.weapons.add(
  apisGun,
  flareWeapon
);

// this will be removed in 3.3.0! update your maps before then!!!
const FlockT2Placeholder = extend(UnitType, "bee-ship", {
  hidden: true
});
FlockT2Placeholder.constructor = () => extend(UnitEntity, {});
const unitBullet = extend(BasicBulletType, {
  lifetime: 1,
  despawnUnit: FlockT2,
  killShooter: true,
  createUnits(b,x,y) {
    print("MoreDefences Bee unit has been renamed to Apis. Please update your maps to use it instead of the placeholder bee unit, as it will be removed in 3.3.0")
    if (!Vars.net.client()) {
      this.super$createUnits(b,x,y);
    }
  }
})
const unitLauncher = extend(Weapon, {
  name: "md3-generic-bomber-weapon",
  mirror: false,
  reload: 1,
  bullet: unitBullet,
  alwaysShooting: true,
});
FlockT2Placeholder.weapons.add(unitLauncher)
if (FlockT2Placeholder.unlocked && !FlockT2.unlocked) Vars.content.getByName(ContentType.unit, "md3-apis-ship").unlock()
Events.on(WorldLoadEvent, e => {
  let len = Vars.state.rules.spawns.size
  for (let i=0;i<len;i++) {
    if (Vars.state.rules.spawns.get(i).type == FlockT2Placeholder) {
      Vars.state.rules.spawns.get(i).type = FlockT2
      print("MoreDefences Bee unit has been renamed to Apis. Please update your maps to use it instead of the placeholder bee unit, as it will be removed in 3.3.0")
    }
  }
})

Blocks.additiveReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-flocker-ship"),
  Vars.content.getByName(ContentType.unit, "md3-apis-ship")
)