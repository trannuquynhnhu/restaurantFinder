const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    role: String,
    created_at: Date,
    updated_at: Date
})

module.exports = mongoose.model('User', userSchema);