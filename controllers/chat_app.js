/**
 * GET /books
 * List all books.
 */
//const chat = require('../models/Book.js');


  //res.json(Chat.message);
const validator = require('validator');
const _ = require('lodash');
const Chat = require('../models/Chat');
const User = require('../models/User');

exports.getchat = (req, res) => {
  Chat.find({}).then(doc =>{
    console.log(doc)
  }).catch(err =>{
    console.error(err);
  });
    console.log(Chat.message);
res.render('chat_app');
}

exports.postchat = (req, res, next) => {


    const validationErrors = [];
    if (!validator.isLength(req.body.message, { min: 8 })) validationErrors.push({ msg: 'Message must be long enough' });
    if (validationErrors.length) {
      req.flash('errors', validationErrors);
      return res.redirect('/chat_app');
  }

  var creator = req.user.email;
  console.log(creator);
  console.log(req.body.message);

  //console.log(req.User.email);
  const chat = new Chat({
    title: req.body.title || '',
    message: req.body.message || '',
    tag: req.body.tag || '',
    creator: req.user.email || ''
  });

  Chat.findOne({ title: req.body.title }, (err, existingChat) => {
    if (err) { return next(err); }
    if (existingChat) {
      req.flash('errors', { msg: 'An Article with that title already exists' });
      return res.redirect('/chat_app');
    }
    chat.save((err) => {
      if (err) { return next(err); }

    });
  });

  res.redirect('/chat_app');
}
