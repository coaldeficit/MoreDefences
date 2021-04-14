// LH2 effect
let liquidHydrogenEffect = extend(StatusEffect, "liquidHydrogenEffect", {
    let transitionDamage = 18
    isHidden(){
      return false
    },
    init(() -> {
      affinity(StatusEffects.blasted, ((unit, time, newTime, result) -> {
        unit.damagePierce(transitionDamage);
        result.set(liquidHydrogenEffect, time);
      }));
      affinity(StatusEffects.burning, ((unit, time, newTime, result) -> {
        unit.damagePierce(transitionDamage / 1.5);
        result.set(liquidHydrogenEffect, time);
        result.set(StatusEffects.burning, time + newTime);
      }));
      affinity(StatusEffects.melting, ((unit, time, newTime, result) -> {
        unit.damagePierce(transitionDamage / 1.5);
        result.set(liquidHydrogenEffect, time);
        result.set(StatusEffects.melting, time + newTime);
      }));
    });
});
liquidHydrogenEffect.speedMultiplier = 0.6;
liquidHydrogenEffect.healthMultiplier = 0.7;
liquidHydrogenEffect.localizedName = 'Hydrogenated';
liquidHydrogenEffect.effect = Fx.freezing;
liquidHydrogenEffect.color  = '#7a9a9B';
