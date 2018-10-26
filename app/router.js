'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth();

  router.get('/login', controller.login.login);
  router.post('/login', controller.login.index);
  router.get('/listBucket', auth, controller.aws.list);
  router.get('/list:bucket:prefix', auth, controller.aws.listObjects);
  router.post('/createBucket', auth, controller.aws.create);
  router.post('/removeBucket', auth, controller.aws.removeBucket);

};