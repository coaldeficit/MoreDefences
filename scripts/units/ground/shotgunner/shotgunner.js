const ShotT1 = extend(UnitType, "shotgunner-mech", {});

ShotT1.constructor = () => extend(LegsUnit, {});

Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(ShotT1, 60 * 25, ItemStack.with(Items.silicon, 20, Items.graphite, 15, Items.copper, 15)));
