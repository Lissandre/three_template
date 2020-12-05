import { Object3D } from 'three'

import AmbientLightSource from './AmbientLight.js'
import PointLightSource from './PointLight.js'
import Suzanne from './Suzanne.js'

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.models = options.models

    // Set up
    this.container = new Object3D()

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('World')
      this.debugFolder.open()
    }

    this.getLoaders()
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
        this.setAmbientLight()
        this.setPointLight()
        this.setSuzanne()
        setTimeout(() => {
          this.loadDiv.remove()
        }, 320)
      })
    }
  }
  setAmbientLight() {
    this.light = new AmbientLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setPointLight() {
    this.light = new PointLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setSuzanne() {
    this.suzanne = new Suzanne({
      time: this.time,
      models: this.models.src,
    })
    this.container.add(this.suzanne.container)
  }
}
