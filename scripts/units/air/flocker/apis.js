const FlockT2 = extend(UnitType, "apis-ship", {});
FlockT2.constructor = () => extend(UnitEntity, {});

// this will be removed in 3.3.0! update your maps before then!!!
const FlockT2Placeholder = extend(UnitType, "bee-ship", {
  hidden: true
});
FlockT2Placeholder.constructor = () => extend(UnitEntity, {});
const unitBullet = extend(BasicBulletType, {
  lifetime: 1,
  despawnUnit: FlockT2,
  killShooter: true,
  createUnits(b,x,y) {
    print("MoreDefences Bee unit has been renamed to Apis. Please update your maps to use it instead of the placeholder bee unit, as it will be removed in 3.3.0")
    if (!Vars.net.client()) {
      this.super$createUnits(b,x,y);
    }
  }
})
const unitLauncher = extend(Weapon, {
  name: "md3-generic-bomber-weapon",
  mirror: false,
  reload: 1,
  bullet: unitBullet,
  alwaysShooting: true,
});
FlockT2Placeholder.weapons.add(unitLauncher)
if (FlockT2Placeholder.unlocked && !FlockT2.unlocked) Vars.content.getByName(ContentType.unit, "md3-apis-ship").unlock()
Events.on(WorldLoadEvent, e => {
  let len = Vars.state.rules.spawns.size
  for (let i=0;i<len;i++) {
    if (Vars.state.rules.spawns.get(i).type == FlockT2Placeholder) {
      Vars.state.rules.spawns.get(i).type = FlockT2
      print("MoreDefences Bee unit has been renamed to Apis. Please update your maps to use it instead of the placeholder bee unit, as it will be removed in 3.3.0")
    }
  }
})

Blocks.additiveReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-flocker-ship"),
  Vars.content.getByName(ContentType.unit, "md3-apis-ship")
)