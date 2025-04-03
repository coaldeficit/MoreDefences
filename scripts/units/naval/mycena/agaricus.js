const SporeT3 = extend(UnitType, "agaricus-boat", {});
SporeT3.constructor = () => extend(UnitWaterMove, {});
SporeT3.immunities.add(StatusEffects.sporeSlowed);
SporeT3.immunities.add(StatusEffects.sapped);
let heal = extend(RegenAbility, {
  amount: 32/60,
  getBundle() {return 'ability.regen'},
})
SporeT3.abilities.add(heal);

Blocks.multiplicativeReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-panaeolus-boat"),
  Vars.content.getByName(ContentType.unit, "md3-agaricus-boat")
)
