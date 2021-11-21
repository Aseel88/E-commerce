const Joi = require('joi');
const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
              type: String,
              required: true,
              minlength: 3,
              maxlength: 50
            },
            isGold: {
              type: Boolean,
              default: false
            },
            phone: {
              type: String,
              required: true,
              minlength: 5,
              maxlength: 50
            }
          }),
          required: true
    },
    product: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },           
            dailyOrderRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            },
            price: {
                type: Number,
                required: true,
                min: 0        
            }
        }),
            required: true        
    },
    dateOut: {
        type: Date,
        required: true,
        dafault: Date.now
    },
    orderFee: {
        type: Number,
        min: 0
    }
}));

function validateOrder(order) {
    const schema =  
        {
        customerId: Joi.objectId().required(),
        productId: Joi.objectId().required()
    };    

    return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validate = validateOrder;