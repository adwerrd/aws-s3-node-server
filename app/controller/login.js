'use strict'
const Controller = require('egg').Controller
const utility = require('utility')

class LoginController extends Controller {
  async index() {
    const { ctx } = this
    const { accesskey = '', secretkey = '', host = '', region = '', timeout = 5000 } = ctx.request.body
    try {
      const result = await ctx.service.aws.handler(
        'listBuckets',
        {
          accessKeyId: accesskey,
          secretAccessKey: secretkey,
        },
        timeout,
        '',
        host,
        region,
      )
      ctx.status = 200
      ctx.cookies.set('token', utility.base64encode(`${accesskey}$$${secretkey}$$${host}$$${region}`))
      ctx.body = {
        buckets: result,
      }
    } catch (error) {
      ctx.status = 403
      ctx.body = error
    }
  }

  async checkError() {
    const { ctx } = this
    ctx.status = 401
    ctx.body = { msg: 'please login first' }
  }
}

module.exports = LoginController
