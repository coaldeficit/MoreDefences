Events.on(ClientLoadEvent, e => {
  let fieros = Vars.content.getByName(ContentType.planet, "md3-md3-fieros")
  let offset = 0//fieros.id-7 // hardcode this to 0 once pull request #10374 gets merged
  let props = {
	seed: 0,
	radius: 1,
	octaves: 1,
	persistence: 1,
	scale: 1,
	mag: 1,
	colorA: Color.valueOf("#ffffffff"),
	colorB: Color.valueOf("#000000ff"),
	colorOct: 1,
	colorPersi: 1,
	colorScale: 1,
	colorThres: 0.5,
  }
  let meshList = []
  // DMM
  props = {
	seed: 69,
	radius: 1.05,
	octaves: 1,
	persistence: 1,
  	scale: 1,
    mag: 0,
	colorA: Color.valueOf("#690940ff"),
	colorB: Color.valueOf("#690940ff"),
	colorOct: 1,
	colorPersi: 0.5,
	colorScale: 1,
	colorThres: 0.5,
  }
  meshList.push(new NoiseMesh(fieros,props.seed-offset,6,props.radius,props.octaves,props.persistence,props.scale,props.mag,props.colorA,props.colorB,props.colorOct,props.colorPersi,props.colorScale,props.colorThres))
  // NIEBIESKITE, SULFURIC ROCK
  props = {
	seed: 5647267,
	radius: 0.9219,
	octaves: 3,
	persistence: 1,
  	scale: 0.6,
    mag: 1.3,
	colorA: Color.valueOf("#292A55ff"),
	colorB: Color.valueOf("#998B15ff"),
	colorOct: 1,
	colorPersi: 0.5,
	colorScale: 1.59,
	colorThres: 0.6,
  }
  meshList.push(new NoiseMesh(fieros,props.seed-offset,6,props.radius,props.octaves,props.persistence,props.scale,props.mag,props.colorA,props.colorB,props.colorOct,props.colorPersi,props.colorScale,props.colorThres))
  // LITHIMENT, SHALLOW CINNABAR
  props = {
	seed: 5647267,
	radius: 0.98805,
	octaves: 3,
	persistence: 1,
  	scale: 0.6,
    mag: 0.6,
	colorA: Color.valueOf("#968895ff"),
	colorB: Color.valueOf("#CC392Eff"),
	colorOct: 1,
	colorPersi: 0.5,
	colorScale: 1.59,
	colorThres: 0.6,
  }
  meshList.push(new NoiseMesh(fieros,props.seed-offset,6,props.radius,props.octaves,props.persistence,props.scale,props.mag,props.colorA,props.colorB,props.colorOct,props.colorPersi,props.colorScale,props.colorThres))
  // METACINNABAR, MERCURIC ROCK
  props = {
	seed: 5647267,
	radius: 0.882,
	octaves: 4,
	persistence: 0.4,
  	scale: 0.6,
    mag: 1.66,
	colorA: Color.valueOf("#121212ff"),
	colorB: Color.valueOf("#444444ff"),
	colorOct: 1,
	colorPersi: 0.5,
	colorScale: 8,
	colorThres: 0.55,
  }
  meshList.push(new NoiseMesh(fieros,props.seed-offset,6,props.radius,props.octaves,props.persistence,props.scale,props.mag,props.colorA,props.colorB,props.colorOct,props.colorPersi,props.colorScale,props.colorThres))
  // PESSEGITE
  props = {
	seed: 5647267,
	radius: 0.765,
	octaves: 4,
	persistence: 0.5,
  	scale: 0.6,
    mag: 3.04,
	colorA: Color.valueOf("#f2c66dff"),
	colorB: Color.valueOf("#f2c66dff"),
	colorOct: 1,
	colorPersi: 0.5,
	colorScale: 8,
	colorThres: 0.55,
  }
  meshList.push(new NoiseMesh(fieros,props.seed-offset,6,props.radius,props.octaves,props.persistence,props.scale,props.mag,props.colorA,props.colorB,props.colorOct,props.colorPersi,props.colorScale,props.colorThres))
  
  fieros.mesh = new MultiMesh(meshList)
  meshList = []
})
