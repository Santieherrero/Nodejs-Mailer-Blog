
var express, app, emailer;

express = require('express');
app = express();

app.get('/',function(request,response) {
  response.send('OK');
});


module.exports = app;