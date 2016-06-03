var path = require('path');

var express = require('express');
var app = new (express)()
var port = 3000

app.use('/static', express.static('dist'));

app.get("/", function(req, res) {
  res.sendFile(path.resolve('./index.html'))
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
