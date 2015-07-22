
var express, app;

express = require('express');
app = express();

app.use(express.static('public'));

app.get('/',function(request,response) {
  response.send('OK');
});


module.exports = app;