const blockcheck = require("md3/libs/blockcheck")
const bulLib = require("md3/libs/bulletlib")
const subturrets = require("md3/blocks/subturrets")
const SporeT2 = extend(UnitType, "panaeolus-boat", {});
SporeT2.constructor = () => extend(UnitWaterMove, {});
SporeT2.immunities.add(StatusEffects.sporeSlowed);
SporeT2.immunities.add(StatusEffects.sapped);
let heal = extend(RegenAbility, {
  amount: 28/60,
  getBundle() {return 'ability.regen'},
})
SporeT2.abilities.add(heal);

const shootsound = Vars.tree.loadSound("panaeolus-bullet")
const oilBullet = extend(BasicBulletType, {
  speed: 4,
  damage: 3,
  ammoMultiplier: 1,
  lifetime: 40,
  layer: 111,
  frontColor: Color.valueOf("242424"),
  backColor: Color.valueOf("000000"),
  height: 10,
  width: 8,
  shrinkY: 0,
  shrinkX: 0,
  collidesAir: true,
  status: StatusEffects.tarred,
  statusDuration: 60,
  puddles: 1,
  puddleRange: 0,
  puddleAmount: 8,
  puddleLiquid: Liquids.oil,
})
const mainGun = extend(Weapon, {
  name: "md3-panaeolus-gun",
  top: true,
  rotate: true,
  y: -2,
  x: 0,
  mirror: false,
  reload: 60,
  shootSound: shootsound,
  inaccuracy: 2.5,
  rotateSpeed: 10,
  bullet: oilBullet,
});
mainGun.shoot.shots = 12
mainGun.shoot.shotDelay = 2

const clump = extend(MissileUnitType, "panaeolus-boat-clump", {
  targetAir: false,
  speed: 1.5,
  maxRange: 6,
  lifetime: 60 * 2.2,
  outlineColor: Pal.darkOutline,
  engineColor: Color.valueOf("#FFA665"),
  trailColor: Color.valueOf("#FFA665"),
  trailLength: 0,
  engineSize: 0,
  engineLayer: Layer.effect,
  health: 100,
  loopSoundVolume: 0,
  rotateSpeed: 0,
  drawCell: false,
  deathSound: Sounds.plantBreak
});
clump.constructor = () => extend(TimedKillUnit, {});
const clumpExplosion = extend(Weapon, {
  shootCone: 361,
  mirror: false,
  reload: 1,
  alwaysShooting: true,
  shootSound: Sounds.none,
  bullet: extend(ExplosionBulletType, {
    splashDamage: -1,
    splashDamageRadius: -1,
    rangeOverride: 6,
    killShooter: false,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    despawned(b) {
      let develop = false
      blockcheck.iterateSquare(Math.round(b.owner.x/8)-1,Math.round(b.owner.y/8)-1,3,3,(other => {
        if (other.floor().liquidDrop == null || other.block() != Blocks.air) {
          develop = true
        }
      }));
      if (develop) {
        if (Vars.world.tile(Math.round(b.owner.x/8), Math.round(b.owner.y/8)) != null) {
          if (Vars.world.tile(Math.round(b.owner.x/8), Math.round(b.owner.y/8)).block() == Blocks.air && !Vars.net.client()) {
            Vars.world.tile(Math.round(b.owner.x/8), Math.round(b.owner.y/8)).setNet(subturrets.sporangia, b.owner.team, 0)
          }
        }
        b.owner.kill()
      }
    }
  })
})
clump.weapons.add(clumpExplosion)

const clumpLauncher = extend(Weapon, {
  y: -3,
  x: 0,
  mirror: false,
  inaccuracy: 0,
  reload: 120,
  shootSound: Sounds.none,
  baseRotation: 180,
  shootCone: 361,
  shoot: new ShootSpread(3,80),
  bullet: bulLib.makeBullet({
    type: BulletType,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    shake: 0,
    speed: 0,
    keepVelocity: false,
    collidesAir: false,
    spawnUnit: clump
  }),
});

SporeT2.weapons.add(
  mainGun,
  clumpLauncher
);

Blocks.additiveReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-mycena-boat"),
  Vars.content.getByName(ContentType.unit, "md3-panaeolus-boat")
)