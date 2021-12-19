let bulLib = require("more-defences-ivyx/libs/bulletlib")
const BomberT3 = extendContent(UnitType, "showerer-ship", {});
BomberT3.constructor = () => extend(UnitEntity, {});

const showererBomb = extend(BombBulletType, {
  hitEffect: Fx.flakExplosion,
  shootEffect: Fx.none,
  smokeEffect: Fx.none,
  width: 10,
  height: 14,
  splashDamageRadius: 60,
  splashDamage: 50,
  status: StatusEffects.blasted,
  fragBullets: 17,
  fragBullet: bulLib.makeBullet({
    type: BombBulletType,
    speed: 4,
    hitEffect: Fx.flakExplosion,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    width: 5,
    height: 7,
    splashDamageRadius: 30,
    splashDamage: 9,
    status: StatusEffects.blasted
  }),
  range(){ // note to anyone reading: always override the range function for any bomb-type projectiles so that the unit ai actually uses them
    return 140
  }
});
const bombCannon = extend(Weapon, {
  name: "more-defences-ivyx-generic-bomber-weapon",
  minShootVelocity: 0.35,
  x: 0,
  shootY: 0,
  reload: 30,
  velocityRnd: 1,
  shootCone: 180,
  inaccuracy: 15,
  shootSound: Sounds.none,
  bullet: showererBomb
});
BomberT3.weapons.add(
  bombCannon
);

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-pelter-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-showerer-ship")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
