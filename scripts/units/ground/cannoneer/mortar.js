const CannonT4 = extendContent(UnitType, "mortar-mech", {});
CannonT4.constructor = () => extend(LegsUnit, {});
CannonT4.immunities.add(StatusEffects.corroded);

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-ordnance-mech"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-mortar-mech")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
