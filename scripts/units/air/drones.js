const dmgroups = require("md3/units/damagegroups")
const AssDrone = extend(UnitType, "assault-drone", {});
AssDrone.constructor = () => extend(TimedKillUnit, {});
const tronigroups = [
  'basic','malis','simple','unplated','attractor'
]
const AssEmblyDrone = extend(UnitType, "autoassembly-drone", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatUnit(tronigroups),{}))
  }
});
AssEmblyDrone.constructor = () => extend(BuildingTetherPayloadUnit, {});
dmgroups.addToGroups(tronigroups,AssEmblyDrone)