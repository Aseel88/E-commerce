const error = require('./middleware/error');
const config = require('config');
const path = require('path');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const { Category, categorySchema } = require('./models/category');
const { Product } = require('./models/product');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { required } = require('joi/lib/types/lazy');
require('./config/passport')(passport)
const app = express();


const categories = require('./routes/categories');
const registration = require('./routes/registration');
const customers = require('./routes/customers');
const products = require('./routes/products');
const orders = require('./routes/orders');
const users = require('./routes/users');
const auth = require('./routes/auth');
const about = require('./routes/about');
const contact = require('./routes/contact');
const login = require('./routes/login');
const logout = require('./routes/logout');
const cart = require('./routes/cart');


// Static files
app.use(express.static(path.join(__dirname, '/public')));
app.use("/assets", express.static(__dirname + "/assets"));
// app.use('/assets', express.static(path.join(__dirname,'/assets')))

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined. ');
  process.exit(1);
}

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.jg8na.mongodb.net/myProject?retryWrites=true&w=majority`)
  .then(() => console.log('Database connection successful...'))
  .catch(err => console.error('Database connection error...', err));

app.use(bodyParser.urlencoded({ extended: true }));




// app.use(express.static(__dirname + '/public'))

// Views
app.set('views', './views')
app.set('view engine', 'ejs')


app.use(express.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/categories', categories);
app.use('/api/registration', registration);
app.use('/api/customers', customers);
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/about', about);
app.use('/api/contact', contact);
app.use('/api/login', login);
app.use('/api/logout', logout);
app.use('/api/cart', cart);

app.use(error);


app.get('/', (req, res) => {
  Category.find({}, function (err, categories) {
    Product.find({}, function (err, products) {
      res.render('index', {
        products: products,
        categories: categories,
        user: req.session.passport == null ? null : req.session.passport.user
      });
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on http:localhost:${port}...`));

module.exports = app;