const coba = extend(GenericCrafter, "cobalt-twister", {
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
coba.buildType = () => extend(GenericCrafter.GenericCrafterBuild, coba, {
  draw(){
    Draw.rect(coba.region, this.x, this.y);
    Draw.rect(coba.rotateRegion, this.x, this.y, this.totalProgress * 6);
    Draw.rect(coba.topRegion, this.x, this.y);
  }
});
