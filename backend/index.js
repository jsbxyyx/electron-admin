const egg = require('egg');

// const workers = Number(require('os').cpus().length);
const workers = 1;
egg.startCluster({
  workers,
  baseDir: __dirname,
  port: 8888
});
