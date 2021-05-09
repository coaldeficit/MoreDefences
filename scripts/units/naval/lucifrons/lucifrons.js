const LuciT1 = extendContent(UnitType, "lucifrons-boat", {});
LuciT1.constructor = () => extend(UnitWaterMove, {});
Blocks.navalFactory.plans.add(new UnitFactory.UnitPlan(LuciT1, (60 * 60) * 1.5, ItemStack.with(Items.silicon, 40, Items.metaglass, 65, Items.titanium, 25)));