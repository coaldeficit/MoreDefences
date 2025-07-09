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
const coilgunTrail = new Effect(30, e => {
  for(let i = 0; i < 2; i++){
    Draw.color(i == 0 ? Pal.heal : Color.white);
    let m = i == 0 ? 1 : 0.5;
    let rot = e.rotation + 180;
    let w = 15 * e.fout() * m;
    Drawf.tri(e.x, e.y, w, (15 + Mathf.randomSeedRange(e.id, 7.5)) * m, rot);
    Drawf.tri(e.x, e.y, w, 5 * m, rot + 180);
  }
  Drawf.light(e.x, e.y, 30, Pal.heal, 0.6 * e.fout());
});
const coilgunBomb = new Effect(15, 100, e => {
  Draw.color(Pal.heal);
  Lines.stroke(e.fout() * 4);
  Lines.circle(e.x, e.y, 4 + e.finpow() * 10);
  for(let i = 0; i < 4; i++){
    Drawf.tri(e.x, e.y, 6, 40 * e.fout(), i*90 + 45);
  }
  Draw.color();
  for(let i = 0; i < 4; i++){
    Drawf.tri(e.x, e.y, 3, 15 * e.fout(), i*90 + 45);
  }
  Drawf.light(e.x, e.y, 30, Pal.heal, 0.6 * e.fout());
});
const coilgunHit = new Effect(20, 200, e => {
  Draw.color(Pal.heal);
  for(let i = 0; i < 2; i++){
    Draw.color(i == 0 ? Pal.heal : Color.white);
    let m = i == 0 ? 1 : 0.5;
    for(let j = 0; j < 4; j++){
      let rot = e.rotation + Mathf.randomSeedRange(e.id + j, 50);
      let w = 11.5 * e.fout() * m;
      Drawf.tri(e.x, e.y, w, (40 + Mathf.randomSeedRange(e.id + j, 20)) * m, rot);
      Drawf.tri(e.x, e.y, w, 10 * m, rot + 180);
    }
  }
  e.scaled(10, c => {
    Draw.color(Color.white);
    Lines.stroke(c.fout() * 2 + 0.2);
    Lines.circle(e.x, e.y, c.fin() * 10);
  });
  e.scaled(12, c => {
    Draw.color(Pal.heal);
    Angles.randLenVectors(e.id, 25, 5 + e.fin() * 20, e.rotation, 60, (x, y) => {
      Fill.square(e.x + x, e.y + y, c.fout() * 3, 45);
    });
  });
});
const coilgunShoot = new Effect(24, e => {
  e.scaled(10, b => {
    Draw.color(Color.white, Pal.heal, b.fin());
    Lines.stroke(b.fout() * 3 + 0.2);
    Lines.circle(b.x, b.y, b.fin() * 25);
  });
  Draw.color(Pal.heal);
  for(let i=-1;i<=1;i+=2){
    Drawf.tri(e.x, e.y, 6 * e.fout(), 42.5, e.rotation + 90 * i);
    Drawf.tri(e.x, e.y, 6 * e.fout(), 25, e.rotation + 20 * i);
  }
});
const coilgunHitB = new Effect(18,200, e => {
  Draw.color(Pal.heal);
  for(let i=-1;i<=1;i+=2){
    Drawf.tri(e.x, e.y, 10 * e.fout(), 30, e.rotation + 140 * i);
  }
});
const juanBlast = new Effect(13, e => {
  Draw.color(Pal.lightOrange, Color.valueOf("FF795E"), e.fin());
  let w = 1 + 60 * e.fout();
  Drawf.tri(e.x+(Math.cos(e.rotation*(Math.PI/180))*30*e.fout()), e.y+(Math.sin(e.rotation*(Math.PI/180))*30*e.fout()), w, 160 * e.fin(), e.rotation);
  Drawf.tri(e.x+(Math.cos(e.rotation*(Math.PI/180))*30*e.fout()), e.y+(Math.sin(e.rotation*(Math.PI/180))*30*e.fout()), w, 40 * e.fout(), e.rotation + 180);
});
const juanSmoke = new Effect(300, e => {
  Angles.randLenVectors(e.id, 40, e.finpow() * 320, e.rotation, 5, (x, y) => {
    Draw.color(Color.gray);
    Draw.alpha((0.5 - Math.abs(e.fin() - 0.5)) * 2);
    Fill.circle(e.x + x, e.y + y, e.fout() * 4.5 + 0.65);
  });
});
const bellaBlast = new Effect(13, e => {
  Draw.color(Color.white, Color.valueOf("0000FF"), e.fin());
  let w = 1 + 20 * e.fout();
  Drawf.tri(e.x+(Math.cos(e.rotation*(Math.PI/180))*(10+(12*e.fout()))), e.y+(Math.sin(e.rotation*(Math.PI/180))*(10+(12*e.fout()))), w, 48 * e.fin(), e.rotation);
  Drawf.tri(e.x+(Math.cos(e.rotation*(Math.PI/180))*(10+(12*e.fout()))), e.y+(Math.sin(e.rotation*(Math.PI/180))*(10+(12*e.fout()))), w, 12 * e.fout(), e.rotation + 180);
});
bellaBlast.followParent = false
const bellaCharge = new Effect(30, 32, e => {
  Draw.color(Color.valueOf("6CFFFF"));
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, e.fout() * 16);
});
bellaCharge.followParent = true
bellaCharge.rotWithParent = true
const brominatedstatus = new Effect(80, e => {
  Draw.z(111)
  Draw.color(Color.valueOf("#A33600"))
  Fill.tri(e.x+Math.cos(e.id)*e.fout()*3,e.y+Math.sin(e.id)*e.fout()*3,e.x+Math.cos(e.id+(2*Math.PI/3))*e.fout()*3,e.y+Math.sin(e.id+(2*Math.PI/3))*e.fout()*3,e.x+Math.cos(e.id+(4*Math.PI/3))*e.fout()*3,e.y+Math.sin(e.id+(4*Math.PI/3))*e.fout()*3)
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
    coilgunTrail: coilgunTrail,
    coilgunBomb: coilgunBomb,
    coilgunHit: coilgunHit,
    coilgunShoot: coilgunShoot,
    coilgunHitB: coilgunHitB,
    juanBlast: juanBlast,
    juanSmoke: juanSmoke,
    bellaBlast: bellaBlast,
    bellaCharge: bellaCharge,
    brominatedstatus: brominatedstatus,
};
