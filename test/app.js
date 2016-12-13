const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const checker = require('../lib')

const app = new Koa()
app.use(bodyparser())
app.use(checker.init())
app.use(checker.errorMiddleware(function (err, ctx) {
  ctx.status = 500
  ctx.body = {success: false, msg: err.message}
}))

module.exports = app
