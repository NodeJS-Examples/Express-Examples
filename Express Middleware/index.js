var express = require('express');
var app = express();

app.use('/', function(req, res, next){
   console.log("Catch the request and log it here.");
   next();
});

app.use('/', function(req, res, next){
   console.log("Catch the request again and store information about the user to a table.");
   next();
});

app.get('/', function(req, res){
   res.send('Welcome to the home page, visitor!');
});

app.listen(8080);