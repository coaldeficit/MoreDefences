const buckshotStandard = extend(BasicBulletType, {
});
buckshotStandard.speed = 5;
buckshotStandard.damage = 10;
buckshotStandard.lifetime = 45;
buckshotStandard.height = 5;
buckshotStandard.width = 3;

const buckshotDense = extend(BasicBulletType, {
});
buckshotDense.speed = 5;
buckshotDense.damage = 20;
buckshotDense.lifetime = 45;
buckshotDense.reloadMultiplier = 0.6;
buckshotDense.height = 7.5;
buckshotDense.width = 4.5;
buckshotDense.backColor = Color.valueOf('64c1e3');

const buckshotIncendiary = extend(BasicBulletType, {
});
buckshotIncendiary.speed = 6;
buckshotIncendiary.damage = 11;
buckshotIncendiary.lifetime = 40;
buckshotIncendiary.incendAmount = 1;
buckshotIncendiary.incendSpread = 4;
buckshotIncendiary.ammoMultiplier = 3;
buckshotIncendiary.height = 5;
buckshotIncendiary.width = 3;
buckshotIncendiary.frontColor = Color.valueOf('fffde0');
buckshotIncendiary.backColor = Color.valueOf('ff8400');

const buckshotHoming = extend(BasicBulletType, {
});
buckshotHoming.speed = 5;
buckshotHoming.damage = 13;
buckshotHoming.lifetime = 45;
buckshotHoming.homingPower = 0.1;
buckshotHoming.ammoMultiplier = 2;
buckshotHoming.height = 5;
buckshotHoming.width = 3;
buckshotHoming.reloadMultiplier = 1.5;

const buckshotExplosive = extend(BasicBulletType, {
});
buckshotExplosive.speed = 5;
buckshotExplosive.damage = 16;
buckshotExplosive.lifetime = 60;
buckshotExplosive.ammoMultiplier = 5;
buckshotExplosive.reloadMultiplier = 0.7;
buckshotExplosive.height = 5;
buckshotExplosive.width = 3;
buckshotExplosive.backColor = Color.valueOf('e37764');
buckshotExplosive.explodeRange = 20;
buckshotExplosive.splashDamage = 9;
buckshotExplosive.splashDamageRadius = 20;

const buckshot = extendContent(ItemTurret, "buckshot", {
  init(){
    buckshot.ammo(
      Items.copper, buckshotStandard,
      Items.graphite, buckshotDense,
      Items.silicon, buckshotHoming,
      Items.pyratite, buckshotIncendiary,
      Items.blastCompound, buckshotExplosive
      );
    this.super$init();
    }
});
