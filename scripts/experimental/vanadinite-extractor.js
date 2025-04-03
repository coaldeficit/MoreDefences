const mineralMD = require("md3/unmineable-ores")

let placeables = [mineralMD.vanadinite]
const vanadiniteExtract = extend(GenericCrafter, "vanadinite-extractor", {
  load(){
    this.region = Core.atlas.find(this.name);
    //this.rotateRegion = Core.atlas.find(this.name + "-rotator");
    //this.topRegion = Core.atlas.find(this.name + "-top");
  },

  icons(){
    return [
      this.region,
      //this.rotateRegion,
      //this.topRegion
    ];
  },

  canPlaceOn(tile, team){
    return placeables.includes(tile.floor()) || placeables.includes(tile.overlay());
  }
});
vanadiniteExtract.buildType = () => extend(GenericCrafter.GenericCrafterBuild, vanadiniteExtract, {
  draw(){
    Draw.rect(vanadiniteExtract.region, this.x, this.y);
    //Draw.rect(vanadiniteExtract.rotateRegion, this.x, this.y, this.totalProgress * 2.3);
    //Draw.rect(vanadiniteExtract.topRegion, this.x, this.y);
  }
});
