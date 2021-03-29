const Havoc = extendContent(UnitType, "havoc", {});
Havoc.constructor = () => extend(MechUnit, {});
Havoc.immunities.add(StatusEffects.unmoving);
Havoc.immunities.add(StatusEffects.disarm);
Havoc.immunities.add(StatusEffects.slow); // test immunity to see if the immunity stuff actually works
