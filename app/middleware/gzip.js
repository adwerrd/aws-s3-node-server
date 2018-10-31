const isJSON = require('koa-is-json')
const zlib = require('zlib')

module.exports = (option) => {
  return async function gzip(ctx, next) {
    await next()

    let body = ctx.body
    if (!body) return

    if (option.threshold && ctx.length < option.threshold) return

    if (isJSON(body)) body = JSON.stringify(body)

    const stream = zlib.createGzip()
    stream.end(body)
    ctx.body = stream
    ctx.set('Content-Encoding', 'gzip')
  }
}
