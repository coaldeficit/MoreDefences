const BomberT1 = extendContent(UnitType, "bombardier-ship", {});
BomberT1.constructor = () => extend(UnitEntity, {});
Blocks.airFactory.plans.add(new UnitFactory.UnitPlan(BomberT1, 60 * 20, ItemStack.with(Items.silicon, 10, Items.titanium, 5)));
