'use strict';

const validator = require('validator');
const utility = require('utility');
const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    try {
      const username = validator.trim(ctx.request.body.username);
      const password = validator.trim(ctx.request.body.password);
      const key = this.formatKey(username, password);
      // set your encode method
      const ticket = utility.base64encode(username + '$$' + password);
      console.log('ticket---------\n',ticket);
      const result = await ctx.service.aws.handler('listBuckets', key, 2000);
      ctx.status = 200;
      ctx.cookies.set('ticket', ticket, {
        encrypt: true, // 加密传输
        maxAge: 24 * 3600 * 1000, // 1 天
      });
      ctx.body = { data: result };
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

  formatKey(accesskey, secretkey) {
    return {
      accessKeyId: accesskey || '',
      secretAccessKey: secretkey || '',
    }
  }
}

module.exports = LoginController;