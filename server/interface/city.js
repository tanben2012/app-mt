import Router from 'koa-router'

const router = new Router({
  prefix: '/city'
})

router.get('/list', async (ctx) => {
  ctx.body = await {
    list: ['北京', '上海1']
  }
})

export default router
