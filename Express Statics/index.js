var express = require('express');
var app = express();

//All files in these directories become available at the root level. I.E. host/file.txt or host/image.png
app.use(express.static('public'));
app.use(express.static('images'));

//All files in these directories are available at the defined level
app.use('/public', express.static('public'));
app.use('/images', express.static('images'));

//Use views in the views folder
app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', function(req, res){
    res.render('index');
});

app.listen(8080);