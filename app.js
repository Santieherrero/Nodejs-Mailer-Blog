var express = require('express');
var app = express();

app.get('/',function(request,response) {
	response.send("Hello, World!!! OK");
});


module.exports = app;