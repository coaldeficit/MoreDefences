// LH2 effect
let liquidHydrogenEffect = extend(StatusEffect, "liquidHydrogenEffect", {
    isHidden(){
      return false
    },
    speedMultiplier: 0.6,
    healthMultiplier: 0.7,
    localizedName: 'Hydrogenated',
    effect: Fx.freezing,
    color: Color.valueOf("#7a9a98"),
});
liquidHydrogenEffect.affinity(StatusEffects.blasted, ((unit, time, newTime, result) => {
    unit.damagePierce(18);
    result.set(liquidHydrogenEffect, time);
}));
