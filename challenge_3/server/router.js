const router = require('express').Router();
const controllers = require('./controllers.js');

router
  .route('/api')
  .post(controllers.post)
  .get(controllers.get)

module.exports = router;