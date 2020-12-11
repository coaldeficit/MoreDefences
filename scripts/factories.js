const CannonT1 = extendContent(UnitType, "cannoneer-mech", {});
CannonT1.constructor = () => extend(UnitEntity, {});
//CannonT1.abilities.add(new MoveLightningAbility(15, 8, 0.1, 1, 3.1, Color.valueOf("#a9d8ff")));
Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(CannonT1, 60 * 25, ItemStack.with(Items.silicon, 15, Items.graphite, 30)));
