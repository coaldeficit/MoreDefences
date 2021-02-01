const BomberT2 = extendContent(UnitType, "pelter-ship", {});
BomberT2.constructor = () => extend(UnitEntity, {});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-bombardier-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-pelter-ship")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
