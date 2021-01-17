const ioe = extendContent(GenericCrafter, "iron-ore-extractor", {
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
ioe.buildType = () => extend(GenericCrafter.GenericCrafterBuild, ioe, {
  draw(){
    Draw.rect(ioe.region, this.x, this.y);
    Draw.rect(ioe.rotateRegion, this.x, this.y, this.totalProgress * 3.91);
    Draw.rect(ioe.topRegion, this.x, this.y);
  }
});
