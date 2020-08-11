const aerialdrill = extendContent(Drill, "aerial-drill", {
  load(){
    this.super$load();
    this.region = Core.atlas.find(this.name);
    this.rimRegion = Core.atlas.find(this.name + '-rim');
    this.propellorRegion = Core.atlas.find(this.name + "-propellor");
    this.rotateRegion = Core.atlas.find(this.name + "-rotator");
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  
  generateIcons(){
  return [
    Core.atlas.find(this.name),
    Core.atlas.find(this.name + "-propellor"),
    Core.atlas.find(this.name + "-rotator"),
    Core.atlas.find(this.name + "-top")
  ];},
   
  draw(tile){
    entity = tile.ent();
    
    Draw.rect(this.region, tile.drawx(), tile.drawy());
    
    Draw.color(Color.valueOf('000000'), Color.valueOf('ffc2d6'), entity.getHeat() * (0.7 + Mathf.absin(Time.time(), 3, 0.3)));
		Draw.blend(Blending.additive);
    Draw.rect(this.rimRegion, tile.drawx(), tile.drawy());
    Draw.blend();
    Draw.color();
    
    Draw.rect(this.propellorRegion, tile.drawx(), tile.drawy(), Time.time() * 8 * entity.efficiency());    
    Draw.rect(this.rotateRegion, tile.drawx(), tile.drawy(), Time.time() * -6 * entity.efficiency());
    Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
  }
});
