const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const cookieParse = require('cookie-parser');
const logIn = require('./middleware.js');

const app = express();

app.use(cookieParse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public/'));
app.use(logIn);

app.use(router);

app.listen(3003, () => console.log('Listening on 3003!'));


