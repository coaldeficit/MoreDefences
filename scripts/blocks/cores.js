// serpulo
let atom = extend(CoreBlock, "core-atom", {
  load(){
    this.super$load()
    this.fullIconRegion = Core.atlas.find(this.name + "-full");
  },
  icons(){
    return [
      this.fullIconRegion
    ];
  }
});

// fieros
let monoquark = extend(CoreBlock, "core-monoquark", {
  load(){
    this.super$load()
    this.fullIconRegion = Core.atlas.find(this.name + "-full");
  },
  icons(){
    return [
      this.fullIconRegion
    ];
  }
});