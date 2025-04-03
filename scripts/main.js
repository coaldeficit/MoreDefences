require("md3/libs/rng")
require("md3/settings")

require("md3/campaign-warning")
require("md3/autoupdate")
require("md3/libs/shaders")

require("md3/planets")
require("md3/items")
require("md3/units/damagegroups")
require("md3/status-effects")
// require("md3/liquids")
require("md3/blocks/environment")

require('md3/blocks/cores');
require('md3/blocks/distribution');
// require("md3/blocks/vanadium-extractor")
// require("md3/blocks/vanadium-megaextractor")
require("md3/blocks/aerial-drill")
// require("md3/units/air/drones")
// require("md3/units/air/core-units")
// require("md3/blocks/zincite-extractor")
// require("md3/blocks/titaniumseperator")
require("md3/units/refreshconstruct")
// require('md3/blocks/purifier');
// require('md3/blocks/sterilizer');
// require('md3/blocks/cobalt-twister');
// require('md3/blocks/ionizer');
// require('md3/overtower');
// require('md3/blocks/recoverer');
require('md3/blocks/frozen-wall');
require('md3/blocks/puncture');
require('md3/blocks/shieldlayer');
require('md3/blocks/instant');
require('md3/blocks/delay');
require('md3/blocks/subturrets');
require('md3/blocks/spore-clumps');
require('md3/blocks/pelt');
require('md3/blocks/bolt');
require('md3/blocks/cinnabar-aqueduct');
require('md3/blocks/fieros-production');

// unit stuff
// serpulo
// ground
// shotgunner line
require("md3/units/ground/shotgunner/shotgunner")
require("md3/units/ground/shotgunner/pounder")
require("md3/units/ground/shotgunner/slugger")
require("md3/units/ground/shotgunner/rocketeer")
require("md3/units/ground/shotgunner/blitz")

// air
// swarmer line
require("md3/units/air/flocker/flocker")
require("md3/units/air/flocker/bee")
require("md3/units/air/flocker/hornet")
require("md3/units/air/flocker/messenger")
require("md3/units/air/flocker/tundra")

// naval
// mycena line
require("md3/units/naval/mycena/mycena")
require("md3/units/naval/mycena/panaeolus")
require("md3/units/naval/mycena/agaricus")
require("md3/units/naval/mycena/macrocybe")
require("md3/units/naval/mycena/armillaria")

// bosses
require("md3/units/bosses/havoc")
require("md3/units/bosses/crusher")

// fieros
// ground
// jeri line
require("md3/units/ground/jeri/jeri")

// donjon line
require("md3/units/ground/donjon/donjon")

// misc
require("md3/units/air/drones")
require("md3/units/air/core-units")

// this needs to load after everything else
require('md3/vanilla-changes');

// experimental
// require("md3/experimental/experimental")
