'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540376958168_571';

  // add your config here
  config.middleware = ['gzip'];
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  }
  // config AWS host adn region
  config.awsHost = 'http://47.93.3.45';
  config.region = 'us-west-1';

 // close csrf  
  config.security = {
    csrf: false,
  };
  return config;
};
