const SwarmT1 = extendContent(UnitType, "swarmer-ship", {});
SwarmT1.constructor = () => extend(UnitEntity, {});
SwarmT1.defaultController = () => extend(SuicideAI, {});
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(SwarmT1, 60 * 15, ItemStack.with(Items.silicon, 10, Items.pyratite, 5)));
