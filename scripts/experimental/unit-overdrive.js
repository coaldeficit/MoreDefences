const beam = new Effect(30, e => {
  Draw.color(Pal.accent) // Color.valueOf("#feb380")
  Lines.stroke(3 * e.fout())
  Lines.line(e.x, e.y, e.data.x, e.data.y)
  Lines.stroke(1 * e.fout())
});

const beamendthing = new Effect(30, e => {
  Draw.color(Pal.accent) // Color.valueOf("#feb380")
  Fill.circle(e.x, e.y, e.fout() * e.data.hitSize + 1)
});

let decoLightningLightning = extend(LightningBulletType, {
  damage: 6,
  lightningLength: 10,
  lightningLengthRand: 5,
  lightningColor: Pal.accent
});
let decoLightning = extend(BasicBulletType, {
  speed: 0.001,
  lifetime: 1,
  damage: 0,
  height: 0.1,
  width: 0.1,
  fragBullets: 7,
  fragBullet: decoLightningLightning
});

function dst(x1, x2, y1, y2) {
  let dx = (x2 - x1)*(x2 - x1);
  let dy = (y2 - y1)*(y2 - y1);
  if (dx < 0) dx *= -1;
  if (dy < 0) dy *= -1;
  return Math.sqrt(dx + dy);
};

let boostT1 = extend(Block, "unit-overdriver", {
  description: "Slowly charges up when ally units are nearby. Overdrives nearby ally units upon reaching 100% charge. Uses very high amounts of power.",
  health: 120,
  size: 2,
  solid: true,
  destructible: true,
  update: true,
  buildVisibility: BuildVisibility.shown,
  hasPower: true,
  consumesPower: true,
  setBars(){
    this.super$setBars();
    this.bars.add("charge", func(e =>
      new Bar(
        prov(() => "Charge"),
        prov(() => Pal.accent),
        floatp(() => 1 - (e.getOverdriveTimer() / (60*35)))
      ))
    )
  },
  drawPlace(x, y, rot, val){
    this.super$drawPlace(x, y, rot, val);
    Drawf.dashCircle(x * Vars.tilesize + this.offset, (y * Vars.tilesize) + this.offset, 13 * 8, Pal.accent);
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.range, 13, StatUnit.blocks);
    this.stats.add(Stat.cooldownTime, 35, StatUnit.seconds);
  },
  load(){
    this.region = Core.atlas.find(this.name);
    this.chargeRegion = Core.atlas.find(this.name + "-charge");
  },
  icons(){
    return [
      this.region
    ];
  }
});
boostT1.consumes.power(1850 / 60);

boostT1.buildType = () => extend(Building, {
  update(){
    this.super$update();
    if (this.overdrivetimer == undefined) this.overdrivetimer = 60 * 35;
    if (this.overdrivetargetcount == undefined) this.overdrivetargetcount = 15;
    if (this.overdrivetimer < 60 * 35 && this.unitsdetected == false) this.overdrivetimer += (1*this.timeScale);
    if (this.overdrivetimer > 0 && this.unitsdetected == true) this.overdrivetimer -= (1*this.timeScale);
    if (this.overdrivetimer > 60 * 35) this.overdrivetimer = 60 * 35;
    this.unitsdetected = false
    if (this.power.status === 1) {
      Units.nearby(this.team, this.x, this.y, 170, cons(unit => {
         if(dst(this.x, unit.x, this.y, unit.y) < 14 * 8){
           this.unitsdetected = true
           if (this.overdrivetimer <= 0 && this.overdrivetargetcount > 0) {
             beam.at(unit.x, unit.y, 0, this);
             beamendthing.at(unit.x, unit.y, 0, this);
             unit.apply(StatusEffects.overdrive, 9999999);
             //this.overdrivetargetcount--;
             /*if (this.overdrivetargetcount == 0) {
               this.overdrivetimer = 60 * 35;
               this.overdrivetargetcount = 15
	       decoLightning.create(unit, this.team, this.x, this.y, 0)
             };*/
	   };
         };
      }));
      if (this.overdrivetimer <= 0) {
        this.overdrivetimer = 60 * 35;
        this.overdrivetargetcount = 15
        decoLightning.create(this, this.team, this.x, this.y, 0)
      }
    };
  },
  getOverdriveTimer(){
    return this.overdrivetimer // thanks to QmelZ for helping with the bar thing
  },
  drawSelect(){
    Drawf.dashCircle(this.x, this.y, 13 * 8, Pal.accent);
  },
  draw(){
    Draw.rect(boostT1.region, this.x, this.y);
    
    Draw.alpha(1 - (this.getOverdriveTimer() / (60*35)));
    Draw.rect(boostT1.chargeRegion, this.x, this.y);
  }
});
