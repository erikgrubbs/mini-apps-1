const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();


const generatecsv = (json) => {
  var csv = "";
  for  (var key in json) {
    if (key === 'children') {
      break;
    }
    csv += key + ',';
  }
  csv = csv.slice(0, -1);
  csv += '\n';
  const genPerson = (person) => {
    for (var key in person) {
      if (key === 'children') {
        csv = csv.slice(0, -1);
        csv += '\n';
        for (var i = 0; i < person.children.length; i++) {
          genPerson(person.children[i]);
        }
        return;
      }
      csv += person[key] + ',';
    }
  }
  genPerson(json);
  return csv;
}

// app.use('/csv', (req, res, next) => {
//   var file = Buffer.alloc(0);
//   req.on('data', (chunk) => {
//     file = Buffer.concat([file, chunk]);
//   });

//   req.on('end', () => {
//     console.log('///////////////', file.toString());
//     next();
//   })
// });
app.use('/csv', (req, res, next) => {
  var body= "";
  req.on('data', (chunk) => {
    body+= chunk
  });
  req.on('end', () => {
    let parts = body.split('=');
    key = parts[0];
    text = parts[1];
    req.body = {
      key: text
    }
    console.log(req.body);
    next();
  });
});


app.use(morgan('dev'));

app.use(express.static(__dirname + '/client'));
app.use('/client', express.static(__dirname + '/client'));

app.post('/csv', (req, res) => {
  var csv = generatecsv(JSON.parse(req.body.key))
  fs.writeFile(__dirname + '/csv_report.csv', csv, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('success');
    res.status(201).send(csv);
  });
});



app.listen(3002), console.log('Listening on 3002!');
