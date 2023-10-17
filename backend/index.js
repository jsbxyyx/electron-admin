const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');

const user = require('./routes/user.js')

const PORT = 8888;

const app = new Koa();
const router = new Router();
router.prefix('/api')

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods());

router.get('/', async function (ctx) {
    ctx.body = 'hello electron';
})

router.post("/login", async function(ctx){
    const reqBody = ctx.request.body;
    console.log("reqBody", reqBody)
    const name = reqBody.name
    const password = reqBody.password
    ctx.body = {code: 200, data: {name: "admin"}};
})

router.use('/users', user.routes());

app.listen(PORT, function () {
    console.log(`server listening on http://127.0.0.1:${PORT}`);
});

