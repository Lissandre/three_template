import { AxesHelper, Object3D } from 'three'

import PointLightSource from './PointLight'
import Suzanne from './Suzanne'

export default class World {
  constructor(options) {
    // Set options
    this.debug = options.debug
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'World'

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder({
        title: 'World',
        expanded: false
      })
    }

    this.setLoader()
  }
  init() {
    this.setPointLight()
    this.setSuzanne()
  }
  setLoader() {
    this.assets.on('ressourcesReady', () => {
      this.init()
    })
  }
  setPointLight() {
    this.light = new PointLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setSuzanne() {
    this.suzanne = new Suzanne({
      assets: this.assets,
    })
    this.container.add(this.suzanne.container)
  }
}
