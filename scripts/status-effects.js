// LH2 effect
let liquidHydrogenEffect = extend(StatusEffect, "liquidHydrogenEffect", {
    isHidden(){
        return false
    },
});
liquidHydrogenEffect.speedMultiplier = 0.6;
liquidHydrogenEffect.armorMultiplier = 0.8;
liquidHydrogenEffect.localizedName = 'Hydrogenated';
liquidHydrogenEffect.effect = Fx.freezing;
liquidHydrogenEffect.color  = '#7a9a9B';
