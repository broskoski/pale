var app, express, port, qs, request, methods;

express = require('express');

app = express();

request = require('request');

qs = require('qs');

app.get('/', function(req, res) {
  res.send({
    Coordinating: 'there',
    Events: 'and objects with remote events',
    And: 'vanished objects. Making ornaments',
    Of: 'accidents and possibilities.'
  });
});

methods = ['resize', 'crop'];

app.get('/:method/:width/:height/:url', function(req, res) {
  var queryString, url;

  if (!(methods.indexOf(req.params.method) > -1)) {
    res.status(400).send('Bad Request');
  }

  url = decodeURIComponent(req.params.url);

  queryString = qs.stringify({
    url: url,
    key: process.env.EMBEDLY_KEY,
    width: req.params.width,
    height: req.params.height,
    quality: req.query.quality || 95
  });

  url = process.env.ENDPOINT + '/' + req.params.method + '?' + queryString;

  res.setHeader('Cache-Control', 'public, max-age=31557600');
  req.pipe(request(url)).pipe(res);
});

port = process.env.PORT || 5000;

app.listen(port);

console.log('Listening on port: ' + port);
