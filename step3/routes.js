const routes = [
  {
    match: '/',
    controller: 'home.index'
  },
  {
    match: '/list',
    controller: 'home.fetchList',
    method: 'get'
  }
];


module.exports = routes;