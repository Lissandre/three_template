import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter {
  constructor() {
    // Get parent methods
    super()
    // Create div values to get viewport values
    this.viewport = {}
    this.sizeViewport = document.createElement('div')
    this.sizeViewport.style.width = '100vw'
    this.sizeViewport.style.height = '100vh'
    this.sizeViewport.style.position = 'absolute'
    this.sizeViewport.style.top = 0
    this.sizeViewport.style.left = 0
    this.sizeViewport.style.pointerEvents = 'none'
    // Resize event
    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)
    this.resize()
  }
  // on('resize')
  resize() {
    // Add div to get viewport exact values on every screens
    document.body.appendChild(this.sizeViewport)
    this.viewport.width = this.sizeViewport.offsetWidth
    this.viewport.height = this.sizeViewport.offsetHeight
    document.body.removeChild(this.sizeViewport)
    // Get viewport width & height
    this.width = window.innerWidth
    this.height = window.innerHeight
    // Add trigger event
    this.trigger('resize')
  }
}
