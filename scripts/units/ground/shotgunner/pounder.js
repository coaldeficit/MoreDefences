const ShotT2 = extend(UnitType, "pounder-mech", {});
ShotT2.constructor = () => extend(LegsUnit, {});

Blocks.additiveReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-shotgunner-mech"),
  Vars.content.getByName(ContentType.unit, "md3-pounder-mech")
)
