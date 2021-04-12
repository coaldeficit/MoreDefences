// to-do: actually make this code work (probably wont happen anytime in the next 600 irl days)

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
     if (timer.get(0, 180)) {
         if (this.maxHealth < (wall.health*5)) {
             this.maxHealth += ((wall.health*5)-wall.health)/160;
             heal(((wall.health*5)-wall.health)/160);
         };
     };
  }
});
