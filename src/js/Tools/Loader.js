import EventEmitter from './EventEmitter.js'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

import { TextureLoader } from 'three'

export default class Loader extends EventEmitter {
  constructor() {
    // Get parent methods
    super()

    // Set up
    this.ressourcesList = []
    this.total = 0
    this.done = 0
    this.models = {}
    this.textures = {}

    this.setLoaders()
    this.setRessourcesList()
  }
  setRessourcesList() {
    // eslint-disable-next-line
    const modelsContext = require.context('@models', true, /\.(glb|gltf|fbx)$/)
    modelsContext.keys().forEach((key) => {
      const newKey = `${key}`.substring(2)
      // eslint-disable-next-line
      const modelSrc = require('../../models/' + newKey)
      this.ressourcesList.push({
        name: key.substring(
          2,
          key.length - (key.length - newKey.lastIndexOf('.') - 2)
        ),
        src: modelSrc.default,
        type: 'model',
      })
    })
    // eslint-disable-next-line
    const texturesContext = require.context('@textures', true, /\.(png|jpeg|jpg)$/)
    texturesContext.keys().forEach((key) => {
      const newKey = `${key}`.substring(2)
      // eslint-disable-next-line
      const textureSrc = require('../../textures/' + newKey)
      this.ressourcesList.push({
        name: key.substring(
          2,
          key.length - (key.length - newKey.lastIndexOf('.') - 2)
        ),
        src: textureSrc.default,
        type: 'texture',
      })
    })
    this.loadRessources(this.ressourcesList)
  }
  setLoaders() {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    const fbxLoader = new FBXLoader()

    const textureLoader = new TextureLoader()

    this.loaders = [
      {
        filetype: ['gltf', 'glb'],
        action: (model) => {
          gltfLoader.load(model.src, (loaded) => {
            this.loadComplete(model, loaded)
          })
        },
      },
      {
        filetype: ['fbx'],
        action: (model) => {
          fbxLoader.load(model.src, (loaded) => {
            this.loadComplete(model, loaded)
          })
        },
      },
      {
        filetype: ['png', 'jpg', 'jpeg'],
        action: (texture) => {
          textureLoader.load(texture.src, (loaded) => {
            this.loadComplete(texture, loaded)
          })
        },
      },
    ]
  }
  loadRessources(ressources) {
    ressources.forEach((ressource) => {
      this.total++
      const ressourceExtension =
        ressource.src.substring(
          ressource.src.lastIndexOf('.') + 1,
          ressource.src.length
        ) || ressource.src
      if (ressourceExtension) {
        const loader = this.loaders.find(($loader) =>
          $loader.filetype.find(($filetype) => $filetype === ressourceExtension)
        )
        if (loader) {
          loader.action(ressource)
        } else {
          console.error(`No loader is set for ${ressourceExtension}`)
        }
      } else {
        console.error(`${ressource} is a valid ressource ?`)
      }
    })
  }
  loadComplete(ressource, loaded) {
    this.done++
    this.createNestedObject(
      this[`${ressource.type}s`],
      ressource.name.split('/'),
      loaded
    )
    this.trigger('ressourceLoad', [ressource, loaded])
    if (this.total === this.done) {
      this.trigger('ressourcesReady')
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
