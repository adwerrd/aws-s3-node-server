// 'use strict';

const Controller = require('egg').Controller
const validator = require('validator')
const utility = require('utility')

class AwsController extends Controller {
  async handler() {
    const { ctx } = this
    const { method, params, timeout } = ctx.request.body
    try {
      const obj = this.getKey()
      const key = {
        accessKeyId: obj.accessKeyId,
        secretAccessKey: obj.secretAccessKey,
      }
      const result = await ctx.service.aws.handler(
        method,
        key,
        timeout || 10000,
        params,
        obj.host,
        obj.region,
      )

      ctx.status = result.statusCode
      ctx.body = result
    } catch (error) {
      ctx.body = error
    }
  }

  getKey() {
    let key = utility.base64decode(this.ctx.get('Authorization'))
    return this.formatKey(key)
  }

  formatKey(key) {
    return {
      accessKeyId: key.split('$$')[0] || '',
      secretAccessKey: key.split('$$')[1] || '',
      host: key.split('$$')[2] || '',
      region: key.split('$$')[3] || '',
    }
  }
}

module.exports = AwsController
