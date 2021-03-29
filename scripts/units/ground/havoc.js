const Havoc = extendContent(UnitType, "havoc", {});
Havoc.constructor = () => extend(MechUnit, {});
Havoc.immunities = [StatusEffects.unmoving, StatusEffects.disarm, StatusEffects.slow];
