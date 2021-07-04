const Boss1 = extend(UnitType, "havoc", {
	update(unit){
		this.super$update(unit);
		if (unit.health < 4333) {
			unit.health += 9
		}
	},
});


Boss1.constructor = () => extend(MechUnit, {});
Boss1.immunities.add(StatusEffects.unmoving);
Boss1.immunities.add(StatusEffects.disarmed);