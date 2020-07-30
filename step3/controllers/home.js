const { Controller } = require('../my-node-mvc');

class Home extends Controller {
  async index() {
    await this.ctx.render('home');
  }

  async fetchList(ctx, next) {
    const data = await ctx.services.home.getList();
    ctx.body = data;
  }
}

module.exports = Home;