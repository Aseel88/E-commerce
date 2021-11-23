const {ensureAuthenticated} = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const  User  = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', ensureAuthenticated, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
 });

router.post('/', async (req, res) => {
    const {name,email, password} = req.body;
    console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
    
    User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            res.send("Email in use")  
        } else {
            const newUser = new User({
                name : name,
                email : email,
                password : password
            });
    
            //hash password
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                    newUser.password = hash;
                    //save user
                    newUser.save()
                    .then((value)=>{
                        res.send('registered')
                    })
                    .catch(value=> console.log(value));
                }));
             }
       })
  });

module.exports = router;