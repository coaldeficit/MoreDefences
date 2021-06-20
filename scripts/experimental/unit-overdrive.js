const beam = new Effect(10, e => {
  Draw.color(Color.valueOf("#feb380"))
  Lines.stroke(3 * e.fout())
  Lines.line(e.x, e.y, e.data.x, e.data.y)
  Lines.stroke(1 * e.fout())
});

const beamendthing = new Effect(10, e => {
  Draw.color(Color.valueOf("#feb380"))
  Fill.circle(e.x, e.y, e.fout() * e.data.hitSize + 1)
});

function dst(x1, x2, y1, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  if (dx < 0) dx *= -1;
  if (dy < 0) dy *= -1;
  return dx + dy;
};

const boostT1 = extend(Block, "unit-overdrive", {
  buildVisibility: BuildVisibility.shown,
  size: 2,
  update: true,
  destructible: true,
  solid: true,
  health: 120,
});

boostT1.buildType = () => extend(Building, {
  update(){
    this.super$update();
    if (this.overdrivetimer == undefined) this.overdrivetimer = 0;
    if (this.overdrivetargetcount == undefined) this.overdrivetargetcount = 5;
    if (this.overdrivetimer > 0) this.overdrivetimer--;
    Groups.unit.each(unit => {
      if(unit.team == this.team && this.overdrivetimer <= 0 && this.overdrivetargetcount > 0){
         if(dst(this.x, unit.x, this.y, unit.y) < 7 * 10 ){
           beam.at(this.x, this.y, 0, unit);
           beamendthing.at(unit.x, unit.y, 0, unit);
           unit.apply(StatusEffects.overdrive, 9999999);
           this.overdrivetargetcount--;
           if (this.overdrivetargetcount == 0) {
             this.overdrivetimer = 180;
             this.overdrivetargetcount = 5
           };
         };
      };
    });
  }
});
