const vfx = require("md3/libs/vfx")
const bulLib = require("md3/libs/bulletlib")
const rng = require("md3/libs/rng")
const blockcheck = require("md3/libs/blockcheck")
const icewall = require("md3/blocks/frozen-wall")
const FlockT5 = extend(UnitType, "tundra-ship", {});
FlockT5.constructor = () => extend(UnitEntity, {});

const tundraBombFrag = extend(ArtilleryBulletType, {
  speed: 2,
  spin: 6,
  width: 10,
  height: 10,
  damage: 15,
  splashDamage: 35,
  splashDamageRadius: 24,
  hitEffect: Fx.flakExplosion,
  despawnEffect: Fx.shockwave,
  frontColor: Color.valueOf("#ffffff"),
  backColor: Color.valueOf("#6ecdec"),
  collide: false,
  sprite: 'md3-d-bomb',
  hitShake: 2,
});
const tundraBomb = extend(BasicBulletType, {
  hitSound: Sounds.plasmaboom,
  hitEffect: Fx.massiveExplosion,
  despawnEffect: Fx.none,
  shootEffect: Fx.none,
  smokeEffect: Fx.none,
  width: 30,
  height: 30,
  frontColor: Color.valueOf("#ffffff"),
  backColor: Color.valueOf("#6ecdec"),
  sprite: 'md3-plus-bomb',
  spin: 2,
  shrinkX: 0.45,
  shrinkY: 0.45,
  hitShake: 9,
  splashDamageRadius: 96,
  splashDamage: 300,
  status: StatusEffects.freezing,
  statusDuration: 720,
  speed: 4,
  drag: 4,
  collides: false,
  collidesAir: false,
  lifetime: 140,
  keepVelocity: false,
  hittable: false,
  fragBullets: 10,
  fragBullet: tundraBombFrag,
  range(){ // note to anyone reading: always override the range function for any bomb-type projectiles so that the unit ai actually uses them
    return 150
  },
  despawned(b){
    this.super$despawned(b)
    vfx.freezeBombExplosion.at(b.x, b.y);
    vfx.freezeBomb.at(b.x, b.y);
    vfx.b135impactShockwave.at(b.x, b.y);
    rng.setIndex(4897)
    blockcheck.iterateSquareCenter(Math.round(b.x/8),Math.round(b.y/8),24,24,(other => {
      let rngValue = rng.randomUnsynced()
      if (other.build != null) {
        let o = other.block()
        if (o.size >= 1 && o.size <= 2 && rngValue < 200 && other.build.team != b.owner.team && other.build.tileX() == other.worldx()/8 && other.build.tileY() == other.worldy()/8) {
          if (other != null) {
            other.build.addPlan(true)
            other.setAir()
            switch (o.size) {
              case 1:
                other.setBlock(icewall.frozenWall, b.owner.team)
                break;
              case 2:
                other.setBlock(icewall.frozenWallL, b.owner.team)
                break;
            }
          }
        }
      }
    }));
  }
});

const bombCannon = extend(Weapon, {
  name: "md3-generic-bomber-weapon",
  minShootVelocity: 0.25,
  mirror: false,
  x: 0,
  shootY: 0,
  reload: 200,
  velocityRnd: 1,
  shootCone: 180,
  inaccuracy: 15,
  shootSound: Sounds.plasmadrop,
  bullet: tundraBomb,
  autoTarget: true
});
const railgun = extend(Weapon, {
  name: "md3-railgun-cannon",
  y: 2,
  shots: 1,
  x: 0,
  top: true,
  rotate: true,
  inaccuracy: 0,
  reload: 100,
  mirror: false,
  shootSound: Sounds.bigshot,
  bullet: bulLib.makeBullet({
    type: LaserBoltBulletType,
    speed: 7,
    hitSound: Sounds.explosionbig,
    width: 6,
    height: 50,
    damage: 200,
    splashDamage: 100,
    splashDamageRadius: 8,
    status: StatusEffects.disarmed,
    statusDuration: 60,
    lifetime: 35,
    backColor: Color.valueOf("#00aaff"),
  }),
});

FlockT5.weapons.add(
  bombCannon,
  railgun,
);

Blocks.tetrativeReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-messenger-ship"),
  Vars.content.getByName(ContentType.unit, "md3-tundra-ship")
)
