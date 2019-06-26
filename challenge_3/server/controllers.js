const {stepOne, stepTwo, stepThree, getCompleteCustomer} = require('../database/helpers.js');



const controllers = {

  post: ({ body }, res) => {
    if (body.step === 1) {
      stepOne(body.info)
        .then(({id}) => res.status(201).send(id.toString()))
        .catch((err) => {
          console.error(err);
          res.status(404).send('error');
        });
    } else if (body.step === 2) {
      stepTwo(body.id, body.info)
        .then(() => res.status(200).send('steptwo complete'));
    } else if (body.step === 3) {
      stepThree(body.id, body.info)
        .then(() => res.status(200).send('steptwo complete'));
    }
  },
  get: ({ query }, res) => {
    getCompleteCustomer(query.id)
      .then((cust) => res.status(200).send(cust));
  }

};

module.exports = controllers;