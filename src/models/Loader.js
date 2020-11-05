/**
 * DON'T TOUCH THIS PART
 */
import ModelLoader from '@tools/ModelLoader.js'
import EventEmitter from '@tools/EventEmitter.js'
import modelsList from './ModelsSrc.js'

export default class Models extends EventEmitter {
  constructor() {
    super()

    this.modelsList = modelsList
    this.modelLoader = new ModelLoader()
    this.models = {}
    this.modelLoader.loadModels(this.modelsList)
    this.modelLoader.on('modelLoad', (model, loaded) => {
      this.models[model.name] = loaded
    })
    this.modelLoader.on('endModel', () => {
      this.trigger('modelsReady')
    })
  }
}