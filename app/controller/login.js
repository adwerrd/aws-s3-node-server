'use strict';

const validator = require('validator');
const utility = require('utility');
const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    const { username, password, host, region, timeout } = ctx.request.body;
      const obj = this.formatKey(username, password, host, region);
      const key = {
        accessKeyId: obj.accessKeyId,
        secretAccessKey: obj.secretAccessKey
      }
      // set your encode method
      const ticket = (`${username}$$${password}$$${host}$$${region}`);
    try {
      const result = await ctx.service.aws.handler('listBuckets', key, timeout || 5000, '', obj.host, obj.region);
      ctx.status = 200;
      ctx.cookies.set('ticket', ticket, {
        encrypt: true, // 加密传输
        maxAge: 24 * 3600 * 1000, // 1 天
      });
      ctx.body = result;
    } catch (error) {
      ctx.status = 403;
      ctx.body = error;
    }
  }

  async login() {
    const { ctx } = this;
    ctx.status = 401;
    ctx.body = { msg: 'login please' };
    ctx.cookies.set('ticket', null);
  }

  async singOut() {
    const { ctx } = this;
    ctx.cookies.set('ticket', null);
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

module.exports = LoginController;