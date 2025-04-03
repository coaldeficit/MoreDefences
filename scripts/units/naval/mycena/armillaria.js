const SporeT5 = extend(UnitType, "armillaria-boat", {});
SporeT5.constructor = () => extend(UnitWaterMove, {});
SporeT5.immunities.add(StatusEffects.sporeSlowed);
SporeT5.immunities.add(StatusEffects.sapped);
let heal = extend(RegenAbility, {
  amount: 193/60,
  getBundle() {return 'ability.regen'},
})
SporeT5.abilities.add(heal);
const bombExplosionBullet = extend(BasicBulletType, {
  speed: 8,
  damage: 16,
  ammoMultiplier: 1,
  lifetime: 21,
  frontColor: Color.valueOf("ffffff"),
  backColor: Color.valueOf("c561ff"),
  height: 90,
  width: 5,
  shrinkY: 0,
  shrinkX: 0,
  keepVelocity: false,
  buildingDamageMultiplier: 1.75,
  shieldDamageMultiplier: 0.5,
  status: StatusEffects.sapped,
  statusDuration: 30,
  update(b) {
    if (b.time < 1) {
      Sounds.mediumCannon.at(b.x, b.y, Mathf.random(0.8,1.2))
      b.time++
    }
  }
})
const bombExplosion = extend(BulletType, {
  speed: 0,
  damage: 0,
  ammoMultiplier: 1,
  lifetime: 360,
  height: 20,
  width: 20,
  shrinkY: 0,
  shrinkX: 0,
  collides: false,
  hittable: false,
  reflectable: false,
  absorbable: false,
  keepVelocity: false,
  intervalBullets: 16,
  bulletInterval: 5,
  intervalDelay: 60,
  intervalSpread: 120,
  intervalRandomSpread: 10,
  intervalAngle: 180,
  intervalBullet: bombExplosionBullet,
  draw(b) {
    Draw.z(110)
    Draw.color(Color.valueOf("c561ff"))
    Fill.circle(b.x, b.y, b.time<60?(Math.log((b.time+0.06)/60)+Math.PI)*8:(Math.PI-((b.time-60)*(Math.PI/300)))*8);
    Draw.color(Color.valueOf("ffffff"))
    Fill.circle(b.x, b.y, b.time<60?Math.max(0,((Math.log((b.time+0.06)/60)+Math.PI)*8)-6):Math.max(0,((Math.PI-((b.time-60)*(Math.PI/300)))*8)-6));
  }
})
const bomb = extend(BasicBulletType, {
  speed: 2,
  damage: 800,
  ammoMultiplier: 1,
  lifetime: 96,
  frontColor: Color.valueOf("ffffff"),
  backColor: Color.valueOf("c561ff"),
  height: 20,
  width: 20,
  shrinkY: 0,
  shrinkX: 0,
  collidesAir: false,
  keepVelocity: false,
  reflectable: false,
  sprite: 'circle-bullet',
  fragBullets: 1,
  fragRandomSpread: 0,
  fragBullet: bombExplosion,
  rangeOverride: 350,
  draw(b) {
    if ((b.time % 12) < 8) this.super$draw(b)
  },
  createFrags(b,x,y) {
    this.super$createFrags(b,x,y)
    Sounds.largeExplosion.at(x, y, Mathf.random(0.8,1.2))
    Sounds.titanExplosion.at(x, y, Mathf.random(0.8,1.2))
    Sounds.explosionbig.at(x, y, Mathf.random(0.8,1.2))
  }
})
const bombGun = extend(Weapon, {
  name: "md3-armillaria-cannon",
  top: true,
  rotate: true,
  y: 22,
  x: 0,
  mirror: false,
  reload: 600,
  shootSound: Sounds.malignShoot,
  inaccuracy: 0,
  rotateSpeed: 1.5,
  bullet: bomb,
});
const bladeBullet = extend(BasicBulletType, {
  speed: 5,
  damage: 163,
  ammoMultiplier: 1,
  lifetime: 50,
  frontColor: Color.valueOf("ffffff"),
  backColor: Color.valueOf("c561ff"),
  height: 17,
  width: 17,
  shrinkY: 0,
  shrinkX: 0,
  keepVelocity: false,
  status: StatusEffects.sporeSlowed,
  statusDuration: 120,
  spin: 14,
  sprite: 'md3-blade-bullet',
  shieldDamageMultiplier: 0.25,
})
const shootsound = Vars.tree.loadSound("armillaria-blade")
const bladeGunA = extend(Weapon, {
  name: "md3-bladegun-side",
  top: true,
  rotate: true,
  y: 2,
  x: 11,
  mirror: true,
  reload: 16,
  shootSound: shootsound,
  inaccuracy: 12,
  rotateSpeed: 3,
  bullet: bladeBullet,
});
const bladeGunB = extend(Weapon, {
  name: "md3-bladegun-side",
  top: true,
  rotate: true,
  y: -16,
  x: 11,
  mirror: true,
  reload: 16,
  shootSound: shootsound,
  inaccuracy: 12,
  rotateSpeed: 3,
  bullet: bladeBullet,
});
bladeGunB.shoot.firstShotDelay = 8
SporeT5.weapons.add(
  bombGun,
  bladeGunA,
  bladeGunB,
);

Blocks.tetrativeReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-macrocybe-boat"),
  Vars.content.getByName(ContentType.unit, "md3-armillaria-boat")
)
