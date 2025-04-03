let breaksound = Vars.tree.loadSound("icebreak")
let hitsound = Vars.tree.loadSound("icehit")
let frozenWall = extend(Block, "frozen-wall", {
  description: "Frozen wall.",
  health: 25,
  size: 1,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.none
});
let frozenWallL = extend(Block, "frozen-wall-large", {
  description: "Frozen wall. Spans multiple tiles.",
  health: 100,
  size: 2,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.none
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
    breaksound.at(this.x, this.y, Mathf.random(0.9,1.1))
  },
  handleDamage(amount){
    if (this.health-amount > 0) hitsound.at(this.x, this.y, Mathf.random(0.9,1.1))
    return amount
  }
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
    breaksound.at(this.x, this.y, Mathf.random(0.9,1.1))
  },
  handleDamage(amount){
    if (this.health-amount > 0) hitsound.at(this.x, this.y, Mathf.random(0.9,1.1))
    return amount
  }
});

module.exports = {
    frozenWall: frozenWall,
    frozenWallL: frozenWallL,
};