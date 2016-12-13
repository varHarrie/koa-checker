const ValidationError = require('./validationError')

module.exports = function errorMiddleware (handler) {
  return function (ctx, next) {
    return next().catch((err) => {
      if (err instanceof ValidationError && typeof handler === 'function') {
        handler(err, ctx)
      } else throw err
    })
  }
}
