let dmmShader
let dmmShaderCache
Events.on(ClientLoadEvent, e => {
  if (Core.settings.getBool("md3-loadshaders", true)) {
    let environment = require("md3/blocks/environment")
    try {
      dmmShader = new Shaders.SurfaceShader(Vars.tree.get("shaders/screenspace.vert").readString(), Vars.tree.get("shaders/md3-dmm.frag").readString())
      dmmShaderCache = new CacheLayer.ShaderLayer(dmmShader)
      CacheLayer.add(0, dmmShaderCache);
      environment.dimethyl.cacheLayer = dmmShaderCache
      environment.cinnabarDMM.cacheLayer = dmmShaderCache
      environment.lithimentDMM.cacheLayer = dmmShaderCache
    } catch (error) {
      Vars.ui.showOkText("MoreDefences Shader Error", "An error has occured while loading shaders for MoreDefences.\nIf you are on mobile, your device may not support the shaders in MoreDefences.\n\nPlease disable \"Load Shaders On Startup\" in the MoreDefences settings and restart the game to avoid unintended behaviour.", ()=>{})
      return
    }
  }
})

module.exports = {
  dmmShader: dmmShader,
  dmmShaderCache: dmmShaderCache
};