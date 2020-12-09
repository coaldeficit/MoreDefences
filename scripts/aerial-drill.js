const aerial = extendContent(Drill, "aerial-drill", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.propellorRegion = Core.atlas.find(this.name + "-propellor");
    this.rotateRegion = Core.atlas.find(this.name + "-rotator");
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  
  icons(){
    return [
      this.region,
      this.propellorReigon,
      this.rotateRegion,
      this.topRegion
    ];
  }
});
aerial.buildType = () => extend(Drill.DrillBuild, aerial, {
  draw(){    
    Draw.rect(aerial.region, this.x, this.y);
    Draw.rect(aerial.propellorRegion, this.x, this.y, Time.time * 3.5 * this.progress() * this.liquids.total());    
    Draw.rect(aerial.rotateRegion, this.x, this.y, Time.time * -3 * this.progress() * this.liquids.total());
    Draw.rect(aerial.topRegion, this.x, this.y);
  }
});
