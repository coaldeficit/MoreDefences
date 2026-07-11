const vfx = require("md3/libs/vfx")
const bulLib = require("md3/libs/bulletlib")

const Ara = extend(UnitType, "araneamento", {});
Ara.constructor = () => extend(LegsUnit, {});

const laserGun = extend(Weapon, {
  name: "md3-generic-bomber-weapon",
  top: true,
  y: 0,
  x: 0,
  mirror: false,
  reload: 75,
  shootSound: Sounds.shootLancer,
  inaccuracy: 0,
  rotate: false,
  shoot: new ShootMulti(new ShootPattern, extend(ShootPattern,{
    shots: 3,
    shotDelay: 8
  }), extend(ShootPattern,{
    shots: 2,
    shotDelay: 19,
    firstShotDelay: 36
  })),
  bullet: bulLib.makeBullet({
    type: LaserBulletType,
    damage: 55,
    recoil: 0,
    sideAngle: 30,
    sideWidth: 1,
    sideLength: 45,
	length: 120,
    pierceBuilding: true,
	lifetime: 64,
	colors: [Color.valueOf("#C3495466"),Color.valueOf("#C34954"),Color.white]
  }),
});
laserGun.shoot.shots = 5

const mortar = extend(Weapon, {
  name: "md3-araneamento-cannon",
  top: true,
  y: -6,
  x: 0,
  mirror: false,
  reload: 540,
  shootSound: Sounds.shootArtillerySapBig,
  inaccuracy: 0,
  rotate: true,
  shoot: extend(ShootPattern,/*7,51.42,*/{
    shots: 7,
    shotDelay: 18,
    firstShotDelay: 18
  }),
  alwaysShooting: true,
  rotateSpeed: 0,
  recoil: 0,
  bullet: bulLib.makeBullet({
    type: ArtilleryBulletType,
    speed: 2,
    splashDamage: 1800,
    splashDamageRadius: 56,
    hittable: false,
    lifetime: 145,
	drag: 0.02,
    frontColor: Color.valueOf("#FC8E6C"),
    backColor: Color.valueOf("#C34954"),
    hitEffect: vfx.redExplosion,
    width: 19,
    height: 27,
	shrinkInterp: Interp.linear,
    fragBullets: 7,
    fragLifeMin: 0.5,
    fragBullet: bulLib.makeBullet({
      type: ArtilleryBulletType,
      speed: 2,
      splashDamage: 400,
      splashDamageRadius: 46,
      hittable: false,
      width: 19,
      lifetime: 70,
	  drag: 0.04,
      frontColor: Color.valueOf("#FC8E6C"),
      backColor: Color.valueOf("#C34954"),
    }),
  }),
  update(unit,mount) {
    mount.rotation = -unit.rotation + 90 + (-360/3.5) + 360*Math.max(414,mount.reload)/126
    this.super$update(unit,mount)
  }
});
mortar.parts.addAll(
  new RegionPart("-top")
)
mortar.parts.get(0).params.set(
  0,0,0,0,0,0,0,0,0
)

Ara.weapons.add(
  laserGun,
  mortar
);