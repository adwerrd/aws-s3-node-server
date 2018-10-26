'use strict';

const Controller = require('egg').Controller;
const AWS = require('aws-sdk');
const utility = require('utility');

class AwsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.params = {};
  }
  async list() {
    const { ctx } = this;
    try {
      const key = this.getKey()
      const buckets = await ctx.service.aws.handler('listBuckets', key, 5000);
      ctx.body = buckets;
    } catch (error) {
      ctx.body = { error };
      ctx.logger.info(error);
    }
  }

  /**
   * listObjects(params, fun(){})
    params = {
      Bucket: 'STRING_VALUE', // required
      Delimiter: 'STRING_VALUE',
      EncodingType: url,
      Marker: 'STRING_VALUE',
      MaxKeys: 0,
      Prefix: 'STRING_VALUE',
    };
  **/
  async listObjects() {
    const { ctx } = this;
    try {
      this.params = {
        Bucket: ctx.params.bucket || '',
        Prefix: ctx.params.prefix || '',
      };
      const lists = await ctx.service.aws.handler('listObjects', key, 5000, params);
      ctx.body = lists;
    } catch (error) {
      ctx.body = error;
      ctx.logger.info(error);
    }
  }

  /** 
   * createBucket(params, function(err, data){})
   * params = {
      Bucket: "examplebucket", 
      CreateBucketConfiguration: {
      LocationConstraint: "eu-west-1"
    }
  */
  async create() {
    const { ctx } = this;
    try {
      const name = ctx.request.body.name;
      this.params = {
        Bucket: name,
      };
      const key = this.getKey();
      const result = await ctx.service.aws.handler('createBucket', key, 5000, params);
      ctx.body = result;
    } catch (error) {
      ctx = error;
      ctx.logger.info(error);
    }
  }

  /* 
  deleteBucket(params, function(err, data){})
  params = {
    Bucket: 'STRING_VALUE' //required
  };

  * 
  deleteObjects(params, function(err, data){})
  params = {
    Bucket: "examplebucket", 
    Delete: {
    Objects: [
        {
      Key: "HappyFace.jpg", 
      VersionId: "2LWg7lQLnY41.maGB5Z6SWW.dcq0vx7b"
      }, 
        {
      Key: "HappyFace.jpg", 
      VersionId: "yoz3HB.ZhCS_tKVEmIOr7qYyyAaZSKVd"
      }
    ], 
    Quiet: false
    }
 }
  */
  async removeBucket() {
   const { ctx } = this;
    try {
      const name = ctx.request.body.name;
      const key = this.getKey();
      this.params = {
        Bucket: 'name',
      }
      const lists = await ctx.service.aws.handler('listObjects', key, 10000, params);
      this.params = {
        Objects : lists,
      };
      await ctx.service.aws.handler('deleteObjects',key , 10000, params)
      this.params = {
        Bucket: name,
      };
      const result = await ctx.service.aws.handler('removeBucket', key, 5000, params);
      ctx.body = result;
    } catch (error) {
      ctx = error;
      ctx.logger.info(error);
    }
  }

  async addObject() {

  }

  async removeObject() {

  }

  async getAcl() {

  }

  getKey() {
    let key = ctx.cookies.get('ticket', {
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
