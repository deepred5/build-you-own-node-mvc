const testRoute = () => {
  return async (context, next) => {
    console.log('路由自定义中间件');
    await next()
  }
}

module.exports = testRoute()