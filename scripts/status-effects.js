// LH2 effect
let liquidHydrogenEffect = extend(StatusEffect, "liquid-hydrogen-status-effect", {
    isHidden(){
      return true
    },
    speedMultiplier: 0.6,
    healthMultiplier: 0.7,
    localizedName: 'Hydrogenated',
    effect: Fx.freezing,
    color: Color.valueOf("#7a9a9B"),
});
liquidHydrogenEffect.affinity(StatusEffects.blasted, ((unit, time, newTime, result) => {
    unit.damagePierce(18);
    unit.apply(liquidHydrogenEffect, newTime + time)
}));
liquidHydrogenEffect.affinity(StatusEffects.burning, ((unit, time, newTime, result) => {
    unit.damagePierce(8);
    result.set(StatusEffects.burning, newTime + time);
}));
liquidHydrogenEffect.affinity(StatusEffects.melting, ((unit, time, newTime, result) => {
    unit.damagePierce(8);
    result.set(StatusEffects.melting, newTime + time);
}));

module.exports = {
    liquidHydrogenEffect: liquidHydrogenEffect
};
