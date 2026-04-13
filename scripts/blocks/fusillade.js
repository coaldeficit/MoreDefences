const vfx = require("md3/libs/vfx")
const overheatCap = 60*60

let fusillade = extend(ItemTurret, "fusillade", {
  unitFilter: {
    get(u) {
      return u.maxHealth >= 200-u.armor
    }
  },
  setBars(){
    this.super$setBars();
    this.addBar("overheat", func(e =>
      new Bar(
        prov(() => (e.getOverheatState() < 0 ? Core.bundle.format("bar.md3-fusillade-overheat") : Core.bundle.format("bar.md3-fusillade-cool")) + ": " + Math.floor(Math.abs(e.getOverheatState()/6))/10 + "s"),
        prov(() => (e.getOverheatState() < 0 ? Pal.health : Pal.lightOrange)),
        floatp(() => Math.min(Math.abs(e.getOverheatState())/overheatCap,1))
      ))
    )
  }
});
fusillade.buildType = () => extend(ItemTurret.ItemTurretBuild, fusillade, {
  update(){
    if (this.overheatstate == null) {
      this.overheatstate = Vars.state.rules.infiniteResources ? 0 : -60*15
    }
    if (this.overheatstate < 0 || this.reloadCounter >= fusillade.reload) {
      this.overheatstate = this.overheatstate - Math.min(Math.abs(this.overheatstate), Time.delta) * Math.sign(this.overheatstate)
    }
    if (this.overheatstate < 0) {
      this.heat = Math.min(1,Math.abs(this.overheatstate*5)/overheatCap)
      if(Mathf.chanceDelta(0.15)){
        Tmp.v1.rnd(Mathf.range(12));
        Fx.surgeCruciSmoke.at(this.x + Tmp.v1.x, this.y + Tmp.v1.y);
        Tmp.v1.rnd(Mathf.range(12));
        Fx.fallSmoke.at(this.x + Tmp.v1.x, this.y + Tmp.v1.y);
      }
    }
    this.super$update();
  },
  baseReloadSpeed(){
    return this.overheatstate >= 0 ? this.efficiency : 0
  },
  getOverheatState(){
    if (this.overheatstate == null) return 0
    return this.overheatstate
  },
  shoot(type){
    this.overheatstate += overheatCap/15
    if (this.overheatstate >= overheatCap) this.overheatstate = -overheatCap
    this.super$shoot(type)
  },
  updateReload(){
    if (this.getOverheatState() >= 0) {
      this.super$updateReload()
    } else {
      this.reloadCounter = 0
    }
  },
  shouldTurn(){
    return this.overheatstate >= 0
  },
  sense(sensor){
    switch(sensor){
      case LAccess.heat:
        return Math.abs(this.getOverheatState())/overheatCap
      default:
        return this.super$sense(sensor)
    }
  },
  write(write){
    this.super$write(write)
    write.f(this.overheatstate != null ? this.overheatstate : 0)
  },
  read(read,revision){
    this.super$read(read,revision)
    if (revision >= 1) {
      this.overheatstate = read.f()
    }
  }
});

let silicon = extend(RailBulletType, {
  shootEffect: Fx.none,
  hitEffect: Fx.none,
  pierceEffect: vfx.fusilladeHitSili,
  smokeEffect: Fx.smokeCloud,
  pointEffect: vfx.fusilladeTrailSili,
  despawnEffect: vfx.fusilladeShootSili,
  pointEffectSpace: 28,
  damage: 200,
  pierceCap: 3,
  length: 240,
  ammoMultiplier: 2,
})
let plast = extend(RailBulletType, {
  shootEffect: Fx.none,
  hitEffect: Fx.none,
  pierceEffect: vfx.fusilladeHitPlast,
  smokeEffect: Fx.smokeCloud,
  pointEffect: vfx.fusilladeTrailPlast,
  despawnEffect: vfx.fusilladeShootPlast,
  pointEffectSpace: 28,
  damage: 220,
  pierceCap: 5,
  length: 240,
  ammoMultiplier: 4,
  fragBullets: 6,
  fragOnDespawn: false,
  delayFrags: true,
  fragBullet: extend(BasicBulletType, {
    speed: 4,
    damage: 15,
    lifetime: 32,
    frontColor: Color.valueOf("ffffff"),
    backColor: Color.valueOf("CBD97F"),
    height: 12,
    width: 7,
    pierce: true,
    pierceCap: 3,
  }),
})
let surge = extend(RailBulletType, {
  shootEffect: Fx.none,
  hitEffect: Fx.none,
  pierceEffect: vfx.fusilladeHitSurge,
  smokeEffect: Fx.smokeCloud,
  pointEffect: vfx.fusilladeTrailSurge,
  despawnEffect: vfx.fusilladeShootSurge,
  pointEffectSpace: 36,
  damage: 540,
  pierceCap: 4,
  length: 240,
  ammoMultiplier: 1,
  status: StatusEffects.shocked,
  reloadMultiplier: 0.5,
})
fusillade.ammo(
  Items.silicon, silicon,
  Items.plastanium, plast,
  Items.surgeAlloy, surge,
);