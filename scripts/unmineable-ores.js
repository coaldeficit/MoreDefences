// Primary Color Minerals
let vanadinite = extend(DoubleOverlayFloor, "vanadinite", {
  localizedName: Vanadinite,
  variants: 3,
  playerUnmineable: true,
  mapColor: Color.valueOf("#ED3F00"),
  useColor: true
});
let adamite = extend(DoubleOverlayFloor, "adamite", {
  localizedName: Adamite,
  variants: 4,
  playerUnmineable: true,
  mapColor: Color.valueOf("#A7BC40"),
  useColor: true
});
let chalcanthite = extend(DoubleOverlayFloor, "chalcanthite", {
  localizedName: Chalcanthite,
  variants: 3,
  playerUnmineable: true,
  mapColor: Color.valueOf("#24B6FC"),
  useColor: true
});

module.exports = {
    vanadinite: vanadinite,
    adamite: adamite,
    chalcanthite: chalcanthite
};