let mica = extend(LiquidTurret, "mica", {
  flags: Blocks.wave.flags
});
mica.buildType = () => extend(LiquidTurret.LiquidTurretBuild, mica, {
  useAmmo() {
    for (let i=0;i<this.block.consumers.length;i++) {
      if (this.block.consumers[i] instanceof ConsumeItems) {
        this.block.consumers[i].trigger(this)
      }
    }
    this.super$useAmmo()
  },
  acceptItem(source,item) {
    return this.block.consumesItem(item) && this.items.get(item) < this.getMaximumAccepted(item)
  }
});