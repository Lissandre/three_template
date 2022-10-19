import { Object3D } from 'three'
import gsap from 'gsap'

export default class Suzanne {
  constructor(options) {
    // Options
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Suzanne'

    this.createSuzanne()
    gsap.ticker.add((time, deltaTime) => {this.setMovement(time, deltaTime)})
  }
  createSuzanne() {
    this.suzanne = this.assets.models.suzanne.scene
    this.suzanne.children[0].material.map = this.assets.textures.suzanne_texture
    this.container.add(this.suzanne)
  }
  setMovement(time, deltaTime) {
    this.suzanne.rotation.y += 0.001 * deltaTime
  }
}
