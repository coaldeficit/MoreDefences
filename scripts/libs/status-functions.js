function checkstatus(unit, status) {
  if (unit.statuses != null) {
    for (let i=0;i<unit.statuses.size;i++){
      if (unit.statuses.get(i).effect==status){
        return unit.statuses.get(i)
      }
    }
  }
  return false
}

module.exports = {
    checkstatus: checkstatus,
};
