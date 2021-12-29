const statusFunc = require("more-defences-ivyx/libs/status-functions")
const vfx = require("more-defences-ivyx/libs/vfx")

// LH2 effect
let liquidHydrogenEffect = extend(StatusEffect, "liquid-hydrogen-status-effect", {
    isHidden(){
      return false
    },
    speedMultiplier: 0.6,
    healthMultiplier: 0.7,
    localizedName: 'Hydrogenated',
    effect: vfx.lh2status,
    color: Color.valueOf("#7a9a9B"),
    update(unit,time){
      this.super$update(unit,time);
      if (statusFunc.checkstatus(unit, StatusEffects.burning) != false) {
        unit.damagePierce(8)
        statusFunc.checkstatus(unit, StatusEffects.burning).time = Math.max(300, statusFunc.checkstatus(unit, StatusEffects.burning).time)
        unit.unapply(liquidHydrogenEffect)
      }
      if (statusFunc.checkstatus(unit, StatusEffects.melting) != false) {
        unit.damagePierce(8)
        statusFunc.checkstatus(unit, StatusEffects.melting).time = Math.max(300, statusFunc.checkstatus(unit, StatusEffects.melting).time)
        unit.unapply(liquidHydrogenEffect)
      }
    }
});
liquidHydrogenEffect.affinity(StatusEffects.blasted, ((unit, result, time) => {
    unit.damagePierce(22);
}));
liquidHydrogenEffect.affinity(StatusEffects.burning, ((unit, result, time) => {
    unit.damagePierce(8)
    result.set(StatusEffects.burning, Math.min(result.time, 300))
    unit.unapply(liquidHydrogenEffect)
}));
liquidHydrogenEffect.affinity(StatusEffects.melting, ((unit, result, time) => {
    unit.damagePierce(12)
    result.set(StatusEffects.melting, Math.min(result.time, 300))
    unit.unapply(liquidHydrogenEffect)
}));

// radiation effect (explanation: intense enough radiation can damage electronics irl)
let radiationEffect = extend(StatusEffect, "irradiated-status", {
    isHidden(){
      return false
    },
    speedMultiplier: 0.95,
    healthMultiplier: 0.95,
    reloadMultiplier: 0.95,
    buildSpeedMultiplier: 0.95,
    damage: 0.25,
    localizedName: 'Irradiated',
    effect: vfx.irradiatedstatus,
    color: Color.valueOf("#826B57"),
    update(unit,time){
      this.super$update(unit,time);
      if (statusFunc.checkstatus(unit, StatusEffects.electrified) != false) {
        unit.damagePierce(3)
      }
      if (statusFunc.checkstatus(unit, StatusEffects.melting) != false) {
        unit.damagePierce(0.5)
      }
    }
});
radiationEffect.affinity(StatusEffects.shocked, ((unit, result, time) => {
    unit.damagePierce(20)
    result.set(radiationEffect, result.time)
}));
radiationEffect.affinity(StatusEffects.electrified, ((unit, result, time) => {
    let h = statusFunc.checkstatus(unit, radiationEffect).time
    result.set(StatusEffects.electrified, result.time)
    unit.apply(radiationEffect, h)
}));
// explanation: if you were to hold something like plutonium (DO NOT ACTUALLY DO THAT) in your hand it would feel warm due to heat generated from its decay
// this applies to all highly radioactive materials, not just plutonium. even thorium and bismuth are heated up very slightly by their radioactive decay
radiationEffect.affinity(StatusEffects.melting, ((unit, result, time) => {
    let h = statusFunc.checkstatus(unit, radiationEffect).time
    result.set(StatusEffects.melting, result.time)
    unit.apply(radiationEffect, h)
}));

let insulatedEffect = extend(StatusEffect, "insulated-status", {
    isHidden(){
      return false
    },
    speedMultiplier: 0.92,
    localizedName: 'Insulated',
    effect: vfx.insulatedstatus,
    color: Pal.gray, // #454545
    permanent: true,
    update(unit,time){
      this.super$update(unit,time);
      unit.apply(insulatedEffect, 9999999999999999999999999999999)
    }
});
insulatedEffect.opposite(StatusEffects.shocked);
insulatedEffect.opposite(StatusEffects.electrified);

module.exports = {
    liquidHydrogenEffect: liquidHydrogenEffect,
    radiationEffect: radiationEffect,
    insulatedEffect: insulatedEffect,
};
