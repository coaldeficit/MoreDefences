let sporangia = extend(PowerTurret, "panaeolus-subturret", {
  description: "Shoots Spores at enemies.",
  health: 100,
  size: 1,
  solid: false,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.plantBreak,
});
sporangia.buildType = () => extend(PowerTurret.PowerTurretBuild, sporangia, {
  update(){
    this.super$update();
    if (this.selfkaboomtimer == undefined) this.selfkaboomtimer = 360
    if (this.selfkaboomtimer > 0) {
      this.selfkaboomtimer -= Time.delta
    }
    if (this.selfkaboomtimer <= 0) {
      this.health = -69420
      this.damage(1)
      this.selfkaboomtimer = -1
    }
  }
});
let blade = extend(PowerTurret, "blitz-subturret", {
  size: 3,
  solid: false,
  destructible: true,
  update: true,
  rebuildable: false,
});
blade.buildType = () => extend(PowerTurret.PowerTurretBuild, blade, {
  update(){
    this.super$update();
    if (this.selfkaboomtimer == undefined) this.selfkaboomtimer = 720
    if (this.selfkaboomtimer > 0) {
      this.selfkaboomtimer -= Time.delta
    }
    if (this.selfkaboomtimer <= 0) {
      this.health = -69420
      this.damage(1)
      this.selfkaboomtimer = -1
    }
  }
});

module.exports = {
  sporangia: sporangia,
  blade: blade
};