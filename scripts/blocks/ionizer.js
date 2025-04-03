const ionizer = extend(GenericCrafter, "ionizer", {
  load(){
    this.bottomRegion = Core.atlas.find(this.name + "-bottom");
    this.graphiteRegion = Core.atlas.find(this.name + "-graphite");
    this.beamRegion = Core.atlas.find(this.name + "-beams");
    this.leadRegion = Core.atlas.find(this.name + "-lead");
    this.region = Core.atlas.find(this.name);
  },
  
  icons(){
    return [
      this.bottomRegion,
      this.region,
    ];
  }
});
ionizer.buildType = () => extend(GenericCrafter.GenericCrafterBuild, ionizer, {
  draw(){
    Draw.rect(ionizer.bottomRegion, this.x, this.y);
    
    Draw.alpha(this.items.get(Items.graphite) / ionizer.itemCapacity);
    Draw.rect(ionizer.graphiteRegion, this.x, this.y);

    Draw.alpha(0);
    if (this.items.get(Items.graphite) >= 1 && this.items.get(Items.lead) >= 3 && this.power.status === 1) Draw.alpha(1);
    Draw.rect(ionizer.beamRegion, this.x, this.y);

    Draw.alpha(this.items.get(Items.lead) / ionizer.itemCapacity);
    Draw.rect(ionizer.leadRegion, this.x, this.y);
    
    Draw.alpha(1)
    
    Draw.rect(ionizer.region, this.x, this.y);
  }
});
