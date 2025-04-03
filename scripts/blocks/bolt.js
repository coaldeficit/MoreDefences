const dmgroups = require("md3/units/damagegroups")
const mditems = require("md3/items")
const vfx = require("md3/libs/vfx")
const mygroups = [
  'ironclad','unplated','battleship','attractor'
]
let bolt = extend(ItemTurret, "bolt", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatTurret(mygroups,[1.5,0.5,1,0.25]),{}))
  }
});
let lithiumBullet = extend(PointBulletType, {
  damage: 130,
  lifetime: 50,
  ammoMultiplier: 1,
  trailEffect: vfx.boltTrailLithium,
  trailSpacing: 5,
  hitEntity(b, entity, health) {
    let mult = 1
    if (entity instanceof Unit) {
      if (dmgroups.isInGroup('ironclad',entity.type)) mult = 1.5
      if (dmgroups.isInGroup('unplated',entity.type)) mult = 0.5
      if (dmgroups.isInGroup('battleship',entity.type)) mult = 1
      if (dmgroups.isInGroup('attractor',entity.type)) mult = 0.25
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
let bulletumBullet = extend(PointBulletType, {
  damage: 288,
  lifetime: 50,
  ammoMultiplier: 3,
  trailEffect: vfx.boltTrailBulletum,
  trailSpacing: 5,
  reloadMultiplier: 0.75,
  hitEntity(b, entity, health) {
    let mult = 1
    if (entity instanceof Unit) {
      if (dmgroups.isInGroup('ironclad',entity.type)) mult = 1.5
      if (dmgroups.isInGroup('unplated',entity.type)) mult = 0.5
      if (dmgroups.isInGroup('battleship',entity.type)) mult = 1
      if (dmgroups.isInGroup('attractor',entity.type)) mult = 0.25
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
bolt.ammo(
  mditems.lithium, lithiumBullet,
  mditems.bulletum, bulletumBullet,
);
bolt.unitSort = (u,x,y)=>{return Mathf.dst2(u.x, u.y, x, y)/(dmgroups.isInGroup('ironclad',u.type)&&!dmgroups.isInGroup('unplated',u.type)&&!dmgroups.isInGroup('battleship',u.type)&&!dmgroups.isInGroup('attractor',u.type)?4:1)}