var express = require("express");
var app = express();
app.set('view engine', 'pug');
app.set('views', './views');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs', { useNewUrlParser: true, useUnifiedTopology: true });

var dogSchema = mongoose.Schema({
   name: String,
   age: Number,
   weight: String,
   breed: String
});
//Database connection to the Dog table, with the dogSchema
var Dog = mongoose.model("Dog", dogSchema);

app.get('/dog', function(req, res) {
   res.render('dog');
});

app.post('/dog', function(req, res) {
   var dogInfo = req.body; //Get the parsed information


   var newDog = new Dog({
      name: dogInfo.name,
      age: dogInfo.age,
      weight: dogInfo.weight,
      breed: dogInfo.breed
   });

   newDog.save(function(err, Person) {
      if (err)
         res.render('show_message', { message: "Database error", type: "error" });
      else
         res.render('show_message', {
            message: "New person added",
            type: "success",
            dog: newDog
         });
   });
});

app.get('/findAllDogs', function(req, res) {
   Dog.find(function(err, response) {
      if (err) throw err;
      res.json(response);
   });
});

//Called with queryparam ?name=<parameter>
app.get('/findByName', function(req, res) {
   Dog.find({ name: req.query.name }, function(err, response) {
      if (err) throw err;
      res.json(response);
   });
});

//Update all rows wtih conditional queryparam ?name=<parameter>
app.get('/updateDogByName', function(req, res) {
   Dog.updateMany({ name: req.query.name }, { weight: 300 },
      function(err, response) {
         if (err) throw err;
         res.json(response);
      }
   );
});

//queryparm ?name=<parameter>
app.get('/updateOneDogByName', function(req, res) {
   Dog.updateOne({ name: req.query.name }, { breed: "Schnauzer" },
      function(err, response) {
         if(err) throw err;
         res.json(response);
      }
   );
});

app.get('/updateById', function(req, res) {
   Dog.updateOne({_id:req.query.id}, {weight:999}, function(err, response){
      if(err) throw err;
      res.json(response);
   });
});

app.get('/removeById', function(req, res) {
   Dog.deleteOne({_id:req.query.id}, function(err, response){
      if(err) throw err;
      res.json(response);
   });
});

app.delete('/dogs/:id', function(req, res) {
   Dog.deleteMany({_id:req.params.id}, function(err, response){
      if(err) res.json({message: "Error in deleting record id " + req.params.id});
      else res.json({message: "Dog with id " + req.params.id + " removed."});
   });
});

app.listen(8080);
