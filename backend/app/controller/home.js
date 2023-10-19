const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hello electron-admin';
  }

  async login() {
    const { name, password } = this.ctx.request.body;
    const query = {
      where: {
        username: name
      }
    };
    const u = await this.ctx.model.User.findOne(query);
    console.log("u:", u)
    if (u == null || u.password != password) {
      this.ctx.body = {
        code: 400,
        message: "用户名密码错误"
      };
      return;
    }
    this.ctx.body = {
      code: 200,
      message: "ok",
      data: {
        name: u.name
      }
    };
  }
}

module.exports = HomeController;