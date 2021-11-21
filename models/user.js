const config = require('config');
// const jwt = require('jsonwebtoken');
// const Joi = require('joi');
// const passwordComplexity = require("joi-password-complexity");
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
      },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
      },
      isAdmin: Boolean
}); 


const User = mongoose.model('User', userSchema );

module.exports = User;