const churner = extend(GenericCrafter, "fusion-churner", {
  load: function(){
    this.region = Core.atlas.find(this.name);
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  
  icons: function(){
    return [
      this.region
    ];
  },
  
  draw: function(tile){
    entity = tile.bc();
    
    Draw.rect(this.region, tile.drawx(), tile.drawy());
    
    if(entity.warmup > 0  > 0.001){
            const g = 0.4;
            const r = 0.07;
            const cr = Mathf.random(0.1);

            Draw.alpha(((1.0 - g) + Mathf.absin(Time.time(), 9.0, g) + Mathf.random(r) - r) * entity.warmup);

           // Draw.tint(this.flameColor);
            Draw.blend(Blending.additive);
         //   Draw.color(Color.valueOf("f2613e"), entity.warmup);
            Draw.rect(this.topRegion, tile.drawx(), tile.drawy(), 20.0 + Mathf.absin(Time.time(), 6.0, 5.0), 20.0 + Mathf.absin(Time.time(), 6.0, 5.0));
            Draw.blend();
        }
      //  Draw.color();
  }
});

const j = newEffect(120, e => {
  Draw.color(Pal.lancerLaser);
  Lines.square(e.x, e.y, e.fout() *5, 45);
})

churner.updateEffect = j;
