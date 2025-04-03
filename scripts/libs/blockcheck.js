// thank you anuke for writing functional code
// /s
function iterateSquare(x,y,width,height,func) {
  for (let i=0;i<width;i++) {
    for (let j=0;j<height;j++) {
      let t = Vars.world.tile(x+i, y+j)
      if (t!=null) {
        func(t)
      }
    }
  }
}
function iterateSquareCenter(x,y,width,height,func) {
  iterateSquare(x-Math.round(width/2),y-Math.round(height/2),width,height,func)
}
module.exports = {
    iterateSquare: iterateSquare,
    iterateSquareCenter: iterateSquareCenter,
};
