const FlockT4 = extend(UnitType, "messenger-ship", {});
FlockT4.constructor = () => extend(UnitEntity, {});

Blocks.exponentialReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-hornet-ship"),
  Vars.content.getByName(ContentType.unit, "md3-messenger-ship")
)