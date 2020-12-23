const CannonT2 = extendContent(UnitType, "artilleryman-mech", {});

CannonT2.constructor = () => extend(UnitType, {});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx"), Vars.content.getByName(ContentType.unit, "more-defences-artilleryman")]);

Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
