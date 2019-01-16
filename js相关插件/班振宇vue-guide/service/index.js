var Koa = require('koa');
var Router = require('koa-router');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const fs = require('fs');
var cartList = { code: 0, data: [] };
var goodsList = JSON.parse(fs.readFileSync(__dirname + "/goods.list.json"));
var app = new Koa();
app.use(koaBody());
app.use(koaStatic('.'));
var router = new Router();


app.use(async (ctx, next) => {
    if (ctx.method == 'OPTIONS') {
        ctx.set('Content-Type', 'text/plain charset=UTF-8');
        ctx.set('Content-Length', 0);
        ctx.set('Access-Control-Max-Age', 1728000);
        ctx.status = 204;
    }
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    ctx.set('Access-Control-Allow-Headers', 'brand,token,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
    await next();
})

//用户账号
const users = {
    admin: { id: 1, password: 'admin', sex: 1, birthday: '2010-09-23', nickname: '超级管理员', avatar: 'http://127.0.0.1:9001/static/admin.jpg' },
    zhangsan: { id: 2, password: 'zhangsan', sex: 1, birthday: '2008-08-10', nickname: '张三', avatar: 'http://127.0.0.1:9001/static/zhangsan.jpg' },
    lisi: { id: 3, password: 'lisi', sex: 0, birthday: '2000-01-21', nickname: '李四', avatar: 'http://127.0.0.1:9001/static/lisi.jpg' },
}
//tks
const tokens = [];
router
    .get('/', (ctx) => {
        ctx.body = 'Hello World!';
    })
    .post('/login', (ctx) => {
        let { username, password } = ctx.request.body;
        if (username in users && users[username].password === password) {
            let token = Math.random().toString(36).substr(2).toUpperCase();
            tokens.push(token);
            //测试只返回id和token，让业务相对复杂些
            ctx.body = {
                code: 0, msg: '登录成功', data: {
                    id: users[username].id,
                    token: token
                }
            };
        } else {
            ctx.body = { code: 1, msg: '用户名或密码错误' };
        }

    })
    .delete('/logout', (ctx) => {
        let { token } = ctx.headers;
        tokens.pop(token);
        ctx.body = { code: 0, msg: '注销成功', token: token };
    })
    .get('/users/:id', (ctx) => {
        let { id } = ctx.params;
        let info = null;
        for (let user in users) {
            let u = users[user];
            if (u.id == id) {
                info = u;
            }
        }
        ctx.body = { code: 0, msg: 'ok', data: info };
    })
    .get('/goods/list', async function (ctx) {
        ctx.body = goodsList;
    })
    .get('/cart/list', async function (ctx) {
        ctx.body = cartList;
    })
    .put('/cart/add', async function (ctx) {
        let goods = ctx.request.body;
        let flag = false
        for (let item of cartList.data) {
            if (item.gsColorCode === goods.gsColorCode) {
                flag = true;
                break;
            }
        }
        if (flag) {
            ctx.body = { code: 0, msg: '已添加' };
        } else {
            goods.id = Date.now(); //模拟生成购物车条目的id
            cartList.data.push(goods)
            ctx.body = { code: 0, msg: '添加成功' };
        }

    })
    .get('/cart/:id', (ctx) => {
        let { id } = ctx.params;
        ctx.body = {
            code: 0,
            data: cartList.data.find((cart) => cart.gsColorCode == id)
        }
    })
    .del('/cart/:id', (ctx) => {
        let { id } = ctx.params;
        cartList.data = cartList.data.filter(cart => cart.id != id);
        ctx.body = {
            code: 0,
            msg: '删除成功'
        };
    })
    .get('/test/401', (ctx) => {
        ctx.status = 401;
        ctx.body = {
            code: 1,
            msg: '登录状态失效,请重新登录'
        }
    })
    .get('/test/500', (ctx) => {
        ctx.status = 500;
        ctx.body = "服务器内部错误"
    })
    .get('/test/203', (ctx) => {
        ctx.status = 203;
        ctx.body = {
            code: 1,
            msg: '已支付请勿重复支付'
        };
    });
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(9001);