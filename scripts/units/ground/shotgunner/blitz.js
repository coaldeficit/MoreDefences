const subturrets = require("md3/blocks/subturrets")
const blockcheck = require("md3/libs/blockcheck")
const bulLib = require("md3/libs/bulletlib")

const ShotT5 = extend(UnitType, "blitz-mech", {});
ShotT5.constructor = () => extend(LegsUnit, {});

const turretBullet = extend(BasicBulletType, {
  speed: 4,
  lifetime: 40,
  damage: 190,
  shootEffect: Fx.shootBig,
  smokeEffect: Fx.shootBigSmoke2,
  shake: 0.5,
  keepVelocity: false,
  collides: false,
  collidesAir: false,
  width: 30,
  height: 45,
  splashDamage: 300,
  splashDamageRadius: 69,
  despawnSound: Sounds.dullExplosion,
  despawned(b) {
    this.super$despawned(b)
    let develop = true
    let valid = 0
    blockcheck.iterateSquare(Math.round(b.x/8)-1,Math.round(b.y/8)-1,3,3,(other => {
      if (other.block() != Blocks.air && !(other.block() instanceof Prop && other.block().breakable)) {
        develop = false
      }
      valid++
    }));
    if (develop && valid >= 9) {
      Vars.world.tile(Math.round(b.x/8), Math.round(b.y/8)).setNet(subturrets.blade, b.owner.team, 0)
      Sounds.place.at(b.x, b.y, Mathf.random(0.8,1.2))
    }
  }
})
const turretLauncher = extend(Weapon, {
  name: "md3-generic-bomber-weapon",
  y: 0,
  x: 0,
  top: true,
  mirror: false,
  inaccuracy: 0,
  reload: 360,
  shootSound: Sounds.artillery,
  shootCone: 2,
  bullet: turretBullet,
});
const missileLauncher = extend(Weapon, {
  name: "md3-blitz-missile-cannon",
  y: 6,
  x: 17,
  top: true,
  rotate: true,
  rotateSpeed: 5,
  inaccuracy: 10,
  reload: 160,
  shootSound: Sounds.artillery,
  shootCone: 100,
  velocityRnd: 0.2,
  ejectEffect: Fx.none,
  bullet: bulLib.makeBullet({
    type: MissileBulletType,
    speed: 2.7,
    damage: 19,
    width: 8,
    height: 8,
    shrinkY: 0,
    drag: -0.003,
    homingRange: 60,
    keepVelocity: false,
    splashDamageRadius: 30,
    splashDamage: 35,
    lifetime: 39,
    trailColor: Pal.unitBack,
    backColor: Pal.unitBack,
    frontColor: Pal.unitFront,
    hitEffect: Fx.blastExplosion,
    despawnEffect: Fx.blastExplosion,
    weaveScale: 6,
    weaveMag: 1,
  }),
});
missileLauncher.shoot.shots = 16
missileLauncher.shoot.shotDelay = 2
ShotT5.weapons.add(
  turretLauncher,
  missileLauncher,
);

Blocks.tetrativeReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-rocketeer-mech"),
  Vars.content.getByName(ContentType.unit, "md3-blitz-mech")
)
