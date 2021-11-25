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
    unit.apply(liquidHydrogenEffect, newTime + time);
}));
liquidHydrogenEffect.affinity(StatusEffects.burning, ((unit, time, newTime, result) => 
    unit.damagePierce(8);
    unit.apply(StatusEffects.burning, newTime + time);
    unit.apply(liquidHydrogenEffect, time/2);
}));
liquidHydrogenEffect.affinity(StatusEffects.melting, ((unit, time, newTime, result) => {
    unit.damagePierce(12);
    unit.apply(StatusEffects.melting, newTime + time);
    unit.apply(liquidHydrogenEffect, time/2);
}));

module.exports = {
    liquidHydrogenEffect: liquidHydrogenEffect
};
