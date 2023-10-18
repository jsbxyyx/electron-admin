const Controller = require('egg').Controller;

class UserController extends Controller {
    async list() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const dataList = await ctx.service.user.list(page);
        this.ctx.body = {
            code: 200,
            data: dataList
        };
    }
}

module.exports = UserController;
