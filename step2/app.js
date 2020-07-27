const { App } = require('./my-node-mvc');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = new App({
  routes,
  middlewares,
});

app.listen(4445, () => {
  console.log('app start at: http://localhost:4445');
})