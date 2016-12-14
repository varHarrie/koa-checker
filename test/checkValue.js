const request = require('supertest')
const Router = require('koa-router')

// const checker = require('../lib')
const app = require('./app')

const router = new Router()

router.get('/checkValue', function (ctx, next) {
  const test = ctx.checkValue('    test    ', true).is('string').trim().val
  ctx.body = {success: true, test}
})

app.use(router.routes())
app.use(router.allowedMethods())

describe('checkValue', function (done) {
  it('respond 200', function (done) {
    request(app.listen())
      .get('/checkValue')
      .expect(Object.assign({success: true, test: 'test'}), done)
  })
})
