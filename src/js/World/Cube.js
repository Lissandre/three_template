import * as THREE from 'three'

export default class Cube {
  constructor(options) {
    // Options
    this.time = options.time
    this.debug = options.debug

    // Set up
    this.container = new THREE.Object3D()
    this.params = {
      color: 0xfafafa,
    }

    this.createCube()
    this.setMovement()

    if (this.debug) {
      this.setDebug()
    }
  }
  createCube() {
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        color: this.params.color,
        metalness: 0.3,
        roughness: 0.8,
        wireframe: false,
      })
    )
    this.container.add(this.cube)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.cube.rotation.x += 0.03
      this.cube.rotation.y += 0.01
      this.cube.rotation.z += 0.02
    })
  }
  setDebug() {
    this.debugFolder = this.debug.addFolder('Cube')
    this.debugFolder.open()

    this.debugFolder.add(this.cube.material, 'wireframe').name('Wireframe')
    this.debugFolder
      .add(this.cube.material, 'metalness')
      .step(0.05)
      .min(0)
      .max(1)
      .name('Metalness')
    this.debugFolder
      .add(this.cube.material, 'roughness')
      .step(0.05)
      .min(0)
      .max(1)
      .name('Roughness')
    this.debugFolder
      .addColor(this.params, 'color')
      .name('Color')
      .onChange(() => {
        this.cube.material.color = new THREE.Color(this.params.color)
      })
  }
}
