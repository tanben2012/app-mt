import Router from 'koa-router'
import Poi from '../dbs/models/poi'
// import axios from './utils/axios'
// import sign from './utils/sign'

const router = new Router({ prefix: '/search' })

router.get('/top', async (ctx) => {
  try {
    const top = await Poi.find({
      name: new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map((item) => {
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
  // const {
  //   status, data: {
  //     top
  //   }
  // } = await axios.get('http://cp-tools.cn/search/top', {
  //   params: {
  //     input: ctx.query.input,
  //     city: ctx.query.city,
  //     sign
  //   }
  // })
  // ctx.body = {
  //   top: status === 200
  //     ? top
  //     : []
  // }
})

router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  try {
    const result = await Poi.find({
      city,
      type: ctx.query.type || '丽人'
    }).limit(10)

    ctx.body = {
      code: 0,
      result: result.map((item) => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
  // const city = ctx.store
  //   ? ctx.store.geo.position.city
  //   : ctx.query.city
  // const {
  //   status, data: {
  //     result
  //   }
  // } = await axios.get('http://cp-tools.cn/search/hotPlace', {
  //   params: {
  //     sign,
  //     city
  //   }
  // })
  // ctx.body = {
  //   result: status === 200
  //     ? result
  //     : []
  // }
})

router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query
  try {
    const result = await Poi.find({
      city,
      name: keyword
    }).limit(10)

    ctx.body = {
      code: 200,
      count: result.length,
      pois: result
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
  // const { city, keyword } = ctx.query
  // const {
  //   status,
  //   data: {
  //     count,
  //     pois
  //   }
  // } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
  //   params: {
  //     city,
  //     keyword,
  //     sign
  //   }
  // })
  // ctx.body = {
  //   count: status === 200 ? count : 0,
  //   pois: status === 200
  //     ? pois
  //     : []
  // }
})

router.get('/products', async (ctx) => {
  const { city, keyword } = ctx.query
  try {
    const product = await Poi.find({
      city,
      name: keyword
    }).limit(10)

    ctx.body = {
      code: 200,
      product,
      more: ctx.isAuthenticated() ? [] : [],
      login: ctx.isAuthenticated()
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      product: {},
      more: ctx.isAuthenticated() ? [] : [],
      login: ctx.isAuthenticated()
    }
  }

  // const keyword = ctx.query.keyword || '旅游'
  // const city = ctx.query.city || '北京'
  // const {
  //   status,
  //   data: {
  //     product,
  //     more
  //   }
  // } = await axios.get('http://cp-tools.cn/search/products', {
  //   params: {
  //     keyword,
  //     city,
  //     sign
  //   }
  // })
  // if (status === 200) {
  //   ctx.body = {
  //     product,
  //     more: ctx.isAuthenticated() ? more : [],
  //     login: ctx.isAuthenticated()
  //   }
  // } else {
  //   ctx.body = {
  //     product: {},
  //     more: ctx.isAuthenticated() ? more : [],
  //     login: ctx.isAuthenticated()
  //   }
  // }
})

export default router
