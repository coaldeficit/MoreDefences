let shieldlayer = extend(ItemTurret, "shieldlayer", {
  drawPlace(x,y,rotation,valid) {
    this.super$drawPlace(x,y,rotation,valid)
    Drawf.dashCircle(x*8, y*8, 8*8.5, Pal.accent)
  }
});
shieldlayer.buildType = () => extend(ItemTurret.ItemTurretBuild, shieldlayer, {
  drawSelect() {
    this.super$drawSelect()
    Drawf.dashCircle(this.x, this.y, 8*8.5, Pal.accent)
  }
});
const siliMine = extend(MissileUnitType, "shieldmine", {
  speed: 2,
  hitSize: 6,
  accel: 0,
  drag: 1/30,
  physics: false,
  lifetime: 360,
  loopSound: Sounds.none,
  rotateSpeed: 0,
  trailLength: 0,
  engineSize: 0,
  wobble: false,
  flying: false,
  health: 60,
});
const siliMineField = extend(Weapon, {
  shootCone: 361,
  x: 0,
  mirror: false,
  reload: 10,
  alwaysShooting: true,
  shootSound: Sounds.none,
  bullet: extend(BulletType, {
    damage: 0,
    splashDamage: 1,
    splashDamageRadius: 32,
    lifetime: 0,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
  })
})
const siliMineDisplay = extend(Weapon, {
  shootCone: -1,
  noAttack: true,
  useAttackRange: false,
  bullet: extend(BulletType, {
    damage: 130,
    ammoMultiplier: 3,
    intervalBullet: siliMineField.bullet,
    bulletInterval: 10,
  })
})
siliMine.weapons.add(
  siliMineDisplay,
  siliMineField
);
siliMine.abilities.add(new ForceFieldAbility(32, 0.3, 100, 999999));
const phaseMine = extend(MissileUnitType, "shieldmine-big", {
  speed: 2,
  hitSize: 6,
  accel: 0,
  drag: 1/30,
  physics: false,
  lifetime: 720,
  loopSound: Sounds.none,
  rotateSpeed: 0,
  trailLength: 0,
  engineSize: 0,
  wobble: false,
  flying: false,
  health: 120,
});
const phaseMineField = extend(Weapon, {
  shootCone: 361,
  x: 0,
  mirror: false,
  reload: 10,
  alwaysShooting: true,
  shootSound: Sounds.none,
  bullet: extend(BulletType, {
    damage: 0,
    splashDamage: 4,
    splashDamageRadius: 44,
    lifetime: 0,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
  })
})
const phaseMineDisplay = extend(Weapon, {
  shootCone: -1,
  noAttack: true,
  useAttackRange: false,
  bullet: extend(BulletType, {
    damage: 350,
    ammoMultiplier: 2,
    reloadMultiplier: 0.5,
    intervalBullet: phaseMineField.bullet,
    bulletInterval: 10,
  })
})
phaseMine.weapons.add(
  phaseMineDisplay,
  phaseMineField
);
phaseMine.abilities.add(new ForceFieldAbility(44, 0.6, 320, 999999));
let siliBullet = extend(BulletType, {
  spawnUnit: siliMine,
  ammoMultiplier: 3
})
let phaseBullet = extend(BulletType, {
  spawnUnit: phaseMine,
  ammoMultiplier: 2,
  reloadMultiplier: 0.5
})
shieldlayer.ammo(
  Items.silicon, siliBullet,
  Items.phaseFabric, phaseBullet
);
