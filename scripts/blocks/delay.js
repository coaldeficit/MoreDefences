const statuses = require("md3/status-effects")

let delay = extend(ContinuousLiquidTurret, "delay", {
  liquidConsumed: 20/60,
  outlineColor: Pal.darkOutline,
  shootY: ((4*8)/2)+4,
  targetInterval: 5,
  newTargetInterval: 5,
});
let laser = extend(ContinuousLaserBulletType, {
  damage: 2.5,
  incendAmount: -1,
  incendSpread: -1,
  incendChange: -1,
  largeHit: false,
  length: 240,
  width: 3,
  shake: 0,
  ammoMultiplier: 1,
  status: statuses.delayedEffect,
  statusDuration: 600,
  colors: [
    Color.valueOf("#00ffff55"),
    Color.valueOf("#00ffffaa"),
    Color.valueOf("#7fffff"),
    Color.white
  ],
  lightColor: Color.valueOf("#00ffff")
})
let laserOzone = laser.copy()
laserOzone.damage /= 2
laserOzone.pierceCap = 4
laserOzone.length -= 60
laserOzone.rangeChange = -60
laserOzone.colors = [
  Color.valueOf("#fc81dd55"),
  Color.valueOf("#fc81ddaa"),
  Color.valueOf("#fec1ef"),
  Color.white
]
laserOzone.lightColor = Color.valueOf("#fc81dd")
delay.ammo(
  Liquids.ozone, laserOzone,
  Liquids.nitrogen, laser,
);

delay.unitSort = (u,x,y)=>{return u.getDuration(statuses.delayedEffect) + (Mathf.dst2(u.x, u.y, x, y) / 6400)}