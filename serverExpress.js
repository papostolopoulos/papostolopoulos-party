//--------Morgan included---------

'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, newGuestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(newGuestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

app.post('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);
    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.put('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests[id] = guest;

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port, "and for project 'Party'");
});

//---WITHOUT morgan
// 'use strict';
//
// var fs = require('fs');
// var path = require('path');
// var guestsPath = path.join(__dirname, 'guests.json');
//
// var express = require('express');
// var app = express();
// var port = process.env.PORT || 8000;
//
// app.disable('x-powered-by');
//
// app.use(function(req, res, next) {
//   var start = new Date();
//   next();
//   var end = new Date();
//   console.log(req.method, req.url, res.statusCode, end - start, 'ms');
// });
//
// app.get('/guests', function(req, res) {
//   fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
//     if (err) {
//       console.error(err.stack);
//       return res.sendStatus(500);
//     }
//
//     var guests = JSON.parse(guestsJSON);
//
//     res.send(guests);
//   });
// });
//
// app.get('/guests/:id', function(req, res) {
//   fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
//     if (err) {
//       console.error(err.stack);
//       return res.sendStatus(500);
//     }
//
//     var id = Number.parseInt(req.params.id);
//     var guests = JSON.parse(guestsJSON);
//
//     if (id < 0 || id >= guests.length || Number.isNaN(id)) {
//       return res.sendStatus(404);
//     }
//
//     res.set('Content-Type', 'text/plain');
//     res.send(guests[id]);
//   });
// });
//
// app.use(function(req, res) {
//   res.sendStatus(404);
// });
//
// app.listen(port, function() {
//   console.log('Listening on port', port, 'and for project "Party" for express server');
// });
