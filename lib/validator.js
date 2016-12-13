const ValidatorError = require('./validationError')
const methods = require('./methods')

function Validator (type, key, val) {
  this.key = key
  this.val = val
  this.type = undefined // value type
  this._type = type // validator type
  this._optional = false
}

Validator.prototype.throw = function (tip) {
  throw new ValidatorError(this.key, tip)
}

Validator.prototype.throwIf = function (boolVal, tip) {
  if (boolVal) this.throw(tip)
}

Validator.prototype.throwIfNot = function (boolVal, tip) {
  if (!boolVal) this.throw(tip)
}

Validator.addMethod = function (name, fn) {
  Validator.prototype[name] = function () {
    if (this._optional) return this
    else return fn.apply(this, arguments)
  }
}

Validator.addMethods = function (pairs) {
  for (let key in pairs) {
    Validator.addMethod(key, pairs[key])
  }
}

Validator.addMethods(methods)

module.exports = exports = Validator
