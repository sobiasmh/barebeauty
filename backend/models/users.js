const mongoose = require('mongoose');
const { isAccessor } = require('typescript');

const usersSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    Role: {
        type: String,
        require: true,

    },
    userEmail: {
        type: String,
        require: true
    },
    userPassword: {
        type: String,
        require: true
    },
    userPhoneNumber: {
        type: String,
        require: true
    }
})

exports.Users = mongoose.model('Users', usersSchema);
