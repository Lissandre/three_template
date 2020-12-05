import EventEmitter from './EventEmitter.js'

import { TextureLoader } from 'three'

export default class TextureLoaderClass extends EventEmitter {
  constructor() {
    // Get parent methods
    super()

    // Set up
    this.loader = new TextureLoader()

    this.texturesList = []
    this.remaining = 0
    this.done = 0
    this.src = {}

    this.setTexturesList()
  }
  setTexturesList() {
    // eslint-disable-next-line
    const context = require.context('@textures', true, /\.(jpg|png|jpeg)$/)
    if (context.keys().length === 0) {
      this.texturesReady = true
    } else {
      context.keys().forEach((key) => {
        const newKey = `${key}`.substring(2)
        // eslint-disable-next-line
        const textureSrc = require('../../textures/' + newKey)
        this.texturesList.push({
          name: key.substring(
            2,
            key.length - (key.length - newKey.lastIndexOf('.') - 2)
          ),
          src: textureSrc.default,
        })
      })
      this.loadTextures(this.texturesList)
    }
  }
  loadTextures(textures) {
    textures.forEach((texture) => {
      this.loader.load(texture.src, (loaded) => {
        this.loadComplete(texture, loaded)
      })
    })
  }
  loadComplete(texture, loaded) {
    this.done++
    this.createNestedObject(this.src, texture.name.split('/'), loaded)
    this.trigger('textureLoad', [texture, loaded])
    if (this.remaining === this.done) {
      this.trigger('texturesReady')
    }
  }
  createNestedObject(base, names, value) {
    let lastName = arguments.length === 3 ? names.pop() : false
    for (let i = 0; i < names.length; i++) {
      base = base[names[i]] = base[names[i]] || {}
    }
    if (lastName) base = base[lastName] = value
    return base
  }
}