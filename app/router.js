'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();

  // v0
  router.post('/s3', auth, controller.aws.newS3);
  router.post('/handler', auth, controller.aws.handler);
  router.post('/login', controller.login.index);
  router.get('/login', controller.login.login);
  // v1
};