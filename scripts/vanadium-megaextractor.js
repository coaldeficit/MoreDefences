const vanadium = extendContent(GenericCrafter, "vanadium-megaextractor", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.rotateRegion = Core.atlas.find(this.name + "-rotator");
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  
  generateIcons(){
  return [
    Core.atlas.find(this.name),
    Core.atlas.find(this.name + "-rotator"),
    Core.atlas.find(this.name + "-top")
  ];},
   
  draw(tile){
    entity = tile.ent();
    
    Draw.rect(this.region, tile.drawx(), tile.drawy());
    Draw.rect(this.rotateRegion, tile.drawx(), tile.drawy(), entity.totalProgress * -2.75);
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
  }
});
