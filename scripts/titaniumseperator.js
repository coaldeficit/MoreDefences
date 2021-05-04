const ts = extend(Separator, "titaniumseperator", {
  load(){
    this.region = Core.atlas.find(this.name);
  },
  
  icons(){
    return [
      this.region,
    ];
  }
});
ts.buildType = () => extend(Separator.SeparatorBuild, ts, {
  draw(){
    Draw.rect(ts.region, this.x, this.y);
  }
});