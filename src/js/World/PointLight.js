import { Object3D, PointLight, Color } from 'three'

export default class PointLightSource {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Point Light'
    this.params = {
      color: 0xffffff,
      positionX: 0,
      positionY: 2,
      positionZ: 5,
    }

    this.createPointLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createPointLight() {
    this.light = new PointLight(this.params.color)
    this.light.castShadow = true
    this.light.position.set(
      this.params.positionX,
      this.params.positionY,
      this.params.positionZ
    )
    this.container.add(this.light)
  }
  setDebug() {
    // Color debug
    this.debugFolder = this.debug.addFolder({
      title: 'Point Light',
      expanded: true
    })
    this.debugFolder
      .addInput(this.params, 'color')
      .on('change', () => {
        this.light.color = new Color(this.params.color)
      })
    //Position debug
    this.debugFolder
      .addInput(this.light.position, 'x', {
        min: -5,
        max: 5,
        step: 0.1
      })
    this.debugFolder
      .addInput(this.light.position, 'y', {
        min: -5,
        max: 5,
        step: 0.1
      })
    this.debugFolder
      .addInput(this.light.position, 'z', {
        min: -5,
        max: 5,
        step: 0.1
      })
  }
}
