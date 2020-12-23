const ais = this.global.mcu.ai;

const SuNavT2 = extendContent(UnitType, "renidae", {});
SuNavT2.constructor = () => extend(UnitWaterMove, {});
SuNavT2.defaultController = ais.groundRepairAI;
SuNavT2.abilities.add(new UnitSpawnAbility(UnitTypes.mono, 60 * 60, 0, -5));
SuNavT2.abilities.add(new StatusFieldAbility(StatusEffects.overclock, 60 * 6, 60 * 9, 64));
SuNavT2.ammoType = AmmoTypes.power;

var upgrade = new Seq([Vars.content.getByName(ContentType.unit, "purple-air-rana"), Vars.content.getByName(ContentType.unit, "purple-air-renidae")]);
Blocks.additiveReconstructor.upgrades.add(upgrade.toArray(UnitType));
