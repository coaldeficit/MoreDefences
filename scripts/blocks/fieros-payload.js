let basicUnitFactory = extend(UnitFactory, "basic-unit-factory", {});
let conveyor = extend(PayloadConveyor, "lithitic-payload-conveyor", {});
let router = extend(PayloadRouter, "lithitic-payload-router", {});
let basicComponentAssembler = extend(Constructor, "component-assembler", {});

let armorPlate = extend(Wall, "armor-plate", {})
let miniRifle = extend(Wall, "mini-rifle", {})

module.exports = {
  basicUnitFactory: basicUnitFactory,
  conveyor: conveyor,
  router: router,
  basicComponentAssembler: basicComponentAssembler,
  
  // unit components
  armorPlate: armorPlate,
  miniRifle: miniRifle,
};
