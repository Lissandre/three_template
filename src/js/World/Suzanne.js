import { Object3D } from 'three'

export default class Suzanne {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new Object3D()

    this.createSuzanne()
    this.setMovement()
  }
  createSuzanne() {
    this.suzanne = this.models.src.suzanne.scene
    this.container.add(this.suzanne)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.suzanne.rotation.y += 0.005
    })
  }
}
