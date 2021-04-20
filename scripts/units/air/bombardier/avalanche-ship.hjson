const BomberT4 = extendContent(UnitType, "avalanche-ship", {});
BomberT4.constructor = () => extend(UnitEntity, {});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-showerer-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-avalanche-ship")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));
