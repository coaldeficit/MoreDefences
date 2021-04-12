const wall = extendContent(Wall, "asphalt-wall", {
  load(){
    this.region = Core.atlas.find(this.name);
  },
  
  icons(){
    return [
      this.region
    ];
  }
});

wall.buildType = () => extend(Wall.WallBuild, wall, {
   updateTile(){
     this.super$updateTile();
     if (this.entity.timer.get(0, 180)) {
         if (this.entity.maxHealth < (wall.health*5)) {
             this.entity.maxHealth += ((wall.health*5)-wall.health)/160;
             this.entity.health += ((wall.health*5)-wall.health)/160;
         };
     };
  }
});
