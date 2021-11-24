const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
var bodyParser = require('body-parser');
const app = express();
const { Category } = require('../models/category');
const { Product } = require('../models/product');

router.get('/', async (req, res) => {
  Category.find({}, function (err, categories) {
    Product.find({}, function (err, products) {
      res.render('registration', {
        products: products,
        categories: categories,
        user: req.session.passport == null ? null : req.session.passport.user
      });
    });
  });
});

module.exports = router;