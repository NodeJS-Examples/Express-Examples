var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', function(req, res){
    res.render('first_view');
});

app.get('/yardDefender', function(req, res){
    res.render('yard_defender');
});

app.get('/dynamic_view', function(req, res){
   res.render('dynamic', 
   {
      url:
      {
          name: "TutorialsPoint",
          link: "http://www.tutorialspoint.com"
      },
      user:
      {
          name: "Erik"
      }
   });
});

app.get('/components',function(req, res) {
    res.render('components',
    {
        user:
        {
            name: "Component Chris"
        }
    });
});

app.listen(8080);