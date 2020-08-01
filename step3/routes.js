const testRoute = require('./middlewares/testRoute');

const routes = [
  {
    match: '/',
    controller: 'home.index'
  },
  {
    match: '/list',
    controller: 'home.fetchList',
    method: 'get',
    middlewares: [testRoute]
  }
];


module.exports = routes;