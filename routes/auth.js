const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/',(req,res, next)=>{
  passport.authenticate('local',{
      successRedirect : '/',
      failureRedirect: '/',
  })(req,res,next)
})

  
module.exports = router;