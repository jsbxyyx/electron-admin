const egg = require('egg');

// const workers = Number(require('os').cpus().length);
const baseDir = __dirname;
console.log("baseDir:", baseDir);
const workers = 1;
egg.startCluster({
  workers,
  baseDir: baseDir,
  port: 8888
});
