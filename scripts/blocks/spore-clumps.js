let clump1 = extend(Block, "spore-clump-1", {
  description: "Spore clump.",
  scaledHealth: 45,
  size: 1,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.plantBreak
});
let clump2 = extend(Block, "spore-clump-2", {
  description: "Spore clump. Spans multiple tiles.",
  scaledHealth: 45,
  size: 2,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.plantBreak
});
let clump3 = extend(Block, "spore-clump-3", {
  description: "Spore clump. Spans multiple tiles.",
  scaledHealth: 45,
  size: 3,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.plantBreak
});
let clump4 = extend(Block, "spore-clump-4", {
  description: "Spore clump. Spans multiple tiles.",
  scaledHealth: 45,
  size: 4,
  solid: true,
  destructible: true,
  update: true,
  rebuildable: false,
  destroySound: Sounds.plantBreak
});

module.exports = {
    clump1: clump1,
    clump2: clump2,
    clump3: clump3,
    clump4: clump4,
};