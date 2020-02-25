var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authentication', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/static', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({
    secret: "SecretHash123",
    resave: true,
    saveUninitialized: true
}));

var schemas = require('./schemas.js');
var dataOperations = require('./dataOperations.js');


var User = mongoose.model("user", schemas.UserSchema);

function checkSignIn(req,res, next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/signup');
    }
}

app.get('/', checkSignIn, function(req, res) {
    res.render('main', {
        username: req.session.user
    });
});

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.status("400");
        return res.render('signup', {
            username: req.body.username,
            password: req.body.password,
            message: `Please enter both a username and a password`
        });
    }
    else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        dataOperations.CheckUserExists(User, newUser.username, function(err, exists) {
            if (err) throw err;
            if (exists)
                return res.render('signup', {
                    username: req.body.username,
                    password: req.body.password,
                    message: `User ${newUser.username} already exists`
                });
            else
                dataOperations.CreateRecord(newUser, function(err, created) {
                    if (err) throw err;
                    if (created) {
                        req.session.user = newUser.username;
                        res.render('signup', {
                            loggedIn: true,
                            message: `User ${req.session.user} was created`
                        });
                        //could also just
                        //res.redirect('/');
                    }
                });
        });
    }
});

app.listen(8080);
//Could do the following to expose socket.io on the same port
//var server    = app.listen(8080);
//var io        = require('socket.io').listen(server);
