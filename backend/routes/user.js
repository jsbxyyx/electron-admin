const router = require('koa-router')();
 
router.get('/get', (ctx) => {
  ctx.body = {name:'xxxx'};
})
 
module.exports = router;