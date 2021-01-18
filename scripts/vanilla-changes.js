// more ammo variety for fuse
const fuseIron = extend(ShrapnelBulletType, {
});
fuseIron.length = Blocks.fuse.range + 10;
fuseIron.damage = 120f;
fuseIron.ammoMultiplier = 3f;
fuseIron.width = 17f;
fuseIron.reloadMultiplier = 0.65f;
fuseIron.toColor = '#afafaf';

Blocks.fuse.ammo.push(['more-defences-ivyx-ferum', fuseIron]);
