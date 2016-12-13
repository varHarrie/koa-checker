const Validator = require('./validator')
const ValidationError = require('./validationError')
const errorMiddleware = require('./errorMiddleware')

let _options = {
  getQuery: (ctx) => ctx.query,
  getParams: (ctx) => ctx.params,
  getBody: (ctx) => ctx.request.body
}

function checkValue (key, value, required, type) {
  const validator = new Validator(type || 'value', key, value)
  return required === true
      ? validator.required()
      : required === false
      ? validator.optional()
      : validator
}

function checkQuery (key, required) {
  return checkValue(key, _options.getQuery(this)[key], required, 'query')
}

function checkParam (key, required) {
  return checkValue(key, _options.getParams(this)[key], required, 'param')
}

function checkBody (key, required) {
  console.log(this.request)
  return checkValue(key, _options.getBody(this)[key], required, 'body')
}

function vals () {
  const _vals = {}
  for (let key in this.validators) {
    const validator = this.validators[key](this)
    _vals[key] = validator.val
  }
  return _vals
}

function checker (arg1, arg2) {
  let validators
  let description
  if (typeof arg1 === 'object') validators = arg1
  else if (typeof arg2 === 'object') validators = arg2
  if (typeof arg1 === 'string') description = arg1
  else if (typeof arg2 === 'string') description = arg2

  return function middleware (ctx, next) {
    middleware['__koa_checker_middleware'] = true

    if (validators !== undefined) ctx.validators = validators
    if (description !== undefined) ctx.description = description

    return next()
  }
}

checker.init = function (options) {
  if (options) Object.assign(_options, options)

  return function (ctx, next) {
    ctx.validators = {}
    ctx.description = ''
    ctx.checkValue = checkValue
    ctx.checkQuery = checkQuery
    ctx.checkParam = checkParam
    ctx.checkBody = checkBody
    ctx.vals = vals
    return next()
  }
}

checker.Validator = Validator
checker.ValidationError = ValidationError
checker.errorMiddleware = errorMiddleware

module.exports = exports = checker
