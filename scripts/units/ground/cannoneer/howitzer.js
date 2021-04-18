const CannonT5 = extendContent(UnitType, "howitzer-mech", {});
CannonT5.constructor = () => extend(LegsUnit, {});
CannonT5.immunities.add(StatusEffects.corroded);
CannonT5.immunities.add(StatusEffects.freezing);
CannonT5.immunities.add(StatusEffects.wet);


var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-mortar-mech"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-howitzer-mech")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
