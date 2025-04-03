let cobaltChannel = extend(Duct, "cobalt-channel", {
  load(){
    this.super$load()
    this.fullIconRegion = Core.atlas.find(this.name + "-full");
  },
  icons(){
    return [
      this.fullIconRegion
    ];
  },
  init(){
    this.super$init()
    this.bridgeReplacement = null
  }
});