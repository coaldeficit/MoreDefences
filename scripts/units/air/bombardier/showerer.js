const BomberT3 = extendContent(UnitType, "showerer-ship", {});
BomberT3.constructor = () => extend(UnitEntity, {});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-pelter-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-showerer-ship")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
