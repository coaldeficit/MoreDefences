// to-do: actually make this code work (probably wont happen anytime in the next 600 irl days)

const wall = extend(Wall, "asphalt-wall", {
});

wall.buildType = () => extend(Wall.WallBuild, wall, {
   updateTile(){
     this.super$updateTile();
     if (this.timer.get(1, 180)) {
         if (this.maxHealth < (wall.health*5)) {
             this.maxHealth += ((wall.health*5)-wall.health)/160;
             this.health += ((wall.health*5)-wall.health)/160;
         };
     };
  }
});
