
var express, app, emailer;

express = require('express');
app = express();
// emailer = require('./controllers/emailer');


app.get('/',function(request,response) {
  response.send('OK');
})


module.exports = app;