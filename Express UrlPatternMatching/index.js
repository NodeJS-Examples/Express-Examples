var express = require("express");
var app = express();

app.get('/:id/:name', function(req, res){
   res.send("ID: " + req.params.id + "Name: " + req.params.name);
});

//Integer matching for 5 digits only
app.get('/:intid([\\d]{5})', function(req, res){
    res.send("5-Digit Integer ID: " + req.params.intid);
});

//Integer matching for any number of digits greater than 0
app.get('/:intid(\\d+)', function(req, res){
    res.send("Generic Integer ID: " + req.params.intid);
});

app.get('*', function(req, res){
   res.send('Super generic response');
});

app.listen(8080);