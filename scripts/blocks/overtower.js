const overclock = extend(OverdriveProjector, "overtower", {
  baseColor: Color.valueOf("ffd59e"),
  load(){
    this.super$load();
    this.bottomRegion = Core.atlas.find(this.name + '-bottom');
    this.liquidRegion = Core.atlas.find(this.name + '-liquid');
    this.region = Core.atlas.find(this.name);
    this.topRegion = Core.atlas.find(this.name + '-top');
  },

  icons(){
    return [
      this.bottomRegion,
      this.region
    ];
  }
});
overclock.buildType = () => extend(OverdriveProjector.OverdriveBuild, overclock, {
  draw(){
    let clock = overclock;

    Draw.rect(clock.bottomRegion, this.x, this.y);
    
    Draw.color(this.liquids.current().color);
    Draw.alpha(this.liquids.total() / clock.liquidCapacity);
    Draw.rect(clock.liquidRegion, this.x, this.y);
    Draw.color();

    Draw.rect(clock.region, this.x, this.y);

    let f = 1 - (Time.time / 100) % 1;
    Draw.color(clock.baseColor);    
    if(this.power.status > 0.01 && this.liquids.total() > 0.01) {
      Draw.alpha(this.power.status * Mathf.absin(Time.time, 10, 1) * 0.5);
      Draw.rect(clock.topRegion, this.x, this.y);
      Draw.alpha(1);

      Lines.stroke((2 * f + 0.2) * this.power.status);
      Lines.square(this.x, this.y, ((1 - f) * 8) * clock.size / 2);
    };

    Draw.reset();   
    //Draw.alpha(entity.power.status * Mathf.absin(Time.time(), 10, 1) * 0.5);
  }
});
