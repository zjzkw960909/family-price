require('babel-core/register');
const server = require('koa-static')
const router = require('./routes')
const Koa = require('koa')
const cors = require('kcors')
const app = new Koa()

app
    .use(server('./dist'))
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('listen in port: 3000')
});
