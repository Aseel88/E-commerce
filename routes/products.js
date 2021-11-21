const {Product, validate} = require('../models/product'); 
const {Category} = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find().sort('name');
  const categories = await Category.find().sort('name')
  res.render('products', {            
    products: products,
    categories :categories
});
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  const product = new Product({ 
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name
    },
    numberInStock: req.body.numberInStock,
    dailyOrderRate: req.body.dailyOrderRate,
    price: req.body.price,
    imgUrl: req.body.imgUrl,
    imgDescription: req.body.imgDescription
  });
  await product.save();
  
  res.send(product);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send('Invalid category.');

  const product = await Product.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name
      },
      numberInStock: req.body.numberInStock,
      dailyOrderRate: req.body.dailyOrderRate,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      imgDescription: req.body.imgDescription
    }, { new: true });

  if (!product) return res.status(404).send('The product with the given ID was not found.');
  
  res.send(product);
});

router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  // res.send(product);
      Category.findOne({_id: req.params._id}, function(err, category) {
        res.render('product', {
          product: product,
          categorySchema :category
        });
    })
})


router.post('/search', async (req, res) => {
  let categories = await Category.find({}) 
  
  Product.find({$text: {$search: req.body.query}})
  .then(data => {
      res.render('index', {            
        products: data,
        categories: categories 
      });
  })
  .catch(err => {
    console.log(err)
    res.send('An error occured')
  })
})


module.exports = router; 