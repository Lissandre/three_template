import { Object3D } from 'three'

import AmbientLightSource from './AmbientLight.js'
import PointLightSource from './PointLight.js'
import Suzanne from './Suzanne.js'

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets

    // Set up
    this.container = new Object3D()

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('World')
      this.debugFolder.open()
    }

    this.setLoader()
  }
  init() {
    this.setAmbientLight()
    this.setPointLight()
    this.setSuzanne()
  }
  setLoader() {
    this.loadDiv = document.createElement('div')
    this.loadDiv.classList.add('loadScreen')
    document.body.append(this.loadDiv)

    this.loadModels = document.createElement('h1')
    this.loadModels.innerHTML = 'Loading'
    this.loadModels.classList.add('load')
    this.loadDiv.append(this.loadModels)

    this.enter = document.createElement('button')
    this.enter.innerHTML = '...'
    this.enter.classList.add('start')
    this.loadDiv.append(this.enter)

    this.assets.on('ressourcesReady', () => {
      this.loadModels.innerHTML = 'OK'
      this.enter.innerHTML = 'Start'

      this.enter.addEventListener('click', () => {
        this.init()
        this.loadDiv.style.opacity = 0
        setTimeout(() => {
          this.loadDiv.remove()
        }, 320)
      })
    })
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
      assets: this.assets,
    })
    this.container.add(this.suzanne.container)
  }
}
