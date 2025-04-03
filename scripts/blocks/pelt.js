const dmgroups = require("md3/units/damagegroups")
const mditems = require("md3/items")
const mygroups = [
  'basic','ironclad','battleship','attractor'
]
let pelt = extend(ItemTurret, "pelt", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatTurret(mygroups,[1.5,1,0.5,0.25]),{}))
  }
});
let cobaltBullet = extend(BasicBulletType, {
  speed: 7,
  damage: 10,
  lifetime: 26,
  collidesAir: false,
  ammoMultiplier: 1,
  width: 8,
  height: 12,
  hitEntity(b, entity, health) {
    let mult = 1
    if (entity instanceof Unit) {
      if (dmgroups.isInGroup('basic',entity.type)) mult = 1.5
      if (dmgroups.isInGroup('ironclad',entity.type)) mult = 1
      if (dmgroups.isInGroup('battleship',entity.type)) mult = 0.5
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
let bulletumBullet = extend(BasicBulletType, {
  speed: 7,
  damage: 25,
  lifetime: 26,
  collidesAir: false,
  ammoMultiplier: 3,
  width: 8,
  height: 12,
  reloadMultiplier: 0.666,
  backColor: Color.valueOf("CB4A9B"),
  frontColor: Color.valueOf("E971BD"),
  hitEntity(b, entity, health) {
    let mult = 1
    if (entity instanceof Unit) {
      if (dmgroups.isInGroup('basic',entity.type)) mult = 1.5
      if (dmgroups.isInGroup('ironclad',entity.type)) mult = 1
      if (dmgroups.isInGroup('battleship',entity.type)) mult = 0.5
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
// todo: plast ammo
pelt.ammo(
  mditems.cobalt, cobaltBullet,
  mditems.bulletum, bulletumBullet,
);
pelt.unitSort = (u,x,y)=>{return Mathf.dst2(u.x, u.y, x, y)/(dmgroups.isInGroup('basic',u.type)&&!dmgroups.isInGroup('ironclad',u.type)&&!dmgroups.isInGroup('battleship',u.type)&&!dmgroups.isInGroup('attractor',u.type)?4:1)}