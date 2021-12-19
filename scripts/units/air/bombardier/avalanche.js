const vfx = require("more-defences-ivyx/libs/vfx")
const BomberT4 = extendContent(UnitType, "avalanche-ship", {});
BomberT4.constructor = () => extend(UnitEntity, {});

const avalancheBombFrag = extend(ArtilleryBulletType, {
  speed: 2,
  spin: 6,
  width: 10,
  height: 10,
  damage: 10,
  splashDamage: 65,
  splashDamageRadius: 24,
  hitEffect: Fx.flakExplosion,
  despawnEffect: Fx.shockwave,
  frontColor: Color.valueOf("#ffffff"),
  backColor: Color.valueOf("#6ecdec"),
  collide: false,
  sprite: 'more-defences-ivyx-d-bomb',
  hitShake: 2
});
const avalancheBomb = extend(BasicBulletType, {
  hitSound: Sounds.plasmaboom,
  hitEffect: Fx.massiveExplosion,
  despawnEffect: vfx.freezeBombWeak,
  shootEffect: Fx.none,
  smokeEffect: Fx.none,
  width: 30,
  height: 30,
  frontColor: Color.valueOf("#ffffff"),
  backColor: Color.valueOf("#6ecdec"),
  sprite: 'more-defences-ivyx-i-bomb',
  spin: 4,
  shrinkX: 0.7,
  shrinkY: 0.7,
  hitShake: 5,
  splashDamageRadius: 100,
  splashDamage: 200,
  status: StatusEffects.freezing,
  statusDuration: 360,
  speed: 4,
  drag: 4,
  collides: false,
  collidesAir: false,
  lifetime: 70,
  keepVelocity: false,
  fragBullets: 2,
  fragBullet: avalancheBombFrag,
  range(){ // note to anyone reading: always override the range function for any bomb-type projectiles so that the unit ai actually uses them
    return 4*70
  }
});
const avalancheBullet = extend(BasicBulletType, {
  speed: 10,
  damage: 50,
  width: 7,
  height: 9,
  frontColor: Color.valueOf("#6ecdec"),
  backColor: Color.valueOf("#5091a6"),
  status: StatusEffects.freezing,
  lifetime: 30,
  buildingDamageMultiplier: 0.3,
  keepVelocity: false
});
const avalancheBulletWeak = extend(BasicBulletType, {
  speed: 8,
  damage: 15,
  width: 7,
  height: 9,
  frontColor: Color.valueOf("#6ecdec"),
  backColor: Color.valueOf("#5091a6"),
  status: StatusEffects.freezing,
  lifetime: 32,
  buildingDamageMultiplier: 0.3,
  keepVelocity: false
});

const bombCannon = extend(Weapon, {
  name: "more-defences-ivyx-generic-bomber-weapon",
  minShootVelocity: 0.25,
  mirror: false,
  x: 0,
  shootY: 0,
  reload: 70,
  velocityRnd: 1,
  shootCone: 180,
  inaccuracy: 15,
  shootSound: Sounds.plasmadrop,
  bullet: avalancheBomb,
  autoTarget: true
});
const gun1 = extend(Weapon, {
  name: "more-defences-ivyx-avalanche-weapon",
  y: 5,
  shots: 1,
  x: 5,
  top: true,
  rotate: true,
  inaccuracy: 2,
  reload: 10,
  alternate: true,
  shootSound: Sounds.pew,
  bullet: avalancheBulletWeak
});
const gun2 = extend(Weapon, {
  name: "more-defences-ivyx-avalanche-weapon",
  y: -5,
  shots: 1,
  x: 5,
  top: true,
  rotate: true,
  inaccuracy: 2,
  reload: 33,
  alternate: true,
  shootSound: Sounds.pew,
  bullet: avalancheBullet
});

BomberT4.weapons.add(
  bombCannon,
  gun1,
  gun2,
);

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-showerer-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-avalanche-ship")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));
