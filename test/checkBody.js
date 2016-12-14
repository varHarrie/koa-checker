const request = require('supertest')
const Router = require('koa-router')

const checker = require('../lib')
const app = require('./app')

const router = new Router()

router.get('/checkBody', checker({
  username: (ctx) => ctx.checkBody('username', true).is('string'),
  age: (ctx) => ctx.checkBody('age', true).is('number'),
  hobby: (ctx) => ctx.checkBody('hobby', true).is('array')
}), function (ctx, next) {
  const data = ctx.vals
  ctx.body = {success: true, data}
})

app.use(router.routes())
app.use(router.allowedMethods())

describe('checkBody', function (done) {
  it('respond 200', function (done) {
    const data = {
      username: 'harrie',
      age: 8,
      hobby: ['painting']
    }
    request(app.listen())
      .get('/checkBody')
      .send(data)
      .expect(Object.assign({success: true, data}), done)
  })

  it('respond 500', function (done) {
    request(app.listen())
      .get('/checkBody')
      .expect(500, {
        success: false,
        msg: 'username is required'
      }, done)
  })
})
