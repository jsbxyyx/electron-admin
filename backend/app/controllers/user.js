const get = (ctx) => {
  ctx.status = 200;
  ctx.body = {name:'xxxx'};
};

module.exports = {
  get
};