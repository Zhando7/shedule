const   mongoose = require('mongoose'),
        fs = require('fs'),
        crypto = require('crypto'),
        Schema = mongoose.Schema;

const raw = fs.readFile('schema.json', (err, data) => {
    if(err) return err;
    return data.toString();
});

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