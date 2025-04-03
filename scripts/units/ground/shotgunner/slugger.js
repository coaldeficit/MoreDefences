const vfx = require("md3/libs/vfx")

const ShotT3 = extend(UnitType, "slugger-mech", {});
ShotT3.constructor = () => extend(LegsUnit, {});

let suppress = extend(SuppressionFieldAbility, {
  range: 96,
  update(unit) {
    if (this.timer + Time.delta >= this.reload) {
      vfx.sluggerSuppress.at(unit.x, unit.y)
    }
    this.super$update(unit)
  },
  draw(unit) {},
  getBundle() {return 'ability.suppressionfield'},
})
ShotT3.abilities.add(suppress)

Blocks.multiplicativeReconstructor.addUpgrade(
  Vars.content.getByName(ContentType.unit, "md3-pounder-mech"),
  Vars.content.getByName(ContentType.unit, "md3-slugger-mech")
)