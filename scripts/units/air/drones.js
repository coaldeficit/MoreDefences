const droneFactory = extendContent(UnitFactory, "drone-factory", {});

const SpiritDrone = extendContent(UnitType, "spirit-drone", {});
SpiritDrone.constructor = () => extend(UnitEntity, {});
SpiritDrone.defaultController = () => extend(RepairAI, {});
droneFactory.plans.add(new UnitFactory.UnitPlan(SpiritDrone, 60 * 7, ItemStack.with(Items.silicon, 8, Items.titanium, 5)));
