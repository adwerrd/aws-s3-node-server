'use strict';

// had enabled by egg
// exports.static = true;
exports.cors = {
  enable: true,
  credentials: true,
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  package: 'egg-cors',
};