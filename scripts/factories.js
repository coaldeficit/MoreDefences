const ais = this.global.mcu.ai;

const CannonT1 = extendContent(UnitType, "cannoneer-mech", {});

Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(CannonT1, 60 * 30, ItemStack.with(Items.silicon, 15, Items.graphite, 25)));
