export default class {
  constructor() {
    this.callbacks = {}
    this.callbacks.base = {}
  }
  // event.on()
  on(_names, callback) {
    // Scope
    const _this = this
    // Name error
    if (typeof _names === 'undefined' || _names === '') {
      console.error('[on] wrong event names')
      return false
    }
    // Callback error
    if (typeof callback === 'undefined') {
      console.error('[on] wrong event callback')
      return false
    }
    // Resolve names
    const names = this.resolveNames(_names)
    // Each name
    names.forEach(function (_name) {
      // Resolve name
      const name = _this.resolveName(_name)
      // Create namespace if not exist
      if (!(_this.callbacks[name.namespace] instanceof Object)) {
        _this.callbacks[name.namespace] = {}
      }
      // Create callback if not exist
      if (!(_this.callbacks[name.namespace][name.value] instanceof Array)) {
        _this.callbacks[name.namespace][name.value] = []
      }
      // Add callback
      _this.callbacks[name.namespace][name.value].push(callback)
    })
    return this
  }
  // event.off()
  off(_names) {
    // Scope
    const _this = this
    // Name error
    if (typeof _names === 'undefined' || _names === '') {
      console.error('[off] wrong event name')
      return false
    }
    // Resolve names
    const names = this.resolveNames(_names)
    // Each name
    names.forEach(function (_name) {
      // Resolve name
      const name = _this.resolveName(_name)
      // Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete _this.callbacks[name.namespace]
      }
      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in _this.callbacks) {
            if (
              _this.callbacks[namespace] instanceof Object &&
              _this.callbacks[namespace][name.value] instanceof Array
            ) {
              delete _this.callbacks[namespace][name.value]
              // Remove namespace if empty
              if (Object.keys(_this.callbacks[namespace]).length === 0) {
                delete _this.callbacks[namespace]
              }
            }
          }
        }
        // Specified namespace
        else if (
          _this.callbacks[name.namespace] instanceof Object &&
          _this.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete _this.callbacks[name.namespace][name.value]
          // Remove namespace if empty
          if (Object.keys(_this.callbacks[name.namespace]).length === 0) {
            delete _this.callbacks[name.namespace]
          }
        }
      }
    })
    return this
  }
  // event.trigger()
  trigger(_name, _args) {
    // Scope
    const _this = this
    // Errors
    if (typeof _name === 'undefined' || _name === '') {
      console.error('[trigger] wrong event name')
      return false
    }
    let finalResult = null
    let result = null
    // Default args
    const args = !(_args instanceof Array) ? [] : _args
    // Resolve names (should on have one event)
    let name = this.resolveNames(_name)
    // Resolve name
    name = this.resolveName(name[0])
    // Default namespace
    if (name.namespace === 'base') {
      // Try to find callback in each namespace
      for (const namespace in _this.callbacks) {
        if (
          _this.callbacks[namespace] instanceof Object &&
          _this.callbacks[namespace][name.value] instanceof Array
        ) {
          _this.callbacks[namespace][name.value].forEach(function (callback) {
            result = callback.apply(_this, args)
            if (typeof finalResult === 'undefined') {
              finalResult = result
            }
          })
        }
      }
    }
    // Specified namespace
    else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === '') {
        console.error('[trigger] wrong event name')
        return this
      }
      _this.callbacks[name.namespace][name.value].forEach(function (callback) {
        result = callback.apply(_this, args)
        if (typeof finalResult === 'undefined') {
          finalResult = result
        }
      })
    }
    return finalResult
  }
  // Resolve events / callbacks names
  resolveNames(_names) {
    let names = _names
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '')
    names = names.replace(/[,/]+/g, ' ')
    names = names.split(' ')
    return names
  }
  //Resolve event / callback name
  resolveName(name) {
    const newName = {}
    const parts = name.split('.')
    newName.original = name
    newName.value = parts[0]
    newName.namespace = 'base' // Base namespace
    // Specified namespace
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1]
    }
    return newName
  }
}
