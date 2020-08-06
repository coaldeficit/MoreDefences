const elib = require("more-defences-ivyx/effectlib");

const sourceS = extendContent(Mech, "source-ship", {
	load(){
		this.weapon.load();
		this.region = Core.atlas.find(this.name);
	},
},);
sourceS.trailEffect = newEffect(20, e => {
	var angle = Mathf.randomSeed(e.id, 360);
	var offset = 0.3 + e.fin() * 0.4;
	Draw.color(Pal.lancerLaser);
	Draw.alpha(e.fout() * 0.67);
	Draw.rect(Core.atlas.find("more-defences-ivyx-source-ship-trail"), e.x + Angles.trnsx(angle, offset), e.y + Angles.trnsy(angle, offset), e.rotation - 90);
	Draw.color();
});
