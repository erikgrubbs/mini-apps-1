const Customer = require('./model.js');



const helpers = {
  getCompleteCustomer: (id) => {
    // attempt promise ?
    return Customer.findOne({where: {id}})
  },

  createCustomer: () => {
    return Customer.create();
  },

  stepOne: (id, {name, email, password}) => {
    return Customer.update({ name, email, password}, {where: {id}});
  },

  stepTwo: (id, {address, phoneNumber}) => {
    return Customer.update(
      {
      addressLine1: address.line1,
      addressLine2: address.line2,
      city: address.city,
      state: address.state,
      zip: address.zip,
      phoneNumber
      }, {where: {id}});
  },

  stepThree: (id, {ccn, cvv, billingZip}) => {
    return Customer.update(
      {
        ccn,
        cvv,
        billingZip
      },
      {where: {id}}
    );
  }
};

module.exports = helpers;