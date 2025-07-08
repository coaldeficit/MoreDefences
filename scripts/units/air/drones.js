const AssDrone = extend(UnitType, "assault-drone", {});
AssDrone.constructor = () => extend(TimedKillUnit, {});
const AssEmblyDrone = extend(UnitType, "autoassembly-drone", {});
AssEmblyDrone.constructor = () => extend(BuildingTetherPayloadUnit, {});