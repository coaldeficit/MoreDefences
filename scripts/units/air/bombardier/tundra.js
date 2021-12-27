const vfx = require("more-defences-ivyx/libs/vfx")
const bulLib = require("more-defences-ivyx/libs/bulletlib")
const icewall = require("more-defences-ivyx/frozen-wall")
const BomberT5 = extendContent(UnitType, "tundra-ship", {});
BomberT5.constructor = () => extend(UnitEntity, {});

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
  sprite: 'more-defences-ivyx-d-bomb',
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
  sprite: 'more-defences-ivyx-plus-bomb',
  spin: 2,
  shrinkX: 0.45,
  shrinkY: 0.45,
  hitShake: 9,
  splashDamageRadius: 150,
  splashDamage: 400,
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
    Fx.impactShockwave.at(b.x, b.y);
    Units.nearbyBuildings(b.x, b.y, 150, cons(other => {
      if (other.team != b.owner.team) {
        print(other.size)
        let x = Mathf.round(other.x) / 8;
        let y = Mathf.round(other.y) / 8;
        let t = Vars.world.tile(x, y)
        let o = t.block()
        Rand().setSeed(Date.now()+b.id+other.id)
        if (o.size >= 1 && o.size <= 2 && Rand().random(0,1) <= 0.2) {
          if (t != null) {
            Call.tileDestroyed(other);
            t.setAir()
            switch (o.size) {
              case 1:
                t.setBlock(icewall.frozenWall, b.owner.team)
                break;
              case 2:
                t.setBlock(icewall.frozenWallL, b.owner.team)
                break;
            }
          }
        }
      }
    }));
  }
});

const bombCannon = extend(Weapon, {
  name: "more-defences-ivyx-generic-bomber-weapon",
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
  name: "more-defences-ivyx-railgun-cannon",
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
    type: BasicBulletType,
    speed: 15,
    hitSound: Sounds.explosionbig,
    width: 8,
    height: 20,
    damage: 400,
    splashDamage: 350,
    splashDamageRadius: 8,
    status: StatusEffects.disarmed,
    statusDuration: 60,
    lifetime: 35,
    backColor: Color.valueOf("#00aaff"),
  }),
});

BomberT5.weapons.add(
  bombCannon,
  railgun,
);

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-avalanche-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-tundra-ship")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
