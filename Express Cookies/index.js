var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get('/', function(req, res){
    var cookie = req.cookies.express;
    if (cookie == undefined) {
        res.cookie('express', "TEST COOKIE");
        console.log("Test cookie set");
        res.send("Cookie set");
    }
    else{
        console.log("Test cookie already set");
        res.send("Cookie already set");
    }
    
});

app.listen(8080);
