const SwarmerT5 = extend(UnitType, "communicator-ship", {});
SwarmerT5.constructor = () => extend(UnitEntity, {});

Blocks.tetrativeReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-messenger-ship"),
  Vars.content.getByName(ContentType.unit, "md3-communicator-ship")
)
SwarmerT5.abilities.add(new UnitSpawnAbility(Vars.content.getByName(ContentType.unit, "md3-hornet-ship"), 60*65, 0, 26));
SwarmerT5.abilities.add(new UnitSpawnAbility(Vars.content.getByName(ContentType.unit, "md3-bee-ship"), 60*25, 13, -16));
SwarmerT5.abilities.add(new UnitSpawnAbility(Vars.content.getByName(ContentType.unit, "md3-bee-ship"), 60*25, -13, -16));
