const {createCustomer, stepOne, stepTwo, stepThree, getCompleteCustomer} = require('../database/helpers.js');



const controllers = {

  post: ({ body }, res) => {
    if (body.step === 0) {
      createCustomer()
        .then(({id}) => res.status(201).send(id.toString()));
    }
    if (body.step === 1) {
      stepOne(body.id, body.info)
        .then(() => res.status(201).send('stepone complete'))
        .catch((err) => {
          console.error(err);
          res.status(404).send('error');
        });
    } else if (body.step === 2) {
      stepTwo(body.id, body.info)
        .then(() => res.status(200).send('steptwo complete'));
    } else if (body.step === 3) {
      stepThree(body.id, body.info)
        .then(() => res.status(200).send('stepthree complete'));
    }
  },
  get: ({ query }, res) => {
    getCompleteCustomer(query.id)
      .then((cust) => res.status(200).send(cust));
  }

};

module.exports = controllers;