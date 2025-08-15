let ruvisumProcessor = extend(LogicBlock, "ruvisum-processor", {
  checkForceDark() {
    return false
  }
});
function thefuckingdamagefunction(damage, me) {
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
    Call.buildDestroyed(me);
  }
}
ruvisumProcessor.buildType = () => extend(LogicBlock.LogicBuild, ruvisumProcessor, {
  damage(a,b,c) { // https://discord.com/channels/391020510269669376/653292618406690847/1405825213920186438 screw you glennfolker yes i can LMFAOOOOOOOOOOOOOOOOOOOOOO get fucked
    if (a instanceof Bullet) {
      thefuckingdamagefunction(c, this)
      Events.fire(this.bulletDamageEvent.set(this, a));
    } else if (a instanceof Team) {
      thefuckingdamagefunction(b, this)
    } else {
      thefuckingdamagefunction(a, this)
    }
  },
  collide(bullet) {
    return true
  }
});
ruvisumProcessor.buildVisibility = BuildVisibility.worldProcessorOnly