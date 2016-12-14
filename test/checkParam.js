const request = require('supertest')
const Router = require('koa-router')

const checker = require('../lib')
const app = require('./app')

const router = new Router()

router.get('/checkParam/:userid', checker({
  userid: (ctx) => ctx.checkParam('userid', true)
}), function (ctx, next) {
  const {userid} = ctx.vals
  ctx.body = {success: true, userid}
})

app.use(router.routes())
app.use(router.allowedMethods())

describe('checkParam', function (done) {
  it('respond 200', function (done) {
    request(app.listen())
      .get('/checkParam/123')
      .expect(Object.assign({success: true, userid: 123}), done)
  })
})
