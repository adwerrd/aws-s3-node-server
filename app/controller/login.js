'use strict'

const validator = require('validator')
const utility = require('utility')
const Controller = require('egg').Controller

class LoginController extends Controller {
  async index() {
    const { ctx } = this
    const { accesskey, secretkey, host, region, timeout } = ctx.request.body
    const obj = this.formatKey(accesskey, secretkey, host, region)
    const key = {
      accessKeyId: obj.accessKeyId,
      secretAccessKey: obj.secretAccessKey,
    }
    // set your encode method
    const ticket = utility.base64encode(
      `${accesskey}$$${secretkey}$$${host}$$${region}`,
    )
    try {
      const result = await ctx.service.aws.handler(
        'listBuckets',
        key,
        timeout || 5000,
        '',
        obj.host,
        obj.region,
      )
      ctx.status = 200
      ctx.body = {
        buckets: result,
        token: ticket,
      }
    } catch (error) {
      ctx.status = 403
      ctx.body = error
    }
  }

  async login() {
    const { ctx } = this
    ctx.status = 401
    ctx.body = { msg: 'login please' }
  }

  async singOut() {
    const { ctx } = this
  }

  formatKey(accesskey, secretkey, host, region) {
    return {
      accessKeyId: accesskey || '',
      secretAccessKey: secretkey || '',
      host: host || '',
      region: region || '',
    }
  }
}

module.exports = LoginController
