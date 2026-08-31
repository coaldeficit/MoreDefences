let chytrid = extend(ItemTurret, "chytrid", {
  setBars(){
    this.super$setBars();
    this.addBar("md3-chytrid-reload", func(e =>
      new Bar(
        prov(() => Core.bundle.format("bar.md3-chytrid-reload",Math.round(e.getAttributeReloadMultiplier()*1000)/10)),
        prov(() => Pal.spore),
        floatp(() => Math.min(1,(e.getAttributeReloadMultiplier()-1)/0.6))
      ))
    )
  },
  drawPlace(x,y,rotation,valid) {
    this.super$drawPlace(x,y,rotation,valid)
    this.drawPlaceText(Core.bundle.format("bar.md3-chytrid-reload",Math.round((1 + Math.min(2, (2/9) * this.sumAttribute(Attribute.spores, x, y))) * 100)), x, y, valid);
  },
  setStats() {
	this.super$setStats()
	this.stats.add(Stat.affinities, Attribute.spores, this.floating,(2/9)*this.size*this.size,false)
  },
});
chytrid.buildType = () => extend(ItemTurret.ItemTurretBuild, chytrid, {
  attrsum: 0,
  onProximityUpdate(){
    this.super$onProximityUpdate();
    this.attrsum = this.block.sumAttribute(Attribute.spores, this.tile.x, this.tile.y)
  },
  baseReloadSpeed(){
    return this.efficiency * (1+this.attrsum*(2/9)) 
  },
  pickedUp(){
    this.attrsum = 0
    this.super$pickedUp();
  },
  getAttributeReloadMultiplier(){
    return (1+this.attrsum*(2/9))
  },
});