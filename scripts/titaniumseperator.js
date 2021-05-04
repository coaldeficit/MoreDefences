const ts = extend(Separator, "titaniumseperator", {
  load(){
    this.region = Core.atlas.find(this.name);
    this.spinnerRegion = Core.atlas.find(this.name + "-spinner");
  },
  
  icons(){
    return [
      this.region,
      this.spinnerRegion,
    ];
  }
});
ts.buildType = () => extend(Separator.SeparatorBuild, ts, {
  draw(){
    Draw.rect(ts.region, this.x, this.y);
    Draw.rect(ts.spinnerRegion, this.x, this.y, this.totalProgress * 6);

  }
});
