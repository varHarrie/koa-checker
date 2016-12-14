const ValidatorError = require('./validationError')
const methods = require('./methods')

function Validator (type, key, val) {
  this._optional = false
  this._type = type // validator type
  this.type = undefined // value type
  this.key = key
  this.val = val
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

Validator.create = function (type, key, val, required) {
  const validator = new Validator(type, key, val)
  if (required === true) validator.required()
  else if (required === false) validator.optional()
  return validator
}

Validator.addMethod = function (name, fn) {
  Validator.prototype[name] = function () {
    if (this._optional) return this
    else return fn.apply(this, arguments)
  }
}

Validator.addMethods = function (pairs) {
  for (let name in pairs) {
    Validator.addMethod(name, pairs[name])
  }
}

Validator.addMethods(methods)

module.exports = exports = Validator
