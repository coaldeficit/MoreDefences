const dmgroups = require("md3/units/damagegroups")
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