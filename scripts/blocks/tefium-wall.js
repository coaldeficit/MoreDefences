const tefiumWallProjectile = extend(MissileBulletType, {});

tefiumWallProjectile.speed = 6
tefiumWallProjectile.damage = 60
tefiumWallProjectile.lifetime = 60
tefiumWallProjectile.homingPower = 0.05
tefiumWallProjectile.homingRange = 75
tefiumWallProjectile.frontColor = Color.valueOf('#ffffff')
tefiumWallProjectile.backColor = Color.valueOf('#00875a')

const tefiumWall = extendContent(Wall, "tefium-wall", {
  load(){
    this.super$load();
    this.region = Core.atlas.find("md3-tefium-wall")
  },
  update(tile){
    this.super$update(tile);
    if (tile.ent().timer.get(this.shootTefiumWallProjectile, 120)) {
      Bullet.create(tefiumWallProjectile, this.getTeam(), this.x, this.y, this.rotation, 1, 1)
      print('it works');
    };
  }
});
tefiumWall.shootTefiumWallProjectile = tefiumWall.timers++;
