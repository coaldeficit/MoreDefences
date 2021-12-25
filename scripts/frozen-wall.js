let frozenWall = extend(Block, "frozen-wall", {
  description: "Frozen wall.",
  health: 25,
  size: 1,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false
});
let frozenWallL = extend(Block, "frozen-wall-large", {
  description: "Frozen wall. Spans multiple tiles.",
  health: 100,
  size: 2,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false
});

frozenWall.buildType = () => extend(Building, {
  update(){
    this.super$update();
    if (this.invulntimer == undefined) this.invulntimer = 30
    if (this.frozenBlock == undefined) this.frozenBlock = Blocks.router
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
    
  },
});
frozenWallL.buildType = () => extend(Building, {
  update(){
    this.super$update();
    if (this.invulntimer == undefined) this.invulntimer = 30
    if (this.frozenBlock == undefined) this.frozenBlock = Blocks.router
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
    
  },
});

module.exports = {
    frozenWall: frozenWall,
    frozenWallL: frozenWallL,
};