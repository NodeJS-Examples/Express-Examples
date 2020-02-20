var express = require('express');
var app = express();

var apirouter = require('./apirouter.js');
var siterouter = require('./siterouter.js');


app.use('/api', apirouter);
app.use('/', siterouter);

app.listen(8080);