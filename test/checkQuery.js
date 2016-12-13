const request = require('supertest')
const Router = require('koa-router')

const checker = require('../lib')
const app = require('./app')

const router = new Router()

router.get('/checkQuery', checker({
  sortBy: (ctx) => ctx.checkQuery('sortBy').required(),
  skip: (ctx) => ctx.checkQuery('skip').defaultTo(0),
  limit: (ctx) => ctx.checkQuery('limit').defaultTo(10)
}), function (ctx, next) {
  const {sortBy, skip, limit} = ctx.vals()
  ctx.body = {success: true, sortBy, skip, limit}
})

app.use(router.routes())
app.use(router.allowedMethods())

describe('checkQuery', function (done) {
  it('respond 200', function (done) {
    request(app.listen())
      .get('/checkQuery')
      .query({sortBy: 'date'})
      .expect(200, {
        success: true,
        sortBy: 'date',
        skip: 0,
        limit: 10
      }, done)
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
