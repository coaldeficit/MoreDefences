const SwarmerT2 = extendContent(UnitType, "bee-ship", {});
SwarmerT2.constructor = () => extend(UnitType, {});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-swarmer-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-bee-ship")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
