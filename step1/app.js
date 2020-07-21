const { App } = require('./my-node-mvc');
const routes = require('./route');
const middlewares = require('./middlewares');

const app = new App({
  routes,
  middlewares,
});

app.listen(6666, () => {
  console.log('app start at: http://localhost:6666');
})