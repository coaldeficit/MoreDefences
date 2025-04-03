const ze = extend(GenericCrafter, "zincite-extractor", {
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
ze.buildType = () => extend(GenericCrafter.GenericCrafterBuild, ze, {
  draw(){
    Draw.rect(ze.region, this.x, this.y);
    Draw.rect(ze.rotateRegion, this.x, this.y, this.totalProgress * 3.91);
    Draw.rect(ze.topRegion, this.x, this.y);
  }
});
