const pure = extend(GenericCrafter, "purifier", {
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
pure.buildType = () => extend(GenericCrafter.GenericCrafterBuild, pure, {
  draw(){
    Draw.rect(pure.region, this.x, this.y);
    Draw.rect(pure.rotateRegion, this.x, this.y, this.totalProgress * 3.4);
    Draw.rect(pure.topRegion, this.x, this.y);
  }
});
