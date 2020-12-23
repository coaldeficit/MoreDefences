const CannonT1 = extendContent(UnitType, "cannoneer-mech", {});

CannonT1.constructor = () => extend(UnitType, {});

Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(CannonT1, 60 * 25, ItemStack.with(Items.silicon, 45, Items.metaglass, 25, Items.titanium, 20)));
