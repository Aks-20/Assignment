const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mobile: String
});

module.exports = mongoose.model('Person', personSchema);
