// built-in methods
module.exports = exports = {
  'optional' (tip) {
    this._optional = true
  },
  'defaultTo' (defaultValue) {
    if (this.val === undefined) this.val = defaultValue
  },
  'required' (tip) {
    this.throwIf(this.val === undefined, tip || this.key + ' is required')
  },
  'eq' (otherVal, tip) {
    this.throwIfNot(this.val === otherVal || this.key + ' must be equal to ' + otherVal)
  },
  'neq' (otherVal, tip) {
    this.throwIf(this.val === otherVal, tip || this.key + ' must be not equal to ' + otherVal)
  },
  'isString' (tip) {
    this.throwIfNot(typeof this.val === 'string', tip || this.key + ' must be a string')
  },
  'isArray' (tip) {
    this.throwIfNot(this.val instanceof Array, tip || this.key + ' must be an array')
  },
  'isObject' (tip) {
    this.throwIfNot(typeof this.val === 'object', tip || this.key + ' must be an object')
  },
  'trim' () {
    this.val = this.val.trim()
  }
}
