const dmgroups = require("md3/units/damagegroups")
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