const bulLib = require("md3/libs/bulletlib")
const ShotT4 = extend(UnitType, "rocketeer-mech", {
  onUnlock() {
    minion.unlock()
  }
});
ShotT4.constructor = () => extend(LegsUnit, {});

const minion = extend(UnitType, "cogwheel-mech", {});
minion.constructor = () => extend(MechUnit, {});

const unitBullet = extend(BasicBulletType, {
  speed: 4,
  lifetime: 60,
  damage: 190,
  shootEffect: Fx.shootBig,
  smokeEffect: Fx.shootBigSmoke2,
  shake: 0.5,
  keepVelocity: false,
  collides: false,
  collidesAir: false,
  width: 35,
  height: 20,
  despawnUnit: minion,
  createUnits(b,x,y) {
    if (!Vars.net.client()) {
      this.super$createUnits(b,x,y);
    }
  }
})
const unitLauncher = extend(Weapon, {
  name: "md3-generic-bomber-weapon",
  y: 0,
  x: 0,
  top: true,
  inaccuracy: 2,
  reload: 180,
  shootSound: Sounds.artillery,
  shootCone: 180,
  shoot: new ShootSpread(2, 6),
  velocityRnd: 0.2,
  bullet: unitBullet,
});

const missile = extend(MissileUnitType, "rocketeer-mech-missile", {
  targetAir: false,
  speed: 7.3,
  maxRange: 6,
  lifetime: 60 * 0.8,
  outlineColor: Pal.darkOutline,
  engineColor: Color.valueOf("#FFA665"),
  trailColor: Color.valueOf("#FFA665"),
  trailLength: 7,
  engineLayer: Layer.effect,
  health: 190,
  loopSoundVolume: 0.1
});
missile.constructor = () => extend(TimedKillUnit, {});
const missileExplosion = extend(Weapon, {
  shootCone: 361,
  mirror: false,
  reload: 1,
  shootOnDeath: true,
  bullet: bulLib.makeBullet({
    type: ExplosionBulletType,
    splashDamage: 110,
    splashDamageRadius: 25,
    shootEffect: Fx.massiveExplosion,
    collidesAir: false,
  }),
})
missile.weapons.add(missileExplosion)

const missileLauncher = extend(Weapon, {
  name: "md3-rocketeer-launcher",
  y: -3,
  x: 13,
  top: true,
  inaccuracy: 0,
  reload: 90,
  shootSound: Sounds.missileLarge,
  recoil: 6,
  baseRotation: -7,
  shootCone: 60,
  bullet: bulLib.makeBullet({
    type: BulletType,
    shootEffect: Fx.shootBig,
    smokeEffect: Fx.shootBigSmoke2,
    shake: 1.5,
    speed: 0,
    keepVelocity: false,
    collidesAir: false,
    spawnUnit: missile
  }),
});

ShotT4.weapons.add(
  unitLauncher,
  missileLauncher
);

Blocks.exponentialReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-slugger-mech"),
  Vars.content.getByName(ContentType.unit, "md3-rocketeer-mech")
)

