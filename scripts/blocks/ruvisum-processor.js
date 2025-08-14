let ruvisumProcessor = extend(LogicBlock, "ruvisum-processor", {});
/*function thefuckingdamagefunction(damage, me) {
  // i cant believe i have to do this shit
  if (me.dead) return
  print(damage)
  
  let dm = Vars.state.rules.blockHealth(me.team)
  me.lastDamageTime = Time.time
  
  if (Mathf.zero(dm)) {
    damage = me.health + 1;
  } else {
    damage /= dm;
  }
  print(damage)
  print(dm)
  
  //TODO handle this better on the client.
    // boy i cant wait to have to change this shit later
  if (!Vars.net.client()) {
    me.health -= me.handleDamage(damage);
  }
  
  me.healthChanged();
  
  if (me.health <= 0) {
    Call.buildDestroyed(me.self());
  }
}
ruvisumProcessor.buildType = () => extend(LogicBlock.LogicBuild, ruvisumProcessor, {
  damage(bullet, source, damage) {
    thefuckingdamagefunction(damage, this)
  },
  collide(bullet) {
    return true
  },
  checkForceDark() {
    return false
  }
});*/
ruvisumProcessor.buildVisibility = BuildVisibility.worldProcessorOnly