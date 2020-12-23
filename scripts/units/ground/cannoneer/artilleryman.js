const CannonT2 = extendContent(UnitType, "artilleryman-mech", {});

CannonT2.constructor = () => extend(UnitEntity, {});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-cannoneer-mech"), Vars.content.getByName(ContentType.unit, "more-defences-artilleryman-mech")]);

Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
