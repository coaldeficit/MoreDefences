const statsmd = require("md3/libs/stats")

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
  },
  setStats() {
	this.super$setStats()
	this.stats.add(statsmd.healEffectiveness, StatValues.percentModifier(this.md3healEffectiveness))
  },
  md3healEffectiveness: 0.75
});
atom.buildType = () => extend(CoreBlock.CoreBuild, atom, {
  heal(amount) {
    if (amount == null) {
      this.super$heal()
    } else if (typeof amount == 'number') {
      this.super$heal(amount*atom.md3healEffectiveness)
    } else {
      print("wtf are you doing? - core: atom heal("+amount+"), thats meant to be a number dummy")
    }
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