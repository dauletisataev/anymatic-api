var express = require('express');
var app = express();
var db = require('./db'); 

const logger = require('morgan');
/*
var blockchain = require('blockchain.info')
var MyWallet = blockchain.MyWallet;*/
app.use(logger('dev'));

var UserController = require('./user/UserController');
app.use('/users', UserController);

var ProductController = require('./product/ProductController');
app.use('/products', ProductController);

var OrderController = require('./order/OrderController');
app.use('/orders', OrderController);

var login = require('./login');
app.use('/login', login);

module.exports = app;