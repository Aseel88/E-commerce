const { Category } = require('../models/category');
const {Product} = require('../models/product'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    // res.render('about', { text: 'About'});
    Category.find({}, function(err, categories) {
      Product.find({}, function(err, products){
          res.render('about', {            
              products: products,
              categories: categories 
          });
      })       
  }) 
  });

module.exports = router;
