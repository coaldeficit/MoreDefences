function makeBullet(bul){ // to anyone reading this: feel free to use this in your mod if you dont feel like making 3304934 variables/constants for frag bullets
  let o = {}
  Object.keys(bul).forEach(function(prop){
    if (prop != 'type') o[prop] = bul[prop]
  })
  return extend(bul.type, o)
} // example usage is in the file for pelter

module.exports = {
  makeBullet: makeBullet,
};