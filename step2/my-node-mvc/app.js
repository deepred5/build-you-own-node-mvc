const Koa = require('koa');
const middlewares = require('./middlewares');

class App extends Koa {
  constructor(options={}) {
    super();
    this.options = options;

    this.initMiddlewares();
  }

  initMiddlewares() {
    const { middlewares: businessMiddlewares } = this.options;
    // 使用this.use注册中间件
    this.use(middlewares.init())
    this.use(middlewares.bodyParser());

    // 初始化业务中间件
    businessMiddlewares.forEach(m => {
      if (typeof m === 'function') {
        this.use(m);
      } else {
        throw new Error('中间件必须是函数');
      }
    });
  }
}

module.exports = App;