const ValidatorError = require('./validationError')
const methods = require('./methods')

function Validator (key, val) {
  this.key = key
  this.val = val
  this._stack = []
  this._optional = false
  this._executed = false
}

const Thunk = function (fn, ...args) {
  return function () {
    return fn(...args)
  }
}

Validator.prototype.exec = function () {
  if (!this._executed) {
    this._stack.forEach((fn) => {
      if (this.val === undefined && this._optional) return
      fn()
    })
  }
  return this.val
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
  Validator.prototype[name] = function (...args) {
    this._stack.push(Thunk(fn.bind(this), ...args))
    return this
  }
}

Validator.addMethods = function (pairs) {
  for (let key in pairs) {
    Validator.addMethod(key, pairs[key])
  }
}

Validator.addMethods(methods)

module.exports = exports = Validator
