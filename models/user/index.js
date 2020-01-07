const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

// parse json
const raw = require('./schema.json');

// create a schema
const userSchema = Schema(raw, { versionKey: false });

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(15).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

// compile the model
const User = mongoose.model('Users', userSchema);

module.exports = User;