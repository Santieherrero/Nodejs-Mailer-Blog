var express, app, emailer, bodyParser, urlencoded;

express = require('express');
app = express();
emailer = require('./controllers/emailer');

bodyParser = require('body-parser');
urlencoded = bodyParser.urlencoded({ extended: false });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(request,response) {
  response.status(200).json({status: 'OK', awake: true});
});


app.post('/mailer',urlencoded,emailer.check,emailer.sendEmail);

module.exports = app;