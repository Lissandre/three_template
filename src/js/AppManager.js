import { Scene, sRGBEncoding, WebGLRenderer } from 'three'
import gsap from 'gsap'
import { Pane } from 'tweakpane'

import CameraManager from './CameraManager'
import World from '@world/index'

export default class AppManager {
  constructor(options) {
    this.time = options.time
    this.assets = options.assets
  }
  // GETTERS
  get SCENE() {
    return this._scene
  }
  get RENDERER() {
    return this._renderer
  }
  get CAMERA_MANAGER() {
    return this._cameraManager
  }
  get WORLD() {
    return this._world
  }
  // PUBLIC
  setup(canvas = document.querySelector('#_canvas')) {
    this.canvas = canvas
    this._debug = this._setConfig()
    this._scene = this._setScene()
    this._renderer = this._setRenderer()
    this._cameraManager = this._setCamera()
    this._world = this._setWorld()
    this._setTicker()
    this._setEvents()
  }
  update() {
    this._renderer.render(this._scene, this._cameraManager.CAMERA)
  }
  // PRIVATE
  _setScene() {
    const scene = new Scene()
    return scene
  }
  _setRenderer() {
    const renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.outputEncoding = sRGBEncoding
    renderer.gammaFactor = 2.2
    renderer.setClearColor(0x000000, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    return renderer
  }
  _setCamera() {
    const cameraManager = new CameraManager({debug: this._debug})
    cameraManager.setup()
    this._scene.add(cameraManager.CAMERA)
    return cameraManager
  }
  _setWorld() {
    // Create world instance
    const world = new World({
      debug: this._debug,
      assets: this.assets,
    })
    this._scene.add(world.container)
    return world
  }
  _setConfig() {
    if (window.location.hash === '#debug') {
      const debug = new Pane({
        title: 'DEBUG',
        expanded: false,
      })
      return debug
    }
    return false
  }
  _setTicker() {
    gsap.ticker.fps(60)
    gsap.ticker.add(() => {this.update()})
  }
  _setEvents() {
    window.addEventListener('resize', () => {
      this._cameraManager.setSizes()
      this._renderer.setSize(
        window.innerWidth,
        window.innerHeight
      )
    }, false)
  }
}
