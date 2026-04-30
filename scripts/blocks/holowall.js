const small = extend(AutoDoor, "holowall", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.holoRegion = Core.atlas.find(this.name + "-hologram");
    this.previewRegion = Core.atlas.find(this.name + "-preview");
  },
  
  icons(){
    return [
      this.previewRegion
    ];
  },
  
  drawPlanRegion(plan, list){
    Draw.color(Vars.player.team().color)
    Draw.rect(this.holoRegion, plan.drawx(), plan.drawy());
    Draw.color(Color.valueOf("#FFFFFF"))
    Draw.rect(this.region, plan.drawx(), plan.drawy());
  }
});
small.buildType = () => extend(AutoDoor.AutoDoorBuild, small, {
  draw(){
    let id = this.x*3+(this.y/24)*500
    Draw.color(this.team.color)
    Draw.alpha(Math.abs((Time.time+100000)%(240+id/100)-(120+id/200))/(600+id/4000)+0.1+(this.health/this.maxHealth)*0.5)
    Draw.rect(small.holoRegion, this.x, this.y);
    Draw.color(Color.valueOf("#FFFFFF"))
    Draw.alpha(1)
    Draw.rect(small.region, this.x, this.y);
    Draw.reset()
  }
});

const large = extend(AutoDoor, "holowall-large", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.holoRegion = Core.atlas.find(this.name + "-hologram");
    this.previewRegion = Core.atlas.find(this.name + "-preview");
  },
  
  icons(){
    return [
      this.previewRegion
    ];
  },
  
  drawPlanRegion(plan, list){
    Draw.color(Vars.player.team().color)
    Draw.rect(this.holoRegion, plan.drawx(), plan.drawy());
    Draw.color(Color.valueOf("#FFFFFF"))
    Draw.rect(this.region, plan.drawx(), plan.drawy());
  }
});
large.buildType = () => extend(AutoDoor.AutoDoorBuild, large, {
  draw(){
    let id = this.x*3+(this.y/24)*500
    Draw.color(this.team.color)
    Draw.alpha(Math.abs((Time.time+100000)%(240+id/100)-(120+id/200))/(600+id/4000)+0.1+(this.health/this.maxHealth)*0.5)
    Draw.rect(large.holoRegion, this.x, this.y);
    Draw.color(Color.valueOf("#FFFFFF"))
    Draw.alpha(1)
    Draw.rect(large.region, this.x, this.y);
    Draw.reset()
  }
});
