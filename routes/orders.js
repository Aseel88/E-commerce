const {Order, validate} = require('../models/order'); 
const {Product} = require('../models/product'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();


// mongoose.connect('mongodb+srv://admin:A8806296581a@cluster0.jg8na.mongodb.net/myProject?retryWrites=true&w=majority');

// Fawn.init(mongoose);
 Fawn.init("mongodb://localhost:27017/myProject");

router.get('/', async (req, res) => {
    const orders = await Order.find().sort('-dateOut');
    res.send(orders);
  });
  
  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');
  
    const product = await Product.findById(req.body.productId);
    if (!product) return res.status(400).send('Invalid product.');
  
    if (product.numberInStock === 0) return res.status(400).send('Product is not in stock.');
  
    let order = new Order({ 
      customer: {
        _id: customer._id,
        name: customer.name, 
        phone: customer.phone
      },
      product: {
        _id: product._id,
        title: product.title,
        price: product.price,
        dailyOrderRate: product.dailyOrderRate
      }
    });

    try {
       new Fawn.Task()
        .save('orders', order)
        .update('products', { _id: product._id},{
            $inc: { numberInStock: -1}
        })
        .run({ useMongoose: true });
        
      res.send(order);
    }
    catch(ex) {
        res.status(500).send('Something went wrong!');
    }
  });
  
  router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) return res.status(404).send('The order with the given ID was not found.');
  
    res.send(order);
  });
  
  module.exports = router; 