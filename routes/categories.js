const { ensureAuthenticated } = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Category } = require('../models/category');
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort('name')
    res.render('categories', {
      categories: categories,
      user: req.session.passport == null ? null : req.session.passport.user
    });
  }
  catch (ex) {
    next(ex);
  }
});

router.post('/', ensureAuthenticated, async (req, res) => {
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({ name: req.body.name });

  await category.save();
  res.send(category);
});

router.put('/:id', async (req, res) => {
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  })

  if (!category) return res.status(404).send('The category with the given ID was not found.');

  res.send(category);
});

router.delete('/:id', [ensureAuthenticated], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category) return res.status(404).send('The category with the given ID was not found.');

  res.send(category);
});

router.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);
  const products = await Product.find({});

  if (!category) return res.status(404).send('The category with the given ID was not found.');
  res.render('category', {
    category: category,
    products: products,
    user: req.session.passport == null ? null : req.session.passport.user
  });
});

router.get('/:id/products', async (req, res) => {

  const products = await Product.find({ "category._id": req.params.id });
  const category = await Category.findById({ _id: req.params.id });
  if (!products) return res.status(404).send('No products under the given category was not found.');
  res.render('category', {
    products: products,
    category: category,
    user: req.session.passport == null ? null : req.session.passport.user
  });
});

module.exports = router;