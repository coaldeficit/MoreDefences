const BomberT1 = extendContent(UnitType, "bombardier-ship", {});
BomberT1.constructor = () => extend(UnitEntity, {});
const bombardierBomb = extend(BombBulletType, {
  hitEffect: Fx.flakExplosion,
  shootEffect: Fx.none,
  smokeEffect: Fx.none,
  width: 5,
  height: 7,
  splashDamageRadius: 30,
  splashDamage: 9,
  status: StatusEffects.blasted,
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
  bullet: bombardierBomb
});
BomberT1.weapons.add(
  bombCannon
);
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(BomberT1, 60 * 20, ItemStack.with(Items.silicon, 10, Items.titanium, 5)));
