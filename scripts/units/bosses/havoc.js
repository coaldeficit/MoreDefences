const Boss1 = extend(UnitType, "havoc", {
	update(unit){
		this.super$update(unit);
		if (unit.health < 4333) {
			unit.health += 18
		}
	},
});


Boss1.constructor = () => extend(MechUnit, {
	update(){
		this.super$update();
		if (this.antispawnkillTimer == null) {
			this.antispawnkillTimer = 0;
		}
		this.antispawnkillTimer += 1;
		if (this.antispawnkillTimer <= (4*60)) {
			this.health = 13000;
		}
	},
});
Boss1.immunities.add(StatusEffects.unmoving);
Boss1.immunities.add(StatusEffects.disarmed);
