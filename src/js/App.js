import * as THREE from 'three'
import * as dat from 'dat.gui'

import Sizes from '@tools/Sizes.js'
import Time from '@tools/Time.js'
import Models from '@tools/ModelLoader.js'

import Camera from './Camera.js'
import World from '@world/index.js'

export default class App {
  constructor(options) {
    // Set options
    this.canvas = options.canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.models = new Models()

    this.setConfig()
    this.setRenderer()
    this.setCamera()
    this.setWorld()
  }
  setRenderer() {
    // Set scene
    this.scene = new THREE.Scene()
    // Set renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    })
    // Set background color
    this.renderer.setClearColor(0x212121, 1)
    // Set renderer pixel ratio & sizes
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    // Resize renderer on resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })
    // Set RequestAnimationFrame with 60ips
    this.time.on('tick', () => {
      this.renderer.render(this.scene, this.camera.camera)
    })
  }
  setCamera() {
    // Create camera instance
    this.camera = new Camera({
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug,
    })
    // Add camera to scene
    this.scene.add(this.camera.container)
  }
  setWorld() {
    // Create world instance
    this.world = new World({
      time: this.time,
      debug: this.debug,
      models: this.models,
    })
    // Add world to scene
    this.scene.add(this.world.container)
  }
  setConfig() {
    if (window.location.hash === '#debug') {
      this.debug = new dat.GUI({ width: 420 })
    }
  }
}
