const router = new require('koa-router')()

const price = require('./price.js')

price(router)

module.exports = router
