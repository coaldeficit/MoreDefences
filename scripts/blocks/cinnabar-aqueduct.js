const aqueduct = extend(Conduit, "cinnabar-aqueduct", {
  load(){
    this.super$load()
    this.iconRegion = Core.atlas.find(this.name + "-icon");
  },
  
  icons(){
    return [
      this.iconRegion
    ];
  },
  drawPlanRegion(plan, list){
    Draw.rect(this.iconRegion, plan.drawx(), plan.drawy(), plan.rotation*90);
  }
});