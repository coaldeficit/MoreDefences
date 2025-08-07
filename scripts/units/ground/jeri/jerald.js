const dmgroups = require("md3/units/damagegroups")
const mygroups = [
  'malis','unplated','simple','battleship'
]
const JeriT2 = extend(UnitType, "jerald-mech", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatUnit(mygroups),{}))
  }
});
JeriT2.constructor = () => extend(TankUnit, {});
dmgroups.addToGroups(mygroups,JeriT2)