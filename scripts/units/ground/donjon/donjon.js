const dmgroups = require("md3/units/damagegroups")
const statuses = require("md3/status-effects")
const mygroups = [
  'basic','malis','ironclad','detonator'
]
const DonT1 = extend(UnitType, "donjon-mech", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatUnit(mygroups),{}))
  }
});
DonT1.constructor = () => extend(MechUnit, {});
dmgroups.addToGroups(mygroups,DonT1)

DonT1.immunities.add(statuses.brominatedEffect);