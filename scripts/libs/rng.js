let rngindex = 0
let rngtable = []
for (let i=0;i<10000;i++) {
  rngtable.push(Math.floor(Math.pow(i+10000,1.6457343+((i+400)/4000)))%1000)
}

function setIndex(index) {
  return rngindex = Math.round(index)%10000
}
function randomUnsynced() { // named so because if you run this without first setting an index that is the same for everyone it'll desync in mp
  let a = rngtable[rngindex]
  rngindex++
  if (rngindex >= rngtable.length) rngindex = 0
  return a
}

module.exports = {
    setIndex: setIndex,
    randomUnsynced: randomUnsynced,
};
