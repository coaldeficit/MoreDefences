const vfx = require("md3/libs/vfx")

let juan = extend(ItemTurret, "juan", {});
let blast = extend(RailBulletType, {
  shootEffect: vfx.juanBlast,
  smokeEffect: vfx.juanSmoke,
  hitSound: Sounds.bigshot,
  damage: 7000,
  length: 160,
  ammoMultiplier: 1,
  status: StatusEffects.unmoving,
  statusDuration: 180,
  pierceArmor: true,
})
juan.ammoTypes.put(
  Items.blastCompound, blast
);