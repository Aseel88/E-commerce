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
    // const { error } = validate(req.body); 
    // if (error) return res.status(400).send(error.details[0].message);
  
    // let user = await User.findOne({ email: req.body.email});
    // if (user) return res.status(400).send('User is already registered!')

    // user = new User(_.pick(req.body, ['name', 'email', 'password']));
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
    // await user.save();

    // const token = user.generateAuthToken();
    // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
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