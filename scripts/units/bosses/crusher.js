const refresh = require("md3/units/refreshconstruct")
const Boss2 = extend(UnitType, "crusher", {
	update(unit){
		this.super$update(unit);
		if (unit.health < 26000) {
			unit.health += 18
			if (unit.health > 26000) unit.health = 26000
		}
	},
});

Boss2.constructor = () => extend(MechUnit, {
	plswork(){
		if (this.antispawnkillTimer == null) {
			this.antispawnkillTimer = 0;
		}
		this.antispawnkillTimer += 1;
		if (this.antispawnkillTimer <= (4*60)) {
			this.health = 26000;
		}
	},
	crush(){
		Units.nearbyBuildings(this.x, this.y, 50/2, cons(other => {
			if (other.team != this.team) {
				other.health = -99999
				other.damage(1)
			}
		}));
		Units.nearbyEnemies(this.team, this.x, this.y, 50/2, cons(other => {
			if (other.isFlying() != true) {
				other.health = -99999
				other.damage(1)
			}
		}));
	},
	update(){
		this.plswork()
		this.crush()
		this.super$update()
	},
	classId: () => Boss2.classId
});
refresh(Boss2)

Boss2.immunities.add(StatusEffects.unmoving);
Boss2.immunities.add(StatusEffects.disarmed);
Boss2.immunities.add(StatusEffects.shocked);
Boss2.immunities.add(StatusEffects.blasted);
