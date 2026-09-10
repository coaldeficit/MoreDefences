const dmgroups = require("md3/units/damagegroups")
const vfx = require("md3/libs/vfx")
const bulLib = require("md3/libs/bulletlib")
const mygroups = [
  'malis','unplated','walker','meson'
]
const BellaT2 = extend(UnitType, "burgessia-ship", {
  setStats() {
	this.super$setStats()
	this.stats.add(dmgroups.groupStatUnit, StatValues.string(dmgroups.generateGroupStatUnit(mygroups),{}))
  }
});
BellaT2.constructor = () => extend(UnitEntity, {});
dmgroups.addToGroups(mygroups,BellaT2)
const shootsound = Vars.tree.loadSound("bella-spear")
const pileBunker = extend(Weapon, {
  name: "md3-burgessia-pile",
  top: false,
  rotate: true,
  y: 3.625,
  x: -7.125,
  inaccuracy: 0,
  reload: 180,
  shootSound: shootsound,
  mirror: false,
  rotateSpeed: 2.5,
  shootCone: 10,
  recoil: 0,
  layerOffset: 0.1,
  parentizeEffects: true,
  shootY: 5,
  bullet: extend(RailBulletType, {
    length: 60,
    damage: 100,
    pierceCap: 2,
	shootEffect: vfx.burgessiaBlast,
	chargeEffect: vfx.bellaCharge,
	handlePierce(b,initialHealth,x,y){
	  this.super$handlePierce(b,initialHealth,x,y)
	  b.owner.vel.add(Tmp.v1.trns(b.rotation() + 180, 4))
	}
  }),
});
let spearRegion = new RegionPart("-spear")
spearRegion.progress = DrawPart.PartProgress.recoil
spearRegion.layerOffset = -0.01
spearRegion.y = -2.125
spearRegion.moveY = 10
pileBunker.parts.add(spearRegion)
pileBunker.shoot.firstShotDelay = 30

const flamethrower = extend(Weapon, {
  top: false,
  rotate: false,
  y: -5.5,
  x: 4.5,
  inaccuracy: 0,
  reload: 20,
  shootSound: Sounds.shootFlame,
  mirror: false,
  rotateSpeed: 0,
  shootCone: 20,
  bullet: extend(BulletType, {
    speed: 4.2,
	damage: 20,
	hitSize: 9,
	lifetime: 18,
	status: StatusEffects.burning,
	statusDuration: 240,
	shootEffect: vfx.burgessiaFlame,
	hitEffect: Fx.hitFlameSmall,
	despawnEffect: Fx.none,
	hittable: false,
	rangeOverride: 64,
  }),
});

BellaT2.weapons.addAll(
  pileBunker,
  flamethrower
)