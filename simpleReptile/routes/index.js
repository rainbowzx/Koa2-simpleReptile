const router = require('koa-router')();
const controller = require('../controller/index');

router.get('/', controller.getDetail)

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// router.get('/spider', controller.getDetail);
module.exports = router
