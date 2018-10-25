module.exports = options => {
  return async function auth(ctx, next) {
    await next();
    
    if (!ctx.cookies.get('ticket')) {
      ctx.redirect('/login');
    }
  };
};