const { Category } = require('../models/category');
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.session.passport && req.session.passport.user) {
        return res.redirect("/");
    }
    Category.find({}, function (err, categories) {
        Product.find({}, function (err, products) {
            res.render('login', {
                products: products,
                categories: categories,
                user: null
            });
        });
    });
});

module.exports = router;
