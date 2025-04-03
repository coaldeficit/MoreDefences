const recover = extend(MendProjector, "recoverer", {
  baseColor: Color.valueOf("84f491"),
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
recover.buildType = () => extend(MendProjector.MendBuild, recover, {
  draw(){
    let reco = recover;

    Draw.rect(reco.bottomRegion, this.x, this.y);

    Draw.color(this.liquids.current().color);
    Draw.alpha(this.liquids.currentAmount() / reco.liquidCapacity);
    Draw.rect(reco.liquidRegion, this.x, this.y);
    Draw.color();

    Draw.rect(reco.region, this.x, this.y);

    let f = 1 - (Time.time / 100) % 1;
    Draw.color(reco.baseColor);    
    if(this.power.status > 0.01 && this.liquids.currentAmount() > 0.01) {
      Draw.alpha(this.power.status * Mathf.absin(Time.time, 10, 1) * 0.5);
      Draw.rect(reco.topRegion, this.x, this.y);
      Draw.alpha(1);

      Lines.stroke((2 * f + 0.2) * this.power.status);
      Lines.square(this.x, this.y, ((1 - f) * 8) * reco.size / 2);
    };

    Draw.reset();   
    //Draw.alpha(entity.power.status * Mathf.absin(Time.time(), 10, 1) * 0.5);
  }
});
