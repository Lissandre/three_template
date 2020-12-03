// Steal from https://github.com/brunosimon/folio-2019
import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter {
  constructor() {
    // Get parent methods
    super()

    // Set up
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    this.tick = this.tick.bind(this)
    this.tick()
  }
  // on('tick')
  tick() {
    // Call tick method on each frame
    setTimeout(() => {
      window.requestAnimationFrame(this.tick)
      this.trigger('tick')
    }, 1000 / 60)

    // Get current time
    const current = Date.now()

    // delta
    this.delta = current - this.current
    // elapsed = time between start and now
    this.elapsed = current - this.start
    // current = current time
    this.current = current

    if (this.delta > 60) {
      this.delta = 60
    }
    // Add trigger event
    this.trigger('tick')
  }
  // Cancel animation frame
  stop() {
    window.cancelAnimationFrame(this.ticker)
  }
}
