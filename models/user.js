const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String
    },
    googleID: {
        type:String
    },
    thumbnail: {
        type:String
    },
    email:{
        type:String
    },
    todos:[{
        type:Object,
        index:true
    }]
},{timestamps:true});

const User = mongoose.model('user',userSchema);
module.exports = User;