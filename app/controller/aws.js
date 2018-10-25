'use strict';

const Controller = require('egg').Controller;
const AWS = require('aws-sdk');
const utility = require('utility');

class AwsController extends Controller {
  async check() {
    const { ctx } = this;
  }

  async list() {
    const { ctx } = this;
    try {
      let key = ctx.cookies.get('ticket');
      if(key) {
        key = this.formatKey(utility.unescape(key));
      }
      const buckets = await ctx.service.aws.handler('listBuckets', key, 5000);
      ctx.body = buckets;
    } catch (error) {
      ctx.body = { error };
    }
  }
  async add() {
    const { ctx } = this;
    
  }

  formatKey(key) {
    return { 
      accessKeyId: key.split('$$')[0],
      secretAccessKey: key.split('$$')[1],
    }
  }
  async remove() {

  }
}

module.exports = AwsController;
