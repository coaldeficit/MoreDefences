const bulLib = require("md3/libs/bulletlib")
const FlockT3 = extend(UnitType, "hornet-ship", {});
FlockT3.constructor = () => extend(UnitEntity, {});

const minimissile = extend(MissileUnitType, "hornet-ship-missile-payload", {
  targetAir: false,
  maxRange: 6,
  speed: 3.3,
  lifetime: 27,
  homingDelay: 2,
  rotateSpeed: 5,
  outlineColor: Color.valueOf("#565666"),
  engineColor: Color.valueOf("#bf92f9"),
  trailColor: Color.valueOf("#bf92f9"),
  trailLength: 5,
  engineLayer: Layer.effect,
  health: 70,
  armor: 2,
  loopSoundVolume: 0.1,
  engineOffset: 5,
  engineSize: 2,
  drawCell: true,
  targetPriority: 0,
});
minimissile.constructor = () => extend(TimedKillUnit, {});
const minimissileExplosion = extend(Weapon, {
  shootCone: 361,
  mirror: false,
  reload: 1,
  shootOnDeath: true,
  bullet: bulLib.makeBullet({
    type: ExplosionBulletType,
    splashDamage: 60,
    splashDamageRadius: 24,
    shootEffect: Fx.massiveExplosion,
    collidesAir: false,
    rangeOverride: 6,
  }),
})
minimissile.weapons.add(minimissileExplosion)

const missile = extend(MissileUnitType, "hornet-ship-missile", {
  targetAir: false,
  maxRange: 64,
  speed: 2,
  lifetime: 54,
  rotateSpeed: 2,
  outlineColor: Color.valueOf("#565666"),
  engineColor: Color.valueOf("#bf92f9"),
  trailColor: Color.valueOf("#bf92f9"),
  trailLength: 14,
  engineLayer: Layer.effect,
  health: 350,
  armor: 3,
  loopSoundVolume: 0.1,
  engineOffset: 8,
  engineSize: 3,
  drawCell: true,
  targetPriority: 0,
});
missile.constructor = () => extend(TimedKillUnit, {});
const missileExplosion = extend(Weapon, {
  shootCone: 361,
  mirror: false,
  reload: 1,
  shootOnDeath: true,
  bullet: bulLib.makeBullet({
    type: ExplosionBulletType,
    splashDamage: 160,
    splashDamageRadius: 32,
    shootEffect: Fx.massiveExplosion,
    collidesAir: false,
    rangeOverride: 64,
    fragBullets: 6,
    fragRandomSpread: 0,
    fragSpread: 60,
    fragAngle: 0,
    fragVelocityMin: 1,
    fragOffsetMax: 1,
    fragBullet: bulLib.makeBullet({
      type: BulletType,
      shootEffect: Fx.none,
      smokeEffect: Fx.none,
      shake: 0.125,
      speed: 0,
      keepVelocity: false,
      collidesAir: false,
      spawnUnit: minimissile
    }),
  }),
})
missile.weapons.add(missileExplosion)

const missileLauncher = extend(Weapon, {
  name: "md3-hornet-cannon",
  y: -3,
  x: 0,
  mirror: false,
  top: true,
  inaccuracy: 0,
  reload: 120,
  shootSound: Sounds.missileLarge,
  recoil: 6,
  shootCone: 60,
  bullet: bulLib.makeBullet({
    type: BulletType,
    shootEffect: Fx.shootBig,
    smokeEffect: Fx.shootBigSmoke2,
    shake: 1.5,
    speed: 0,
    keepVelocity: false,
    collidesAir: false,
    rangeOverride: 188,
    spawnUnit: missile
  }),
});

FlockT3.weapons.add(missileLauncher);

Blocks.multiplicativeReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-apis-ship"),
  Vars.content.getByName(ContentType.unit, "md3-hornet-ship")
)
