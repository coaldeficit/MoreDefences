const FlockT1 = extend(UnitType, "flocker-ship", {});
FlockT1.constructor = () => extend(UnitEntity, {});
// FlockT1.defaultController = () => extend(SuicideAI, {});
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(FlockT1, 60 * 8, ItemStack.with(Items.silicon, 10, Items.copper, 12)));
