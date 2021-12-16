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

module.exports = {
    lh2status: lh2status,
    irradiatedstatus: irradiatedstatus,
};
