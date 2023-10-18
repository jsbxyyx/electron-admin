const Service = require('egg').Service;

class UserService extends Service {
  async list(page = 1) {
    return []
  }
}

module.exports = UserService;