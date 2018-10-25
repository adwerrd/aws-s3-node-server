'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();

  router.get('/login', controller.login.login);
  router.post('/login', controller.login.index);
  router.get('/list', auth, controller.aws.list);
};