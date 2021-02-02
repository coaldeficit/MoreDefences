const CannonT3 = extendContent(UnitType, "ordnance-mech", {});
CannonT3.constructor = () => extend(LegsUnit, {});
CannonT3.immunities.add(StatusEffects.corroded);

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-artilleryman-mech"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-ordnance-mech")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
