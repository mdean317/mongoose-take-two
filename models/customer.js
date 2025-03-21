const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const customer = mongoose.model('customer', customerSchema);

module.exports = customer;