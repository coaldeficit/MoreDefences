// more ammo variety for fuse
const fuseIron = extend(ShrapnelBulletType, {
});
fuseIron.length = Blocks.fuse.range + 10;
fuseIron.damage = 120;
fuseIron.ammoMultiplier = 3;
fuseIron.width = 17;
fuseIron.reloadMultiplier = 0.65;
fuseIron.toColor = '#afafaf';

Blocks.fuse.ammo.push('more-defences-ivyx-ferum', fuseIron);
