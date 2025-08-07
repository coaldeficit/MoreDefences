const dmgroups = require("md3/units/damagegroups")
const vfx = require("md3/libs/vfx")
const bulLib = require("md3/libs/bulletlib")
const mygroups = [
  'basic','malis','unplated','detonator'
]
const BellaT1 = extend(UnitType, "bella-ship", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatUnit(mygroups),{}))
  }
});
BellaT1.constructor = () => extend(UnitEntity, {});
dmgroups.addToGroups(mygroups,BellaT1)
const shootsound = Vars.tree.loadSound("bella-spear")
const pileBunker = extend(Weapon, {
  name: "md3-bella-pile",
  top: false,
  rotate: true,
  y: 0,
  x: 5.375,
  inaccuracy: 0,
  reload: 180,
  shootSound: shootsound,
  mirror: false,
  rotateSpeed: 0,
  shootCone: 20,
  recoil: -6,
  layerOffset: -0.1,
  parentizeEffects: true,
  bullet: extend(RailBulletType, {
    length: 48,
    damage: 80,
    pierceCap: 2,
	shootEffect: vfx.bellaBlast,
	chargeEffect: vfx.bellaCharge,
	handlePierce(b,initialHealth,x,y){
	  this.super$handlePierce(b,initialHealth,x,y)
	  b.owner.vel.add(Tmp.v1.trns(b.rotation() + 180, 6))
	}
  }),
});
pileBunker.shoot.firstShotDelay = 30

BellaT1.weapons.add(pileBunker)
