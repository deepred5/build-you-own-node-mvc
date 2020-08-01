const Koa = require('koa');
const path = require('path');
const middlewares = require('./middlewares');
const ControllerLoader = require('./loader/controller');
const ServiceLoader = require('./loader/service');

class App extends Koa {
  constructor(options = {}) {
    super();
    this.options = options;

    const { projectRoot = process.cwd(), rootControllerPath, rootServicePath, rootViewPath } = options;
    this.rootControllerPath = rootControllerPath || path.join(projectRoot, 'controllers');
    this.rootServicePath = rootServicePath || path.join(projectRoot, 'services');
    this.rootViewPath = rootViewPath || path.join(projectRoot, 'views');

    this.initController();
    this.initService();
    this.initMiddlewares();
  }

  initController() {
    this.controllerLoader = new ControllerLoader(this.rootControllerPath);
  }

  initService() {
    this.serviceLoader = new ServiceLoader(this.rootServicePath);
  }

  createContext(req, res) {
    const context = super.createContext(req, res);
    // 注入全局方法
    this.injectUtil(context);

    // 注入Services
    this.injectService(context);

    return context
  }

  injectUtil(context) {
    context.sayHello = () => {
      console.log('hello');
    }
  }

  injectService(context) {
    const serviceLoader = this.serviceLoader;

    Object.defineProperty(context, 'services', {
      get() {
        return serviceLoader.getServices(context)
      }
    })
  }


  initMiddlewares() {
    const { middlewares: businessMiddlewares, routes } = this.options;
    // 使用this.use注册中间件
    this.use(middlewares.init());
    this.use(middlewares.views(this.rootViewPath, { map: { html: 'ejs' } }))
    this.use(middlewares.bodyParser());

    // 初始化业务中间件
    businessMiddlewares.forEach(m => {
      if (typeof m === 'function') {
        this.use(m);
      } else {
        throw new Error('中间件必须是函数');
      }
    });

    this.use(middlewares.route(routes, this.controllerLoader))
  }
}

module.exports = App;