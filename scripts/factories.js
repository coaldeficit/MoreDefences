const cannoneerT1 = extendContent(UnitType, "cannoneer-mech", {});

Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(cannoneerT1, 60 * 27, ItemStack.with(Items.silicon, 15, Items.graphite, 25)));
