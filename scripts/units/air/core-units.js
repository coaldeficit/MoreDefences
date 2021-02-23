const t4 = extendContent(UnitType, "delta-ship", {});
t4.constructor = () => extend(UnitEntity, {});
t4.defaultController = () => extend(BuilderAI, {});
