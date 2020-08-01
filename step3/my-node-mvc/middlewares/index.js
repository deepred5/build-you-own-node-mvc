const init = require('./init');
const bodyParser = require('koa-bodyparser');
const route = require('./route');
const views = require('koa-views');

module.exports = {
  init,
  bodyParser,
  route,
  views
}