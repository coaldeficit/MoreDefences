let bulLib = require("more-defences-ivyx/libs/bulletlib")
const BomberT2 = extendContent(UnitType, "pelter-ship", {});
BomberT2.constructor = () => extend(UnitEntity, {});

const pelterBomb = extend(BombBulletType, {
  hitEffect: Fx.flakExplosion,
  shootEffect: Fx.none,
  smokeEffect: Fx.none,
  width: 7.5,
  height: 10.5,
  splashDamageRadius: 45,
  splashDamage: 17,
  status: StatusEffects.blasted,
  fragBullets: 10,
  fragBullet: bulLib.makeBullet({
    type: LiquidBulletType,
    liquid: Liquids.oil,
    damage: 0.375,
    status: StatusEffects.tarred,
    pierce: true,
    lifetime: 240,
    drag: 0.075
  }),
  range(){ // note to anyone reading: always override the range function for any bomb-type projectiles so that the unit ai actually uses them
    return 140
  }
});
const bombCannon = extend(Weapon, {
  name: "more-defences-ivyx-generic-bomber-weapon",
  minShootVelocity: 0.75,
  x: 2,
  shootY: 0,
  reload: 24,
  shots: 3,
  shotDelay: 2,
  velocityRnd: 1,
  shootCone: 180,
  inaccuracy: 15,
  shootSound: Sounds.none,
  bullet: pelterBomb
});
const gun = extend(Weapon, {
  name: "more-defences-ivyx-pelter-gun",
  y: 7,
  x: 2.8,
  reload: 13,
  alternate: true,
  shootSound: Sounds.pew,
  inaccuracy: 2,
  collidesTiles: false,
  bullet: bulLib.makeBullet({
    type: BasicBulletType,
    speed: 5,
    damage: 4,
    ammoMultiplier: 1,
    lifetime: 20,
  })
});
BomberT2.weapons.add(
  bombCannon,
  gun
);

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-bombardier-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-pelter-ship")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
