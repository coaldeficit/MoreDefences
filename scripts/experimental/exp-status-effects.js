let j = require("more-defences-ivyx/status-effects")
// radiation effect (explanation: intense enough radiation can damage electronics irl)
let radiationEffect = extend(StatusEffect, "irradiated-status", {
    isHidden(){
      return true
    },
    speedMultiplier: 0.95,
    healthMultiplier: 0.95,
    reloadMultiplier: 0.95,
    buildSpeedMultiplier: 0.95,
    damage: 0.25,
    localizedName: 'Irradiated',
    effect: Fx.freezing,
    color: Color.valueOf("#7a9a9B"),
    update(unit,time){
      this.super$update(unit,time);
      if (j.checkstatus(unit, StatusEffects.electrified) != false) {
        unit.damagePierce(3)
      }
      if (j.checkstatus(unit, StatusEffects.melting) != false) {
        unit.damagePierce(0.5)
      }
    }
});
radiationEffect.affinity(StatusEffects.shocked, ((unit, result, time) => {
    unit.damagePierce(20)
    result.set(radiationEffect, result.time)
}));
radiationEffect.affinity(StatusEffects.electrified, ((unit, result, time) => {
    let h = j.checkstatus(unit, radiationEffect).time
    result.set(StatusEffects.electrified, result.time)
    unit.apply(radiationEffect, h)
}));
// explanation: if you were to hold something like plutonium (DO NOT ACTUALLY DO THAT) in your hand it would feel warm due to heat generated from its decay
// this applies to all highly radioactive materials, not just plutonium. even thorium and bismuth are heated up very slightly by their radioactive decay
radiationEffect.affinity(StatusEffects.melting, ((unit, result, time) => {
    let h = j.checkstatus(unit, radiationEffect).time
    result.set(StatusEffects.melting, result.time)
    unit.apply(radiationEffect, h)
}));

module.exports = {
    radiationEffect: radiationEffect
};
