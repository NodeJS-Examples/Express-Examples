var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get('/', function(req, res){
    var cookie = req.cookies.express;
    if (cookie == undefined) {
        res.cookie('express', "TEST COOKIE");
        res.send("Cookie set");
    }
    else{
        console.log("Test cookie already set");
        res.send("Cookie already set");
    }
    
});

app.get('/clearCookieExpress', function(req,res){
    res.clearCookie('express');
    res.send('Cookie cleared');
});

app.listen(8080);
