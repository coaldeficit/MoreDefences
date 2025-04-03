let puncture = extend(ItemTurret, "puncture", {
  unitFilter: {
    get(u) {
      return Vars.world.floorWorld(u.x, u.y).isLiquid
    }
  } 
});
let titaMissile = extend(MissileBulletType, {
  speed: 10,
  damage: 14,
  splashDamage: 11,
  splashDamageRadius: 16,
  lifetime: 24,
  homingPower: 0.035,
  homingRange: 150,
  collidesAir: false,
  backColor: Color.valueOf("449fdb"),
  frontColor: Color.valueOf("ffffff"),
  trailColor: Color.valueOf("449fdb"),
  trailWidth: 2,
  trailLength: 9,
  trailChance: 0,
  update(b) {
    if (Math.round(b.time) >= 3) {
        if (!Vars.world.floorWorld(b.x, b.y).isLiquid) {
            b.remove()
        }
    }
    this.super$update(b);
  },
  hitEntity(b, entity, health) {
    let crit = false
    if (entity instanceof Unit) {
      if (entity.maxHealth - health < 150) {
        b.damage *= 11
        crit = true
        b.data = "crit"
      }
    }
    this.super$hitEntity(b, entity, health);
    if (crit) {
      b.damage /= 11
      b.data = null
      crit = false
    }
  }
})
// todo: plast ammo
puncture.ammo(
  Items.titanium, titaMissile
);