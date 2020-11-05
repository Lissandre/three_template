import * as THREE from 'three'

import AmbientLight from './AmbientLight.js'
import PointLight from './PointLight.js'
import Cube from './Cube.js'

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('World')
      this.debugFolder.open()
    }

    this.getLoaders()
    this.setAmbientLight()
    this.setPointLight()
    this.setCube()
  }
  getLoaders() {
    if (this.models.modelsList.length != 0) {
      this.loadDiv = document.createElement('div')
      this.loadDiv.classList.add('loadScreen')
      document.body.append(this.loadDiv)

      this.loadTitle = document.createElement('h1')
      this.loadTitle.innerHTML = 'Loading models...'
      this.loadTitle.classList.add('loadModels')
      this.loadDiv.append(this.loadTitle)

      this.models.on('modelsReady', () => {
        this.loadDiv.style.opacity = 0
        setTimeout(() => {
          this.loadDiv.remove()
        }, 320)
      })
    }
  }
  setAmbientLight() {
    this.light = new AmbientLight({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setPointLight() {
    this.light = new PointLight({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setCube() {
    this.cube = new Cube({
      time: this.time,
      debug: this.debugFolder,
    })
    this.container.add(this.cube.container)
  }
}
