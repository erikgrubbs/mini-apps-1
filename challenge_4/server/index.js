const express = require('express');


const app = express();
const port = 3005;

app.use(express.static(__dirname + '/../client/dist'))

app.listen(port, () => console.log('listening on', port));


