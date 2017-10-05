var express = require('express');
var app = express();
var db = require('./db'); 
/*
var blockchain = require('blockchain.info')
var MyWallet = blockchain.MyWallet;*/

var UserController = require('./user/UserController');
app.use('/users', UserController);

var ProductController = require('./product/ProductController');
app.use('/products', ProductController);

var OrderController = require('./order/OrderController');
app.use('/orders', OrderController);

module.exports = app;