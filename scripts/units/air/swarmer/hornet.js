const SwarmerT3 = extendContent(UnitType, "hornet-ship", {});
SwarmerT3.constructor = () => extend(UnitEntity, {});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-bee-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-hornet-ship")]);
Blocks.multiplicativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
