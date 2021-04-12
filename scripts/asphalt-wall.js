const wall = extendContent(Wall, "asphalt-wall", {
  load(){
    this.region = Core.atlas.find(this.name);
  },
  
  icons(){
    return [
      this.region
    ];
  },
  
  update(tile){
    if (tile.entity.timer.get(0, 180)) {
        if (tile.entity.maxHealth < (wall.health*5)) {
            tile.entity.maxHealth += ((wall.health*5)-wall.health)/160;
            tile.entity.health += ((wall.health*5)-wall.health)/160;
        };
    };
  }
});

wall.buildType = () => extend(Wall.WallBuild, wall, {});
