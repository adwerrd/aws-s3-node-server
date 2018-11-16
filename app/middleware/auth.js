module.exports = (options) => {
  return async function auth(ctx, next) {
    await next()

    if (!ctx.cookies.get('token')) {
      ctx.body = {
        message: 'no token',
        code: 401,
      }
      ctx.status = 401
    }
  }
}
