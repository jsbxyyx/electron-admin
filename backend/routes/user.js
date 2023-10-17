const router = require('koa-router')();
 
router.get('/user', (ctx) => {
  ctx.body = {name:'tanwei'};
})
 
router.get('/userlist', (ctx) => {
  ctx.body = [{name:'tanwei'},{name:'weiwei'}]
})
 
module.exports = router;