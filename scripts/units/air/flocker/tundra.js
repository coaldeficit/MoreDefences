const vfx = require("md3/libs/vfx")
const bulLib = require("md3/libs/bulletlib")
const blockcheck = require("md3/libs/blockcheck")
const icewall = require("md3/blocks/frozen-wall")
const FlockT5 = extend(UnitType, "tundra-ship", {});
FlockT5.constructor = () => extend(UnitEntity, {});

const tundraBombFrag = extend(ShrapnelBulletType, {
  length: 125,
  width: 30,
  damage: 120,
  status: StatusEffects.freezing,
  statusDuration: 720,
  serrations: 18,
  serrationSpacing: 6.67,
  serrationWidth: 4,
  serrationLenScl: 2.5,
  serrationSpaceOffset: 50,
  serrationFadeOffset: 0,
  hitLarge: true,
  lifetime: 30,
  hitEffect: Fx.flakExplosion,
  fromColor: Color.valueOf("#ffffff"),
  toColor: Color.valueOf("#5ce7ff"),
  hitTile(b, build, x, y, initialHealth, direct) {
    this.super$hitTile(b, build, x, y, initialHealth, direct);
    if (true) {
      if (build.health <= build.maxHealth*0.3) {
        build.damage(b.owner.team, build.maxHealth+1)
      }
      if (build.block.size >= 1 && build.block.size <= 4 && build.dead) {
        build.addPlan(true)
        let block = build.tile
        let wallToPlace = icewall.frozenWall
        switch (build.block.size) {
          case 2:
            wallToPlace = icewall.frozenWallL
            break
          case 3:
            wallToPlace = icewall.frozenWallH
            break
          case 4:
            wallToPlace = icewall.frozenWallG
            break
        }
        block.setNet(wallToPlace, b.owner.team, 0)
      }
    }
  }
});
const tundraBomb = extend(BasicBulletType, {
  hitSound: Sounds.explosionQuad,
  hitEffect: Fx.massiveExplosion,
  despawnEffect: Fx.none,
  shootEffect: Fx.none,
  smokeEffect: Fx.none,
  width: 30,
  height: 30,
  frontColor: Color.valueOf("#ffffff"),
  backColor: Color.valueOf("#5ce7ff"),
  sprite: 'md3-plus-bomb',
  spin: 2,
  shrinkX: 0.45,
  shrinkY: 0.45,
  hitShake: 9,
  splashDamageRadius: 96,
  splashDamage: 180,
  status: StatusEffects.freezing,
  statusDuration: 300,
  speed: 4,
  drag: 4,
  collides: false,
  collidesAir: false,
  lifetime: 140,
  keepVelocity: false,
  hittable: false,
  fragBullets: 7,
  fragBullet: tundraBombFrag,
  range(){ // note to anyone reading: always override the range function for any bomb-type projectiles so that the unit ai actually uses them
    return 150
  },
  despawned(b){
    this.super$despawned(b)
    vfx.freezeBombExplosion.at(b.x, b.y);
    vfx.freezeBomb.at(b.x, b.y);
    vfx.b135impactShockwave.at(b.x, b.y);
    /*blockcheck.iterateSquareCenter(Math.round(b.x/8),Math.round(b.y/8),24,24,(other => {
      let rngValue = rng.randomUnsynced()
      if (other.build != null) {
        let o = other.block()
        if (o.size >= 1 && o.size <= 2 && rngValue < 200 && other.build.team != b.owner.team && other.build.tileX() == other.worldx()/8 && other.build.tileY() == other.worldy()/8) {
          if (other != null) {
            other.build.addPlan(true)
            other.setAir()
            switch (o.size) {
              case 1:
                other.setNet(icewall.frozenWall, b.owner.team, 0)
                break;
              case 2:
                other.setNet(icewall.frozenWallL, b.owner.team, 0)
                break;
            }
          }
        }
      }
    }));*/
  }
});

const bombCannon = extend(Weapon, {
  name: "md3-generic-bomber-weapon",
  minShootVelocity: 0.01,
  mirror: false,
  x: 0,
  shootY: 0,
  reload: 200,
  velocityRnd: 1,
  shootCone: 180,
  inaccuracy: 15,
  shootSound: Sounds.shootQuad,
  bullet: tundraBomb,
  autoTarget: true
});

const underdriveWeapon = extend(Weapon, { // CHANGING THIS DOES NOT AFFECT THE DISPLAYED STATS
  name: "md3-generic-bomber-weapon",
  mirror: false,
  x: 0,
  shootY: 0,
  reload: 10,
  shootCone: 361,
  shootSound: Sounds.none,
  alwaysShooting: true,
  display: false,
  bullet: extend(ExplosionBulletType, {
    splashDamage: -1,
    splashDamageRadius: -1,
    rangeOverride: 6,
    killShooter: false,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    collides: false,
    hittable: false,
    absorbable: false,
    damage: 0,
    despawned(b) {
      blockcheck.iterateSquareCenter(Math.round(b.owner.x/8),Math.round(b.owner.y/8),24,24,(other => {
        if (other.build != null && other.build.team != b.owner.team) {
          other.build.applySlowdown(0.667, 30)
        }
      }));
    }
  }),
});
const underdriveDeco1 = extend(SuppressionFieldAbility, {
  active: false,
  y: 39.5,
  x: 22.25,
  color: Color.valueOf("#5ce7ff"),
  particleColor: Color.valueOf("#5ce7ff"),
  effectColor: Color.valueOf("#5ce7ff"),
  particleLen: 5,
  orbRadius: 3,
  init() {
    this.display = true
  },
  getBundle() {return 'ability.md3-underdrive'},
  addStats(t) {
    t.add(Core.bundle.get(this.getBundle() + ".description")).wrap().width(this.descriptionWidth)
    t.row()
    t.add(Core.bundle.format("bullet.range", 12)); // CHANGING THESE DOES NOT AFFECT THE FUNCTION OF THE ABILITY
    t.row()
    t.add(this.abilityStat("md3-underdrive-decrease", 33.3));
    t.row()
    t.add(this.abilityStat("duration", 0.5));
  }
})
const underdriveDeco2 = extend(SuppressionFieldAbility, {
  active: false,
  y: 39.5,
  x: -22.25,
  color: Color.valueOf("#5ce7ff"),
  particleColor: Color.valueOf("#5ce7ff"),
  effectColor: Color.valueOf("#5ce7ff"),
  particleLen: 5,
  orbRadius: 3,
  init() {
    this.display = false
  }
})
const underdriveDeco3 = extend(SuppressionFieldAbility, {
  active: false,
  y: -38,
  x: 21,
  color: Color.valueOf("#5ce7ff"),
  particleColor: Color.valueOf("#5ce7ff"),
  effectColor: Color.valueOf("#5ce7ff"),
  particleLen: 5,
  orbRadius: 3,
  init() {
    this.display = false
  }
})
const underdriveDeco4 = extend(SuppressionFieldAbility, {
  active: false,
  y: -38,
  x: -21,
  color: Color.valueOf("#5ce7ff"),
  particleColor: Color.valueOf("#5ce7ff"),
  effectColor: Color.valueOf("#5ce7ff"),
  particleLen: 5,
  orbRadius: 3,
  init() {
    this.display = false
  }
})
const underdriveDeco5 = extend(SuppressionFieldAbility, {
  active: false,
  y: -29.25,
  x: 32.75,
  color: Color.valueOf("#5ce7ff"),
  particleColor: Color.valueOf("#5ce7ff"),
  effectColor: Color.valueOf("#5ce7ff"),
  particleLen: 5,
  orbRadius: 3,
  init() {
    this.display = false
  }
})
const underdriveDeco6 = extend(SuppressionFieldAbility, {
  active: false,
  y: -29.25,
  x: -32.75,
  color: Color.valueOf("#5ce7ff"),
  particleColor: Color.valueOf("#5ce7ff"),
  effectColor: Color.valueOf("#5ce7ff"),
  particleLen: 5,
  orbRadius: 3,
  init() {
    this.display = false
  }
})
FlockT5.abilities.addAll(
  underdriveDeco1,
  underdriveDeco2,
  underdriveDeco3,
  underdriveDeco4,
  underdriveDeco5,
  underdriveDeco6
)

FlockT5.weapons.add(
  bombCannon,
  underdriveWeapon
);

Blocks.tetrativeReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-messenger-ship"),
  Vars.content.getByName(ContentType.unit, "md3-tundra-ship")
)
