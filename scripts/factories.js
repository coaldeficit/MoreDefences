// Cannoneer
const CannonT1 = extendContent(UnitType, "cannoneer-mech", {});
CannonT1.constructor = () => extend(UnitEntity, {});
Blocks.groundFactory.plans.add(new UnitFactory.UnitPlan(CannonT1, 60 * 25, ItemStack.with(Items.silicon, 15, Items.graphite, 30)));

//var CannonT2 = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-cannoneer-mech"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-artilleryman-mech")]);
