var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.post('/hello', function(req, res){
    res.send("Hello world posted!");
});

app.listen(8080);