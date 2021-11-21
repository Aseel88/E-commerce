const Joi = require('joi');
const mongoose = require('mongoose');

let ItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
   
})

const CartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    items: [ItemSchema],
    total: {
        default: 0,
        type: Number
    }
})


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

const Cart = mongoose.model('Cart', CartSchema);
const Item = mongoose.model('Item', ItemSchema);

exports.Cart = Cart;
exports.Item = Item;