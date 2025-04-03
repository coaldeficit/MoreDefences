function getMDUnit(unit) {return Vars.content.getByName(ContentType.unit, "md3-" + unit)}
let groups = {
  basic: [], // t1s
  malis: [], // units introduced on sectors with malis
  crux: [], // units introduced on sectors with crux
  unplated: [], // units with weak armor
  simple: [], // units with no special abilities or functions
  complex: [], // units with several special abilities or functions
  // arbitrary shit starts here, none of these have a concrete definition put whatever the fuck you want in them based on how you feel i dont care
  blaster: [],
  battleship: [], // probably highly armed units?
  ironclad: [], // probably tankier units?
  detonator: [], // probably splash damage heavy units?
  walker: [],
  gunner: [],
  ranger: [],
  attractor: [],
}
function addToGroup(group, unittype) {
  if (groups[group] != null) groups[group].push(unittype)
}
function isInGroup(group, unittype) {
  return groups[group].includes(unittype)
}
function getGroup(group) {
  return groups[group]
}
function getAllGroups() {
  return groups
}
function addToGroups(groupList, unittype) {
  for (let i = 0; i < groupList.length; i++) {
    if (groups[groupList[i]] != null) groups[groupList[i]].push(unittype)
  }
}
let groupStatUnit = new Stat("md3-damgroupunit")
function generateGroupStatUnit(groupList) {
  let string = "[accent]"
  for (let i = 0; i < groupList.length; i++) {
    string += "\n" + groupList[i][0].toUpperCase() + groupList[i].slice(1)
  }
  string += "[]"
  return string
}
function generateGroupStatTurret(groupList, mults) {
  let string = "\n[darkgray]Unlisted: 100%[]"
  for (let i = 0; i < groupList.length; i++) {
    let color = "accent"
    if (mults[i] > 1) {
      color = mults[i] > 1.5 ? "acid" : "green"
    } else if (mults[i] < 1) {
      color = mults[i] > 0.5 ? "orange" : mults[i] > 0.25 ? "red" : "brick"
    }
    string += "\n[" + color + "]" + groupList[i][0].toUpperCase() + groupList[i].slice(1) + ": " + Math.floor(mults[i]*100) + "%[]"
  }
  string += "[]"
  return string
}

module.exports = {
  addToGroup: addToGroup,
  isInGroup: isInGroup,
  getGroup: getGroup,
  getAllGroups: getAllGroups,
  addToGroups: addToGroups,
  groupStatUnit: groupStatUnit,
  generateGroupStatUnit: generateGroupStatUnit,
  generateGroupStatTurret: generateGroupStatTurret,
};
