const distiller = extendContent(LiquidConverter, "benzene-distiller", {
  load(){
    this.bottomRegion = Core.atlas.find(this.name + "-bottom");
    this.benzeneRegion = Core.atlas.find(this.name + "-benzene");
    this.region = Core.atlas.find(this.name);
    this.oilbottomRegion = Core.atlas.find(this.name + "-oil-bottom");
    this.oilRegion = Core.atlas.find(this.name + "-oil");
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  
  icons(){
    return [
      this.bottomRegion,
      this.region,
      this.oilbottomRegion,
      this.topRegion
    ];
  }
});
distiller.buildType = () => extend(LiquidConverter.LiquidConverterBuild, distiller, {
  draw(){
    Draw.rect(distiller.bottomRegion, this.x, this.y);

    Draw.alpha(this.liquids.get(Vars.content.getByName(ContentType.liquid, "more-defences-ivyx-benzene")) / distiller.liquidCapacity);
    Draw.rect(distiller.benzeneRegion, this.x, this.y);
    
    Draw.alpha(1)
    
    Draw.rect(distiller.region, this.x, this.y);
    Draw.rect(distiller.oilbottomRegion, this.x, this.y, this.totalProgress * -6);
    
    Draw.alpha(this.liquids.get(Liquids.oil)) / distiller.liquidCapacity);
    Draw.rect(distiller.benzeneRegion, this.x, this.y);
    
    Draw.alpha(1)
    Draw.rect(distiller.topRegion, this.x, this.y);
  }
});
