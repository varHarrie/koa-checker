const Validator = require('./validator')
const ValidationError = require('./validationError')
const errorMiddleware = require('./errorMiddleware')

let _options = {
  getQuery: (ctx) => ctx.query,
  getParams: (ctx) => ctx.params,
  getBody: (ctx) => ctx.request.body
}

function checkValue (val, required) {
  return Validator.create('value', null, val, required)
}

function checkQuery (key, required) {
  return Validator.create('query', key, _options.getQuery(this)[key], required)
}

function checkParam (key, required) {
  return Validator.create('param', key, _options.getParams(this)[key], required)
}

function checkBody (key, required) {
  return Validator.create('body', key, _options.getBody(this)[key], required)
}

function checker (arg1, arg2) {
  let handlers
  let description
  if (typeof arg1 === 'object') handlers = arg1
  else if (typeof arg1 === 'object') handlers = arg2
  if (typeof arg1 === 'string') description = arg1
  else if (typeof arg2 === 'string') description = arg2

  return function middleware (ctx, next) {
    middleware['__koa_checker_middleware__'] = true
    middleware['__koa_checker_description__'] = description
    const validators = middleware['__koa_checker_validators__'] = {}
    const vals = ctx.vals = {}

    if (handlers !== undefined) {
      for (let key in handlers) {
        const validator = handlers[key](ctx)
        validators[key] = validator
        vals[key] = validator.val
      }
    }

    return next()
  }
}

checker.init = function (options) {
  if (options) Object.assign(_options, options)

  return function (ctx, next) {
    ctx.checkValue = checkValue
    ctx.checkQuery = checkQuery
    ctx.checkParam = checkParam
    ctx.checkBody = checkBody
    return next()
  }
}

checker.Validator = Validator
checker.ValidationError = ValidationError
checker.errorMiddleware = errorMiddleware

module.exports = exports = checker
