const rand = new Rand()
const v = new Vec2()
const lh2status = new Effect(30, e => {
  Draw.z(110)
  Draw.color(Color.valueOf("#7a9a9B"))
  Fill.circle(e.x, e.y, e.fout() * 1.5);
});
const irradiatedstatus = new Effect(30, e => {
  Draw.z(110)
  Draw.color(Color.valueOf("#826B57"))
  Fill.circle(e.x, e.y, e.fout() * 1.5);
  Draw.color(Color.valueOf("#a68467"))
  Fill.circle(e.x, e.y, e.fout() * 0.75);
});
const freezeBombWeak = new Effect(30, e => {
  Draw.color(Color.valueOf("#6ecdec"));
  Lines.stroke(e.fout() * 2);
  let circleRad = 4 + e.finpow() * 96;
  Lines.circle(e.x, e.y, circleRad);
  Draw.color(Color.valueOf("#6ecdec"));
  for(let i = 0; i < 3; i++){
    Drawf.tri(e.x, e.y, 6, 70 * e.fout(), (i*120)-90);
  }
  for(let i = 0; i < 3; i++){
    Drawf.tri(e.x, e.y, 6, 45 * e.fout(), (i*120)+90);
  }
  Draw.color();
  for(let i = 0; i < 3; i++){
    Drawf.tri(e.x, e.y, 3, 25 * e.fout(), (i*120)-90);
  }
  for(let i = 0; i < 3; i++){
    Drawf.tri(e.x, e.y, 3, 12.5 * e.fout(), (i*120)+90);
  }
  Drawf.light(e.x, e.y, circleRad * 1.6, Color.valueOf("#6ecdec"), e.fout());
});
const freezeBomb = new Effect(30, e => {
  Draw.color(Color.valueOf("#6ecdec"));
  Lines.stroke(e.fout() * 2);
  let circleRad = 4 + e.finpow() * 146;
  Lines.circle(e.x, e.y, circleRad);
  Draw.color(Color.valueOf("#6ecdec"));
  Draw.z(Layer.effect + 0.002)
  for(let i = 0; i < 5; i++){
    Drawf.tri(e.x, e.y, 6, 70 * e.fout(), (i*72)-90);
  }
  for(let i = 0; i < 5; i++){
    Drawf.tri(e.x, e.y, 6, 45 * e.fout(), (i*72)+90);
  }
  Draw.color();
  for(let i = 0; i < 5; i++){
    Drawf.tri(e.x, e.y, 3, 25 * e.fout(), (i*72)-90);
  }
  for(let i = 0; i < 5; i++){
    Drawf.tri(e.x, e.y, 3, 12.5 * e.fout(), (i*72)+90);
  }
  Drawf.light(e.x, e.y, circleRad * 1.6, Color.valueOf("#6ecdec"), e.fout());
});
const freezeBombExplosion = new Effect(500, 30, e => {
  Angles.randLenVectors(e.id, 30, (Math.min(Interp.pow3Out.apply(e.fin()*3), 1)) * 180, (x, y) => {
    let size = e.fout() * 28;
    Draw.color(Color.valueOf("#ffffff"));
    Draw.alpha(0.6)
    Fill.circle(e.x + x, e.y + y, size/2);
  });
});
const tempbuffstatus = new Effect(30, e => {
  Draw.color(e.color)
  Fill.square(e.x, e.y, e.fslope() * 2, 45)
});
const permabuffstatus = new Effect(30, e => {
  Draw.color(e.color)
  Angles.randLenVectors(e.id, 2, 1 + e.fin() * 2, (x, y) => {
    Fill.square(e.x + x, e.y + y, e.fout() * 2.3 + 0.5);
  });
});
const insulatedstatus = new Effect(30, e => {
  Angles.randLenVectors(e.id, 2, 1 + e.fin() * 2, (x, y) => {
    Draw.alpha(1)
    Draw.color(Color.valueOf("#454545"))
    Fill.square(e.x + x, e.y + y, e.fout() * 2.3 + 0.5);
    Draw.color(Color.valueOf("#a2a2a2"))
    Fill.square(e.x + x, e.y + y, (e.fout() * 2.3 + 0.5)*0.5);
  });
});
const b135impactShockwave = new Effect(13, 300, e => {
  Draw.color(Pal.lighterOrange, Color.lightGray, e.fin())
  Lines.stroke(e.fout() * 4 + 0.2)
  Lines.circle(e.x, e.y, e.fin() * 200)
});
const delayedstatus = new Effect(30, e => {
  Draw.z(110)
  Draw.color(Color.valueOf("#00ffff"))
  Fill.circle(e.x, e.y, e.fout() * 1.5);
});
const sluggerSuppress = new Effect(22, e => {
  Draw.color(Pal.suppress)
  Lines.stroke(e.fout() * 2)
  Lines.circle(e.x, e.y, 4 + e.finpow() * 96)
});
const blastFuseShoot = new Effect(12, e => {
  Draw.color(Color.white, Color.valueOf("FF795E"), e.fin())
  Lines.stroke(e.fout() * 1.2 + 0.5)
  
  Angles.randLenVectors(e.id, 7, 25 + e.finpow(), e.rotation, 50, (x, y) => {
    Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fin() * 5 + 2)
  });
});
const boltTrailLithium = new Effect(40, e => {
  Draw.color(Color.white, Color.valueOf("B87DD8"), e.fin())
  Lines.stroke(e.fout() * 1.7 + 0.6)
  rand.setSeed(e.id)
  for (let i=0;i<3;i++) {
    let rot = e.rotation + rand.range(15)
    v.trns(rot, rand.random(e.fin()*27))
    Lines.lineAngle(e.x+v.x,e.y+v.y,rot,e.fout()*rand.random(2,7)+1.5)
  }
});
const boltTrailBulletum = new Effect(40, e => {
  Draw.color(Color.white, Color.valueOf("cb4a9b"), e.fin())
  Lines.stroke(e.fout() * 1.7 + 0.6)
  rand.setSeed(e.id)
  for (let i=0;i<3;i++) {
    let rot = e.rotation + rand.range(15)
    v.trns(rot, rand.random(e.fin()*27))
    Lines.lineAngle(e.x+v.x,e.y+v.y,rot,e.fout()*rand.random(2,7)+1.5)
  }
});
const phaseForeshadowTrail = new Effect(30, e => {
  for(let i = 0; i < 2; i++){
    Draw.color(i == 0 ? Pal.bulletYellowBack : Pal.bulletYellow);
    let m = i == 0 ? 1 : 0.5;
    let rot = e.rotation + 180;
    let w = 25 * e.fout() * m;
    Drawf.tri(e.x, e.y, w, (30 + Mathf.randomSeedRange(e.id, 15)) * m, rot);
    Drawf.tri(e.x, e.y, w, 10 * m, rot + 180);
  }
  Draw.color(Pal.bulletYellowBack)
  Angles.randLenVectors(e.id, 8, 10 + e.fin() * 40, (x, y) => {
    Fill.square(e.x + x, e.y + y, e.fout() * 3 + 0.5, 45);
  });
  Drawf.light(e.x, e.y, 60, Pal.bulletYellowBack, 0.6 * e.fout());
});
const macrocybeSpores = new Effect(64, e => {
  Draw.color(Pal.spore)
  Draw.z(111)
  Angles.randLenVectors(e.id, 40, e.finpow() * 180, e.rotation, 7, (x, y) => {
    Fill.circle(e.x + x, e.y + y, e.fout() * 1.5 + 0.65);
  });
});

module.exports = {
    lh2status: lh2status,
    irradiatedstatus: irradiatedstatus,
    freezeBombWeak: freezeBombWeak,
    freezeBomb: freezeBomb,
    freezeBombExplosion: freezeBombExplosion,
    tempbuffstatus: tempbuffstatus,
    permabuffstatus: permabuffstatus,
    insulatedstatus: insulatedstatus,
    b135impactShockwave: b135impactShockwave,
    delayedstatus: delayedstatus,
    sluggerSuppress: sluggerSuppress,
    blastFuseShoot: blastFuseShoot,
    boltTrailLithium: boltTrailLithium,
    boltTrailBulletum: boltTrailBulletum,
    phaseForeshadowTrail: phaseForeshadowTrail,
    macrocybeSpores: macrocybeSpores,
};
