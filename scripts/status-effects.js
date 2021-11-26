function checkstatus(unit, status) {
  for(let i=0;i<unit.statuses.size;i++){
    if (unit.statuses.get(i).effect==status){
      return unit.statuses.get(i)
    }
  }
  return false
}

// LH2 effect
let liquidHydrogenEffect = extend(StatusEffect, "liquid-hydrogen-status-effect", {
    isHidden(){
      return false
    },
    speedMultiplier: 0.6,
    healthMultiplier: 0.7,
    localizedName: 'Hydrogenated',
    effect: Fx.freezing,
    color: Color.valueOf("#7a9a9B"),
    update(unit,time){
      this.super$update
      /*if (checkstatus(unit, StatusEffects.burning) != false) {
        unit.damagePierce(8)
        checkstatus(unit, StatusEffects.burning).time = Math.max(300, checkstatus(unit, StatusEffects.burning).time)
        unit.unapply(liquidHydrogenEffect)
      }
      if (checkstatus(unit, StatusEffects.melting) != false) {
        unit.damagePierce(8)
        checkstatus(unit, StatusEffects.melting).time = Math.max(300, checkstatus(unit, StatusEffects.melting).time)
        unit.unapply(liquidHydrogenEffect)
      }*/
    }
});
liquidHydrogenEffect.affinity(StatusEffects.blasted, ((unit, result, time) => {
    unit.damagePierce(22);
}));
liquidHydrogenEffect.affinity(StatusEffects.burning, ((unit, result, time) => {
    unit.damagePierce(8)
    result.set(StatusEffects.burning, result.time)
    unit.unapply(liquidHydrogenEffect)
}));
liquidHydrogenEffect.affinity(StatusEffects.melting, ((unit, result, time) => {
    unit.damagePierce(12)
    result.set(StatusEffects.melting, result.time)
    unit.unapply(liquidHydrogenEffect)
}));

module.exports = {
    liquidHydrogenEffect: liquidHydrogenEffect
};
