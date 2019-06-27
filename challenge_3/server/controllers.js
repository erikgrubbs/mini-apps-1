const { createCustomer, stepOne, stepTwo, stepThree, getCompleteCustomer, loginCompare } = require('../database/helpers.js');




const customerInfo = {

  post: ({ body, loggedIn }, res) => {
    if (loggedIn) {
      console.log(loggedIn);
      if (body.step === 0) {
        createCustomer()
          .then(({ id }) => {
            res.cookie('id', id.toString());
            res.status(201).send(id.toString())
          });

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
      }
    }
    res.redirect('/login');
  },
  get: ({ query }, res) => {
    getCompleteCustomer({ id: query.id })
      .then((cust) => res.status(200).send(cust));
  }

};


const authentication = {
  login: ({ body }, res) => {
    loginCompare(body.name)
      .then((cust) => {
        if (cust.password === body.password) {
          res.cookie('success', 'yes');
          res.status(200).redirect('/');
        }
        else {
          res.status(400).send("incorrect log in and password");
        }
      });
  },

  signup: (req, res) => {

  }
}


module.exports = {
  customerInfo,
  authentication
};