// built-in methods
module.exports = exports = {
  'is' (type, tip) {
    this.type = type
    switch (type) {
      case 'string':
      case 'object':
      case 'number':
        this.throwIfNot(typeof this.val === type, tip || this.key + ' must be an ' + type)
        break
      case 'array':
        this.throwIfNot(this.val instanceof Array, tip || this.key + ' must be an array')
        break
      case 'date':
        this.throwIfNot(this.val instanceof Date, tip || this.key + ' must be a Date object')
        break
      default:
        throw new Error('Not support for type:' + type)
    }
    return this
  },
  'optional' () {
    this._optional = true
    return this
  },
  'defaultTo' (defaultVal) {
    if (this.val === undefined) this.val = defaultVal
    return this
  },
  'required' (tip) {
    this.throwIf(this.val === undefined, tip || this.key + ' is required')
    return this
  },
  'eq' (otherVal, tip) {
    this.throwIfNot(this.val === otherVal || this.key + ' must be equal to ' + otherVal)
    return this
  },
  'neq' (otherVal, tip) {
    this.throwIf(this.val === otherVal, tip || this.key + ' must be not equal to ' + otherVal)
    return this
  },
  'trim' () {
    this.val = this.val.trim()
    return this
  },
  'in' (array, tip) {
    this.throwIf(array.indexOf(this.val) === -1, tip || 'the value of ' + this.key + ' is not supported')
    return this
  },
  'toNumber' (defaultVal) {
    try {
      this.val = Number(this.val)
    } catch (error) {
      if (defaultVal === undefined) this.throw(error.message)
      else this.val = defaultVal
    }
    return this
  },
  'toString' () {
    this.val = this.val.toString()
    return this
  }
}
