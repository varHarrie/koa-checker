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
  const {username, age, hobby} = ctx.vals()
  ctx.body = {username, age, hobby}
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
      .expect(data, done)
  })
})

describe('checkQuery Error', function (done) {
  it('respond 500', function (done) {
    request(app.listen())
      .get('/checkQuery')
      .expect(500, {
        success: false,
        msg: 'sortBy is required'
      }, done)
  })
})
