// 'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');
const utility = require('utility');

class AwsController extends Controller {
  async list() {
    const { ctx } = this;
    try {
      const Key  = this.getKey();
      const key = {
        accessKeyId: Key.accessKeyId,
        secretAccessKey: Key.secretAccessKey
      }
      const buckets = await ctx.service.aws.handler('listBuckets', key, 5000, {}, Key.host, Key.region);
      ctx.body = buckets;
    } catch (error) {
      ctx.body = error;
    }
  }

  async getURL() {
    const { ctx } = this;
    const { params , timeout } = ctx.request.body;
    const obj  = this.getKey();
    const key = {
      accessKeyId: obj.accessKeyId,
      secretAccessKey: obj.secretAccessKey
    }
    try {
      const s3 = await ctx.service.aws.getS3({
        key, 
        timeout: timeout || 3600000,
        host: obj.host,
        region: obj.region
      });
      const url = s3.getSignedUrl('putObject', params || '');
      ctx.body = url;
    } catch (error) {
      ctx.body = error;
    }
  }

  async handler() {
    const { ctx } = this;
    const { method, params , timeout} = ctx.request.body;
    try {
      const obj = this.getKey();
      const key = {
        accessKeyId: obj.accessKeyId,
        secretAccessKey: obj.secretAccessKey
      }
      const result = await ctx.service.aws.handler(method, key, timeout || 10000, params, obj.host ,obj.region);
      ctx.body = result;
    } catch (error) {
      ctx.body = error;
    }
  }

  getKey() {
    let key = utility.base64decode(this.ctx.get('Authorization'));
    return this.formatKey(key);
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

module.exports = AwsController;
