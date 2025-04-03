const vfx = require("md3/libs/vfx")
const clumps = require("md3/blocks/spore-clumps")
const SporeT4 = extend(UnitType, "macrocybe-boat", {});
SporeT4.constructor = () => extend(UnitWaterMove, {});
SporeT4.immunities.add(StatusEffects.sporeSlowed);
SporeT4.immunities.add(StatusEffects.sapped);
let heal = extend(RegenAbility, {
  amount: 211/60,
  getBundle() {return 'ability.regen'},
})
SporeT4.abilities.add(heal);

const sporeFlame = extend(BulletType, {
  speed: 7,
  damage: 48,
  lifetime: 24,
  collidesAir: true,
  status: StatusEffects.sporeSlowed,
  statusDuration: 180,
  keepVelocity: false,
  hittable: false,
  pierce: true,
  pierceBuilding: true,
  hitSize: 20,
  shootEffect: vfx.macrocybeSpores,
  hitEffect: Fx.hitFlameSmall,
  despawnEffect: Fx.none,
  hitTile(b, build, x, y, initialHealth, direct) {
    this.super$hitTile(b, build, x, y, initialHealth, direct);
    if (true) {
      if (build.block.size >= 1 && build.block.size <= 4 && build.dead) {
        build.addPlan(true)
        let block = build.tile
        let clumpToPlace = clumps.clump1
        switch (build.block.size) {
          case 2:
            clumpToPlace = clumps.clump2
            break
          case 3:
            clumpToPlace = clumps.clump3
            break
          case 4:
            clumpToPlace = clumps.clump4
            break
        }
        block.setBlock(clumpToPlace, b.owner.team)
      }
    }
  }
})
const mainGun = extend(Weapon, {
  name: "md3-spore-branch",
  top: true,
  rotate: true,
  y: 2,
  x: 20,
  mirror: true,
  reload: 5,
  shootSound: Sounds.flame,
  inaccuracy: 7,
  rotateSpeed: 2,
  shootCone: 45,
  bullet: sporeFlame,
  recoil: 0,
  shootY: 39,
  ejectEffect: Fx.none
});
SporeT4.weapons.add(
  mainGun
);

Blocks.exponentialReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-agaricus-boat"),
  Vars.content.getByName(ContentType.unit, "md3-macrocybe-boat")
)
