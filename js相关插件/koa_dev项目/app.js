const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const logger = require('koa-logger')
// 缓存用户信息 start
const session=require('koa-session');
// 缓存用户信息 end
// app.use(require('koa-static')(__dirname + '/public'))
 app.use(require('koa-static')(__dirname + '/public'))
const index = require('./routes/index')
const users = require('./routes/users')
// 解析register form-date数据 start
// var koaBody = require('koa-body')({ multipart: true });
// app.use(koaBody());
// const multer = require('koa-multer');
// app.use(multer());
// 解析register form-date数据 end

// error handler
onerror(app)



// 缓存用户信息 start
app.keys = ['this is my secret and fuck you all'];//我理解为一个加密的钥匙，类似一个token

app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));
// 缓存用户信息 end

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())


app.use(views(__dirname + '/views', {
  map: {html:'ejs'}
}));
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))



// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
