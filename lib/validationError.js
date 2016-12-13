function ValidationError (key, message) {
  this.name = 'ValidationError'
  this.key = key
  this.message = message
}

ValidationError.prototype = Object.create(Error.prototype)
ValidationError.prototype.constructor = Error

module.exports = exports = ValidationError

