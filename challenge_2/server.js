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
app.use(express.static(__dirname + '/client'));

app.use('/csv', (req, res, next) => {
  var file = Buffer.alloc(0);
  req.on('data', (chunk) => {
    file = Buffer.concat([file, chunk]);
  });
  req.on('end', () => {
    req.body = file.toString();
    var beginOfJson = req.body.indexOf('{');
    var endOfJson = req.body.lastIndexOf('}');
    req.body = req.body.slice(beginOfJson, endOfJson + 1);
    console.log(req.body);
    next();
  })

});


app.use(morgan('dev'));


app.post('/csv', (req, res) => {
  var csv = generatecsv(JSON.parse(req.body))
  fs.writeFile(__dirname + '/csv_report.csv', csv, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('success');
    res.status(201).send(csv);
  });
});


app.get('/csv', (req, res) => {
  res.sendFile(__dirname + '/csv_report.csv');
})
app.listen(3002), console.log('Listening on 3002!');
