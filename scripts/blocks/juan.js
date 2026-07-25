const vfx = require("md3/libs/vfx")

let juan = extend(ItemTurret, "juan", {
  buildingFilter: {
    get(u) {
      return u.maxHealth >= 10000 && u.size >= 3
    }
  }
});
let blast = extend(RailBulletType, {
  shootEffect: vfx.juanBlast,
  smokeEffect: vfx.juanSmoke,
  hitSound: Vars.tree.loadSound("md3-bigshot"), // cungadero
  damage: 7000,
  length: 240,
  ammoMultiplier: 1,
  status: StatusEffects.unmoving,
  statusDuration: 180,
  pierceArmor: true,
  buildingDamageMultiplier: 0.5,
})
juan.ammoTypes.put(
  Items.blastCompound, blast
);