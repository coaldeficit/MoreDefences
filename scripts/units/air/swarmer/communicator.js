const SwarmerT5 = extendContent(UnitType, "communicator-ship", {});
SwarmerT5.constructor = () => extend(UnitEntity, {});

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-messenger-ship"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-communicator-ship")]);
Blocks.tetrativeReconstructor.upgrades.add(upgrade.toArray(UnitType));
SwarmerT5.abilities.add(new UnitSpawnAbility(Vars.content.getByName(ContentType.unit, "more-defences-ivyx-swarmer-ship"), 60 * 45, 0, -5));
