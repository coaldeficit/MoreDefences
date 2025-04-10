const blockcheck = require("md3/libs/blockcheck")

let emphasis = extend(ItemTurret, "emphasis", {
  setBars(){
    this.super$setBars();
    this.addBar("penalty", func(e =>
      new Bar(
        prov(() => Core.bundle.format("stat.md3-emphasis-penalty") + ": " + Math.ceil(e.getReloadPenalty()*1000)/10 + "%"),
        prov(() => Pal.redderDust),
        floatp(() => e.getReloadPenalty()*(1/0.9))
      ))
    )
  },
  drawPlace(x,y,rotation,valid) {
    this.super$drawPlace(x,y,rotation,valid)
    Drawf.dashSquare(Pal.redderDust, x*8, y*8, 8*5)
    Drawf.dashSquare(Pal.redderDust, x*8, y*8, 8*11)
  }
});
emphasis.buildType = () => extend(ItemTurret.ItemTurretBuild, emphasis, {
  update(){
	let count = -25
    blockcheck.iterateSquare(Math.round(this.x/8)-5,Math.round(this.y/8)-5,11,11,(other => {
      if (other.block() != Blocks.air && other.block().synthetic()) {
        count++
        if (other.block() instanceof ShockMine) count -= 0.5
      }
    }));
	this.reloadpenalty = (count/96)*0.9
    this.super$update();
  },
  baseReloadSpeed(){
	 return this.efficiency * (1-this.reloadpenalty)
  },
  getReloadPenalty(){
	 return this.reloadpenalty
  },
  drawSelect() {
    this.super$drawSelect()
    Drawf.dashSquare(Pal.redderDust, this.x, this.y, 8*5)
    Drawf.dashSquare(Pal.redderDust, this.x, this.y, 8*11)
  }
});