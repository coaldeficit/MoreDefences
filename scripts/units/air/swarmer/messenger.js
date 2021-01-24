const SwarmerT4 = extendContent(UnitType, "messenger-ship", {});
SwarmerT4.constructor = () => extend(UnitEntity, {});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-hornet-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-messenger-ship")]);
Blocks.exponentialReconstructor.upgrades.add(upgrade.toArray(UnitType));
