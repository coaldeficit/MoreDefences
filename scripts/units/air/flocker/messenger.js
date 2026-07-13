const FlockT4 = extend(UnitType, "messenger-ship", {});
FlockT4.constructor = () => extend(UnitEntity, {});

Events.on(ClientLoadEvent, e => {
  Blocks.exponentialReconstructor.addUpgrade(
    Vars.content.getByName(ContentType.unit, "md3-hornet-ship"),
    Vars.content.getByName(ContentType.unit, "md3-messenger-ship")
  )
  Blocks.exponentialReconstructor.initCapacities()
})