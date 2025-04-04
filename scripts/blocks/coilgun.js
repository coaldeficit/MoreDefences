const vfx = require("md3/libs/vfx")

let coilgun = extend(ItemTurret, "coilgun", {
  targetInterval: 5,
  newTargetInterval: 5,
});
let plast = extend(RailBulletType, {
  shootEffect: vfx.coilgunShoot,
  hitEffect: vfx.coilgunHit,
  pierceEffect: vfx.coilgunHitB,
  smokeEffect: Fx.smokeCloud,
  pointEffect: vfx.coilgunTrail,
  despawnEffect: vfx.coilgunBomb,
  pointEffectSpace: 10,
  damage: 360,
  maxDamageFraction: 0.25,
  pierceCap: 4,
  length: 258,
  ammoMultiplier: 1,
  status: StatusEffects.electrified,
  statusDuration: 180,
})
coilgun.ammoTypes.put(
  Items.plastanium, plast
);
coilgun.unitSort = (u,x,y)=>{return u.getDuration(StatusEffects.electrified) + (Mathf.dst2(u.x, u.y, x, y) / 640000)}