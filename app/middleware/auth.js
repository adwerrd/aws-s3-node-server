module.exports = (options) => {
  return async function auth(ctx, next) {
    await next()

    if (!ctx.get('Authorization')) {
      ctx.redirect('/login')
    }
  }
}
