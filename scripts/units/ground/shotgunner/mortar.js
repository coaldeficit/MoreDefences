const ShotT2 = extend(UnitType, "mortar-mech", {});
ShotT2.constructor = () => extend(LegsUnit, {});

// this will be removed in 3.3.0! update your maps before then!!!
const ShotT2Placeholder = extend(UnitType, "pounder-mech", {
  hidden: true
});
ShotT2Placeholder.constructor = () => extend(UnitEntity, {});
const unitBullet = extend(BasicBulletType, {
  lifetime: 1,
  despawnUnit: ShotT2,
  killShooter: true,
  createUnits(b,x,y) {
    print("MoreDefences Pounder unit has been renamed to Mortar. Please update your maps to use it instead of the placeholder pounder unit, as it will be removed in 3.3.0")
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
ShotT2Placeholder.weapons.add(unitLauncher)
if (ShotT2Placeholder.unlocked && !ShotT2.unlocked) Vars.content.getByName(ContentType.unit, "md3-mortar-mech").unlock()
Events.on(WorldLoadEvent, e => {
  let len = Vars.state.rules.spawns.size
  for (let i=0;i<len;i++) {
    if (Vars.state.rules.spawns.get(i).type == ShotT2Placeholder) {
      Vars.state.rules.spawns.get(i).type = ShotT2
      print("MoreDefences Pounder unit has been renamed to Mortar. Please update your maps to use it instead of the placeholder pounder unit, as it will be removed in 3.3.0")
    }
  }
})

Blocks.additiveReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-shotgunner-mech"),
  Vars.content.getByName(ContentType.unit, "md3-mortar-mech")
)
