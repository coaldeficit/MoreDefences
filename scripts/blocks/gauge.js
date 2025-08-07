const dmgroups = require("md3/units/damagegroups")
const mditems = require("md3/items")
const statuses = require("md3/status-effects")
const mygroups = [
  'unplated','walker','ironclad','attractor'
]
let gauge = extend(ItemTurret, "gauge", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatTurret(mygroups,[1.5,1,0.25,0.75]),{}))
  }
});
let bromineBullet = extend(BasicBulletType, {
  speed: 11,
  damage: 40,
  lifetime: 11,
  ammoMultiplier: 1,
  width: 5,
  height: 12,
  frontColor: Color.valueOf("FF7700"),
  backColor: Color.valueOf("A33600"),
  trailColor: Color.valueOf("A33600"),
  trailWidth: 1.5,
  trailLength: 12,
  trailChance: 0,
  layer: 113,
  status: statuses.brominatedEffect,
  statusDuration: 60,
  hitEntity(b, entity, health) {
    let mult = 1
    if (entity instanceof Unit) {
      if (dmgroups.isInGroup('unplated',entity.type)) mult = 1.5
      if (dmgroups.isInGroup('walker',entity.type)) mult = 1
      if (dmgroups.isInGroup('ironclad',entity.type)) mult = 0.25
      if (dmgroups.isInGroup('attractor',entity.type)) mult = 0.75
      if (mult != 1) {
        b.damage *= mult
        if (mult > 1) b.data = "crit"
      }
    }
    this.super$hitEntity(b, entity, health);
    if (mult != 1) {
      b.damage /= mult
      b.data = null
    }
  }
})
gauge.ammo(
  mditems.bromine, bromineBullet,
);
gauge.unitSort = (u,x,y)=>{return Mathf.dst2(u.x, u.y, x, y)/(dmgroups.isInGroup('unplated',u.type)&&!dmgroups.isInGroup('walker',u.type)&&!dmgroups.isInGroup('ironclad',u.type)&&!dmgroups.isInGroup('attractor',u.type)?4:1)}
