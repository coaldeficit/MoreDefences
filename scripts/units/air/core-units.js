const sepuloT4 = extend(UnitType, "delta-ship", {});
sepuloT4.constructor = () => extend(UnitEntity, {});
sepuloT4.controller = (u) => u.team.isAI() ? new BuilderAI(true,400) : new CommandAI();

const fierosT1 = extend(UnitType, "protium-ship", {});
fierosT1.constructor = () => extend(PayloadUnit, {});
fierosT1.controller = (u) => new BuilderAI(true,400);
let fierosT1deco = extend(SuppressionFieldAbility, { // why must i do this shit
  display: false,
  draw(unit) {
	let rotate = unit.rotation * Math.PI / 180
    Draw.z(110)
    Draw.color(unit.team.color)
    Fill.circle(unit.x-(Math.cos(Math.PI+rotate)*-6.5), unit.y-(Math.sin(Math.PI+rotate)*-6.5), 2+(Math.sin(Time.globalTime/15)/3))
    Lines.stroke(1)
    Lines.circle(unit.x-(Math.cos(Math.PI+rotate)*-6.5), unit.y-(Math.sin(Math.PI+rotate)*-6.5), 3.5+(Math.sin(Time.globalTime/30)/4))
  },
  update(unit) {}
})
fierosT1.abilities.add(fierosT1deco)