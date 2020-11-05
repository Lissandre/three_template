import * as THREE from 'three'

export default class Human {
  constructor(options) {
    // Options
    this.time = options.time
    this.models = options.models

    // Set up
    this.container = new THREE.Object3D()

    this.createHuman()
    this.setMovement()
  }
  createHuman() {
    console.log(this.models.models);
    this.human = this.models.models.personnage.scene
    this.human.scale.set(0.01, 0.01, 0.01)
    this.container.add(this.human)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.human.rotation.y += 0.01
    })
  }
}
