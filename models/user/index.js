const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// parse json
const raw = require('./schema.json');

// create a schema
const userSchema = Schema(raw);

// compile the model
const User = mongoose.model('Users', userSchema);

module.exports = User;