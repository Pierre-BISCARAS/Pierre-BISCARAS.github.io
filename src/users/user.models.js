const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {type:String, required: true, unique: true},
    password : {type:String, required: true},
    admin : {type:Boolean, required: true, default: false}
    }
);


module.exports = mongoose.model('user', userSchema);
