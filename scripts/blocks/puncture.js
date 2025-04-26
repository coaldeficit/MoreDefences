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
      if (entity.maxHealth - health < 75) {
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
let plastMissile = extend(MissileBulletType, {
  speed: 6.667,
  damage: 28,
  splashDamage: 16,
  splashDamageRadius: 32,
  lifetime: 36,
  homingPower: 0.035*(2/3),
  homingRange: 150,
  collidesAir: false,
  backColor: Color.valueOf("CBD97F"),
  frontColor: Color.valueOf("ffffff"),
  trailColor: Color.valueOf("CBD97F"),
  trailWidth: 2,
  trailLength: 13.5,
  trailChance: 0,
  maxDamageFraction: 0.5,
  intervalBullets: 1,
  bulletInterval: 8,
  intervalDelay: 4,
  intervalRandomSpread: 10,
  intervalBullet: extend(BasicBulletType, {
    speed: 2,
    damage: 3,
    pierceArmor: true,
    lifetime: 64,
    frontColor: Color.valueOf("ffffff"),
    backColor: Color.valueOf("CBD97F"),
    height: 10,
    width: 5,
    update(b) {
      if (!Vars.world.floorWorld(b.x, b.y).isLiquid) {
        b.remove()
      }
      this.super$update(b);
    },
  }),
  update(b) {
    if (Math.round(b.time) >= 4.5) {
      if (!Vars.world.floorWorld(b.x, b.y).isLiquid) {
        b.remove()
      }
    }
    this.super$update(b);
  },
  hitEntity(b, entity, health) {
    let crit = false
    let dmg = b.damage
    if (entity instanceof Unit) {
      if (entity.maxHealth - health < 120) {
        b.damage *= 8.64
        crit = true
        b.data = "crit"
      }
    }
    this.super$hitEntity(b, entity, health);
    if (crit) {
      b.damage = dmg
      b.data = null
      crit = false
    }
  }
})
puncture.ammo(
  Items.titanium, titaMissile,
  Items.plastanium, plastMissile
);