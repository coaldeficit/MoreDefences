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
  Drawf.light(e.x, e.y, circleRad * 1.6, Pal.heal, e.fout());
});

module.exports = {
    lh2status: lh2status,
    irradiatedstatus: irradiatedstatus,
    freezeBombWeak: freezeBombWeak,
};
