let thermalTurbine = extend(ThermalGenerator, "thermal-turbine", {});
thermalTurbine.buildType = () => extend(ThermalGenerator.ThermalGeneratorBuild, thermalTurbine, {
  totalTime: 0,
  warmup2: 0,
  updateTile() {
    this.productionEfficiency = this.efficiency > 0 ? this.efficiency * (this.sum + this.block.attribute.env()) : 0
    if (this.productionEfficiency > 0.1 && Mathf.chanceDelta(this.block.effectChance)) {
      this.block.generateEffect.at(this.x + Mathf.range(5), this.y + Mathf.range(5))
    }
    this.warmup2 = Mathf.lerpDelta(this.warmup2, this.efficiency, 0.05)
    this.totalTime += this.warmup2 * Time.delta
    // outputLiquid is ignored here since we dont need it here
  },
  totalProgress() {
    return this.totalTime
  },
  warmup() {
    return this.warmup2
  }
});