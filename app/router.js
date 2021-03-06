'use strict'

module.exports = (app) => {
  const { router, controller } = app
  const auth = app.middleware.auth()

  router.get('/', controller.index.index)
  router.post('/handler', auth, controller.aws.handler)
  router.post('/login', controller.login.index)
  router.get('/login', controller.login.checkError)
}
