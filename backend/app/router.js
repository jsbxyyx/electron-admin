const Router = require("koa-router");
const router = new Router();

const user = require('./controllers/user');
const home = require("./controllers/home");
// users
router.get('/users/get', user.get);
// home
router.get('/', home.index);
router.post("/login", home.login);

module.exports = router;