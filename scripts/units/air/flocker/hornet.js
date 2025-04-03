const FlockT3 = extend(UnitType, "hornet-ship", {});
FlockT3.constructor = () => extend(UnitEntity, {});

Blocks.multiplicativeReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-bee-ship"),
  Vars.content.getByName(ContentType.unit, "md3-hornet-ship")
)