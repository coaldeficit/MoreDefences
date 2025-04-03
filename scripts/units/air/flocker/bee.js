const FlockT2 = extend(UnitType, "bee-ship", {});
FlockT2.constructor = () => extend(UnitEntity, {});

Blocks.additiveReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-flocker-ship"),
  Vars.content.getByName(ContentType.unit, "md3-bee-ship")
)