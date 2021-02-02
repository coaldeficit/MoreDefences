const CannonT2 = extendContent(UnitType, "artilleryman-mech", {});
CannonT2.constructor = () => extend(MechUnit, {});
CannonT2.immunities.add(StatusEffects.corroded);

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "more-defences-ivyx-cannoneer-mech"), Vars.content.getByName(ContentType.unit, "more-defences-ivyx-artilleryman-mech")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
