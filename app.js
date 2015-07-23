var express, app, emailer;

express = require('express');
app = express();
// emailer = require('./controllers/emailer');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(request,response) {
  response.send('OK');
});


app.post('/mailer',emailer.check,emailer.sendEmail);

module.exports = app;