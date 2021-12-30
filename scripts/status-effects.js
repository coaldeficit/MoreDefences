const statusFunc = require("more-defences-ivyx/libs/status-functions")
const vfx = require("more-defences-ivyx/libs/vfx")
const bulLib = require("more-defences-ivyx/libs/bulletlib")

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
    result.set(StatusEffects.electrified, time)
    unit.apply(radiationEffect, result.time)
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
    description: 'Protects units affected by it from electricity-based status effects.',
    update(unit,time){
      this.super$update(unit,time);
      let electricEffects = [StatusEffects.shocked, StatusEffects.electrified]
      electricEffects.forEach(function(effect){
        if (statusFunc.checkstatus(unit, effect) != false) unit.unapply(effect)
      })
      unit.apply(insulatedEffect, 9999999999999999999999999999999)
    }
});
insulatedEffect.opposite(StatusEffects.shocked);
insulatedEffect.opposite(StatusEffects.electrified);

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
let blazedEffect = extend(StatusEffect, "blazed-status", {
    isHidden(){
      return true
    },
    reloadMultiplier: 0.8,
    localizedName: 'Blazed',
    effect: vfx.permabuffstatus,
    color: Color.valueOf("#FC934E"),
    permanent: true,
    description: 'Protects units affected by it from temperature-based status effect. Makes any units affected by it summon fireballs.',
    update(unit,time){
      this.super$update(unit,time);
      if (this.fireballTimer == undefined) this.fireballTimer = -1
      this.fireballTimer++
      let tempEffects = [StatusEffects.burning, StatusEffects.melting, StatusEffects.wet, StatusEffects.freezing]
      tempEffects.forEach(function(effect){
        if (statusFunc.checkstatus(unit, effect) != false) unit.unapply(effect)
      })
      unit.apply(blazedEffect, 9999999999999999999999999999999)
      if (this.fireballTimer >= 51) {
        this.fireballTimer = 0
        let blazedFireball = bulLib.makeBullet({
          type: BasicBulletType,
          width: 2*(getBaseLog(1.25, Math.max(unit.type.health/150, 1))+1),
          height: 2*(getBaseLog(1.25, Math.max(unit.type.health/150, 1))+1),
          damage: 14*(getBaseLog(1.25, Math.max(unit.type.health/150, 1))+1),
          speed: 2,
          lifetime: 32+unit.type.hitSize,
          status: StatusEffects.burning,
          sprite: 'circle-bullet',
          backRegion: Core.atlas.find("circle-bullet-back"),
          frontRegion: Core.atlas.find("circle-bullet"),
          color: Pal.gray,
          backColor: Color.valueOf("#FC934E"),
          trailColor: Color.valueOf("#FC934E"),
          trailLength: 7*(getBaseLog(1.25, Math.max(unit.type.health/150, 1))+1),
          trailWidth: (1*(getBaseLog(1.25, Math.max(unit.type.health/150, 1))+1))*0.75,
          shrinkX: 0,
          shrinkY: 0,
          keepVelocity: false
        })
        Rand().setSeed(Date.now()+unit.id)
        let offset = Rand().random(0, 360)
        for (let i=0;i<10;i++) {
          blazedFireball.create(unit, unit.team, unit.x, unit.y, ((360/10)*i)+offset, 1, 1)
        }
      }
    }
});
blazedEffect.affinity(StatusEffects.tarred, ((unit, result, time) => {
    unit.heal(2)
    result.set(blazedEffect, result.time)
}));
blazedEffect.affinity(liquidHydrogenEffect, ((unit, result, time) => {
    unit.heal(3)
    result.set(blazedEffect, result.time)
}));
blazedEffect.opposite(StatusEffects.burning);
blazedEffect.opposite(StatusEffects.melting);
blazedEffect.opposite(StatusEffects.wet);
blazedEffect.opposite(StatusEffects.freezing);

module.exports = {
    liquidHydrogenEffect: liquidHydrogenEffect,
    radiationEffect: radiationEffect,
    insulatedEffect: insulatedEffect,
    blazedEffect: blazedEffect,
};
