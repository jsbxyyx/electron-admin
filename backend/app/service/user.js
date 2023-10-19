const Service = require('egg').Service;

class UserService extends Service {
  async list(page) {
    return [{
      id: 1,
      username: 'xx',
      name: 'xx',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
  }
}

module.exports = UserService;