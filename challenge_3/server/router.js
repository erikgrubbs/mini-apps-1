const router = require('express').Router();
const {customerInfo, authentication} = require('./controllers.js');

router
  .route('/api')
  .post(customerInfo.post)
  .get(customerInfo.get)

router
  .route('/login')
  .get((req, res) => {
    res.send('hi');
  })
  .post(authentication.login);

module.exports = router;