const ster = extend(GenericCrafter, "sterilizer", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.rotateRegion = Core.atlas.find(this.name + "-rotator");
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  
  icons(){
    return [
      this.region,
      this.rotateRegion,
      this.topRegion
    ];
  }
});
ster.buildType = () => extend(GenericCrafter.GenericCrafterBuild, ster, {
  draw(){
    Draw.rect(ster.region, this.x, this.y);
    Draw.rect(ster.rotateRegion, this.x, this.y, this.totalProgress * 3.4);
    Draw.rect(ster.topRegion, this.x, this.y);
  }
});
