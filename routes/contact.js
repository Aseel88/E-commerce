const { Category } = require('../models/category');
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    Category.find({}, function (err, categories) {
        Product.find({}, function (err, products) {
            res.render('contact', {
                products: products,
                categories: categories,
                user: req.session.passport == null ? null : req.session.passport.user
            });
        });
    });
});

module.exports = router;
