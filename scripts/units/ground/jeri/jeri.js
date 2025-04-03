const dmgroups = require("md3/units/damagegroups")
const mygroups = [
  'basic','malis','unplated','simple','blaster'
]
const JeriT1 = extend(UnitType, "jeri-mech", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatUnit(mygroups),{}))
  }
});
JeriT1.constructor = () => extend(TankUnit, {});
dmgroups.addToGroups(mygroups,JeriT1)