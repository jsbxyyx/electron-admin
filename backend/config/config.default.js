const os = require('os');
const TMP_DIR = os.tmpdir();
console.log("TMP_DIR:", TMP_DIR);

exports.keys = "12345678900987654321";

exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    },
};

exports.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'test',
    user: "root",
    password: "root"
};

exports.security = {
    csrf: {
        enable: false,
    },
};

module.exports.middleware = ['errorHandler']
module.exports.errorHandler = {
    match: '/api',
};

// exports.logger = {
//     dir: TMP_DIR + '/logs/electron-admin',
// };