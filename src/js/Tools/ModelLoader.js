import EventEmitter from './EventEmitter.js'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

export default class ModelLoader extends EventEmitter {
  constructor() {
    // Get parent methods
    super()

    // Set up
    this.modelsList = []

    // eslint-disable-next-line
    const context = require.context('@models', true, /\.(glb|gltf|fbx)$/)
    context.keys().forEach((key) => {
      const newKey = `${key}`.substring(2)
      // eslint-disable-next-line
      const modelSrc = require('../../models/' + newKey)
      this.modelsList.push({
        name: key.substring(
          2,
          key.length - (key.length - newKey.lastIndexOf('.') - 2)
        ),
        src: modelSrc.default,
      })
    })

    this.remaining = 0
    this.done = 0
    this.src = {}

    this.setLoaders()
    this.startLoad()
  }
  setLoaders() {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    const fbxLoader = new FBXLoader()

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
    ]
  }
  loadModels(models) {
    models.forEach((model) => {
      this.remaining++
      const modelExtension =
        model.src.substring(model.src.lastIndexOf('.') + 1, model.src.length) ||
        model.src
      if (modelExtension) {
        const loader = this.loaders.find(($loader) =>
          $loader.filetype.find(($filetype) => $filetype === modelExtension)
        )
        if (loader) {
          loader.action(model)
        } else {
          console.error(`No loader is set for ${modelExtension}`)
        }
      } else {
        console.error(`${model} is a model ?`)
      }
    })
  }
  loadComplete(model, loaded) {
    this.done++
    this.src[model.name] = loaded
    this.trigger('modelLoad', [model, loaded])
    if (this.remaining === this.done) {
      this.trigger('endModel')
    }
  }
  startLoad() {
    this.loadModels(this.modelsList)
    this.on('endModel', () => {
      this.trigger('modelsReady')
    })
  }
}
