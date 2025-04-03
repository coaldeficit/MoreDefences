const mixer = extend(GenericCrafter, "asphalt-mixer", {
  load(){
    this.bottomRegion = Core.atlas.find(this.name + "-bottom");
    this.rockbgRegion = Core.atlas.find(this.name + "-rockbg");
    this.rockRegion = Core.atlas.find(this.name + "-rocks");
    this.oilRegion = Core.atlas.find(this.name + "-oil");
    this.region = Core.atlas.find(this.name);
    this.rotateRegion = Core.atlas.find(this.name + "-rotator");
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  
  icons(){
    return [
      this.bottomRegion,
      this.region,
      this.rotateRegion,
      this.topRegion
    ];
  }
});
mixer.buildType = () => extend(GenericCrafter.GenericCrafterBuild, mixer, {
  draw(){
    Draw.rect(mixer.bottomRegion, this.x, this.y);
    
    Draw.alpha(this.items.get(Items.scrap) / mixer.itemCapacity);
    Draw.rect(mixer.rockbgRegion, this.x, this.y);

    Draw.alpha(this.liquids.total() / mixer.liquidCapacity);
    Draw.rect(mixer.oilRegion, this.x, this.y);
    
    Draw.alpha(this.items.get(Items.scrap) / mixer.itemCapacity);
    Draw.rect(mixer.rockRegion, this.x, this.y, this.totalProgress * 20);
    
    Draw.alpha(1)
    
    Draw.rect(mixer.region, this.x, this.y);
    Draw.rect(mixer.rotateRegion, this.x, this.y, this.totalProgress * -6);
    Draw.rect(mixer.topRegion, this.x, this.y);
  }
});
