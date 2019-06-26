const Sequelize = require('sequelize');

const db = new Sequelize('shopping', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

db
  .authenticate()
  .then(() => console.log('database connected'))
  .catch((err) => console.error(err));
 
module.exports = db;  