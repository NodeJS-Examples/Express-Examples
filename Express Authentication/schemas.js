var mongoose = require('mongoose');
exports.UserSchema = mongoose.Schema({
   username: String,
   password: String
});

exports.DogSchema = mongoose.Schema({
   name: String,
   age: Number,
   weight: String,
   breed: String
});