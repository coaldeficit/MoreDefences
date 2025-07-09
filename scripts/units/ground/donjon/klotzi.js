const dmgroups = require("md3/units/damagegroups")
const statuses = require("md3/status-effects")
const mygroups = [
  'malis','ironclad','walker'
]
const DonT2 = extend(UnitType, "klotzi-mech", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatUnit(mygroups),{}))
  }
});
DonT2.constructor = () => extend(CrawlUnit, {});
DonT2.defaultController = () => extend(HugAI, {});
dmgroups.addToGroups(mygroups,DonT2)

DonT2.immunities.add(statuses.brominatedEffect);