var app, express, port, qs, request;

express = require('express');

app = express();

request = require('request');

qs = require('qs');

app.get('/resize/:url/:width/:height', function(req, res) {
  var queryString, url;
  url = decodeURIComponent(req.params.url);
  queryString = qs.stringify({
    url: url,
    key: process.env.EMBEDLY_KEY,
    width: req.params.width,
    height: req.params.height,
    quality: 95
  });
  url = process.env.ENDPOINT + '?' + queryString;
  req.pipe(request(url)).pipe(res);
});

port = process.env.PORT || 5000;

app.listen(port);

console.log('Listening on port: ' + port);
