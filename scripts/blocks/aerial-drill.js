const aerial = extend(Drill, "aerial-drill", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.propellorRegion = Core.atlas.find(this.name + "-propellor");
    this.rotateRegion = Core.atlas.find(this.name + "-rotator");
    this.topRegion = Core.atlas.find(this.name + "-top");
    this.itemRegion = Core.atlas.find("clear");

  },
  
  icons(){
    return [
      this.region,
      this.propellorRegion,
      this.rotateRegion,
      this.topRegion
    ];
  }
});
aerial.buildType = () => extend(Drill.DrillBuild, aerial, {
  draw(){    
    Draw.rect(aerial.region, this.x, this.y);
    Draw.rect(aerial.propellorRegion, this.x, this.y,(this.timeDrilled * aerial.rotateSpeed * 5));
    Draw.rect(aerial.rotateRegion, this.x, this.y, (this.timeDrilled * aerial.rotateSpeed * -5));
    Draw.rect(aerial.topRegion, this.x, this.y);
    Draw.rect(aerial.itemRegion, this.x, this.y);
  }
});
