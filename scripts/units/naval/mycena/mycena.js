const SporeT1 = extend(UnitType, "mycena-boat", {});
SporeT1.constructor = () => extend(UnitWaterMove, {});
SporeT1.immunities.add(StatusEffects.sporeSlowed);
SporeT1.immunities.add(StatusEffects.sapped);
let heal = extend(RegenAbility, {
  amount: 17/60,
  getBundle() {return 'ability.regen'},
})
SporeT1.abilities.add(heal);

Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(SporeT1, 60 * 50, ItemStack.with(Items.silicon, 30, Items.sporePod, 20, Items.graphite, 25)));