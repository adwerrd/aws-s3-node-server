const AWS = require('aws-sdk')
const Service = require('egg').Service

class AwsService extends Service {
  constructor(ctx) {
    super(ctx);
    this.awsHost = this.config.awsHost;
    this.region = this.config.region;
  }

  async configAws({
    key,
    timeout = 10000,
    host = this.awsHost,
    s3ForcePathStyle,
    region = this.region,
  }) {
    AWS.config.update({
      accessKeyId: key.accessKeyId || '',
      secretAccessKey: key.secretAccessKey || '',
    })
    AWS.config.region = region
    AWS.config.httpOptions = { timeout: timeout }
    AWS.config.endpoint = host
    AWS.config.s3ForcePathStyle = s3ForcePathStyle
    this.ctx.logger.info(AWS.config)
  }
  async getS3({
    key,
    timeout = 10000,
    host = this.awsHost,
    s3ForcePathStyle = true,
  } = {}) {
    await this.configAws({ key, timeout, host, s3ForcePathStyle })
    return new AWS.S3()
  }

  async handler(
    method,
    key,
    timeout = 10000,
    params = '',
    host = this.awsHost,
    s3ForcePathStyle = true,
  ) {
    try {
      const s3 = await this.getS3({key, timeout, host, s3ForcePathStyle })
      return new Promise((resolve, reject) =>
        s3[method](params, (error, data) => {
          error && this.ctx.logger.error(error.message)
          return error ? reject(error) : resolve(data)
        }),
      )
    } catch (error) {
      this.ctx.logger.error(error.message || error.show_msg)
      return Promise.reject(error)
    }
  }
}

module.exports = AwsService