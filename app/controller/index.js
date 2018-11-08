const Controller = require('egg').Controller

class IndexController extends Controller {
  async index() {
    this.ctx.body = 'aws s3 node server ok'
  }
}
