'use strict';

const Controller = require('egg').Controller;
const AWS = require('aws-sdk');
const utility = require('utility');

class AwsController extends Controller {
  async list() {
    const { ctx } = this;
    try {
      const key = this.getKey()
      const buckets = await ctx.service.aws.handler('listBuckets', key, 5000);
      ctx.body = buckets;
    } catch (error) {
      ctx.body = error;
    }
  }

  async newS3() {
    const { ctx } = this;
    try {
      const timeout =  ctx.request.body.timeout;
      const host = ctx.request.body.host;
      const s3ForcePathStyle = ctx.request.body.s3ForcePathStyle || true;
      const key  = this.getKey();
      const result = getS3(key, timeout, host, s3ForcePathStyle);
      ctx.body = result;
    } catch (error) {
      ctx.body = error;
    }
  }

  async handler() {
    const { ctx } = this;
    try {
      const method = ctx.request.body.method;
      const timeout =  ctx.request.body.timeout;
      const params = ctx.request.body.params;
      const host = ctx.request.body.host;
      const s3ForcePathStyle = ctx.request.body.s3ForcePathStyle || true;
      const key  = this.getKey();
      const result = await ctx.service.aws.handler(method, key, timeout, params, host, s3ForcePathStyle);
      ctx.body = result;
    } catch (error) {
      ctx.body = error;
    }
  }

  getKey() {
    let key = this.ctx.cookies.get('ticket', {
        encrypt: true,
      });
    console.log('list--key--------\n', key);
    return key = this.formatKey(utility.base64decode(key));
  }
  
  formatKey(key) {
    return { 
      accessKeyId: key.split('$$')[0] || '',
      secretAccessKey: key.split('$$')[1] || '',
    }
  }
}

module.exports = AwsController;
