const Koa = require('koa');
const middlewares = require('./middlewares');

class App extends Koa {
  constructor(options={}) {
    super();

    this.initMiddlewares();
  }

  initMiddlewares() {
    // 使用this.use注册中间件
    this.use(middlewares.init())
    this.use(middlewares.bodyParser());
  }
}

module.exports = App;