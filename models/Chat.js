const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  //email: { type: String, unique: true },
    title: String,
    message: String,
    tag: String,
    creator: String
}, { timestamps: true });


const Chat = mongoose.model('Chat', userSchema);

module.exports = Chat;
