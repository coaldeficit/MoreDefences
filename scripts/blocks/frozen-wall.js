let breaksound = Vars.tree.loadSound("icebreak")
let hitsound = Vars.tree.loadSound("icehit")
let frozenWall = extend(Block, "frozen-wall", {
  description: "Frozen wall.",
  scaledHealth: 115,
  size: 1,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.none
});
let frozenWallL = extend(Block, "frozen-wall-large", {
  description: "Frozen wall. Spans multiple tiles.",
  scaledHealth: 115,
  size: 2,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.none
});
let frozenWallH = extend(Block, "frozen-wall-huge", {
  description: "Frozen wall. Spans multiple tiles.",
  scaledHealth: 115,
  size: 3,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.none
});
let frozenWallG = extend(Block, "frozen-wall-gigantic", {
  description: "Frozen wall. Spans multiple tiles.",
  scaledHealth: 115,
  size: 4,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.none
});
let buildtype = () => extend(Building, {
  update(){
    this.super$update();
    if (this.invulntimer == undefined) this.invulntimer = 20
    if (this.invulntimer > 0) {
      this.health = 99999999
      this.invulntimer--
    }
    if (this.invulntimer == 0) {
      this.health = this.maxHealth
      this.invulntimer = -1
    }
  },
  afterDestroyed(){
    this.super$afterDestroyed();
    breaksound.at(this.x, this.y, Mathf.random(0.9,1.1))
  },
  handleDamage(amount){
    if (this.health-amount > 0) hitsound.at(this.x, this.y, Mathf.random(0.9,1.1))
    return amount
  }
});

frozenWall.buildType = buildtype
frozenWallL.buildType = buildtype
frozenWallH.buildType = buildtype
frozenWallG.buildType = buildtype

module.exports = {
    frozenWall: frozenWall,
    frozenWallL: frozenWallL,
    frozenWallH: frozenWallH,
    frozenWallG: frozenWallG,
};