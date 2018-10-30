'use strict';

module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();

  // v-test
  router.post('/getUploadUrl', auth, controller.aws.getURL);
  router.post('/handler', auth, controller.aws.handler);
  router.post('/login', controller.login.index);
  router.get('/login', controller.login.login);
  // v1
};