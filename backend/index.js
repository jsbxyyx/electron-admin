const path = require('node:path')

const Koa = require("koa");
const parser = require("koa-bodyparser");
const router = require("./app/router");
const serve = require('koa-static')

router.prefix('/api');

const App = new Koa();

App.use(serve(path.join(__dirname, '../public')))
    .use(parser())
    .use(router.routes())
    .use(router.allowedMethods());

function start(callback) {
    const port = 8888;
    App.listen(port, function () {
        console.log(`🚀 Server listening http://127.0.0.1:${port} 🚀`);
        callback()
    });
}

module.exports = { start }

