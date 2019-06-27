const Sequelize = require ('sequelize');
const db = require ('./index.js');

const Customer = db.define('customer', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: true
  },
  addressLine2: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true
  }, 
  ccn: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cvv: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  billingZip: {
    type: Sequelize.INTEGER,
    allowNull: true
  }

}, {timestamps: false});


db.sync();

module.exports = Customer;