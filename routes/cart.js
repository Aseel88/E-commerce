const { Cart, Item } = require('../models/cart')
const { Category } = require('../models/category');
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    let cart = await Cart.find({ customer: req.session.user.id })

    if (cart) {
        let { productId, quantity, price } = req.body
        let new_item = { productId, quantity, price }
        cart.items.push(new_item)

        let data = await cart.save()
        res.send({ data })
    }
})


router.get('/', async (req, res) => {
    try {
        Category.find({}, function (err, categories) {
            Product.find({}, function (err, products) {
                res.render('basket', {
                    products: products,
                    categories: categories,
                    s_products:JSON.stringify(products)
                });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
});




module.exports = router;