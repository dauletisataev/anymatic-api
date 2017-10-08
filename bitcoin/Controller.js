var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');  

var passport = require('passport');


var Client = require('coinbase').Client;

var client = new Client({
  'apiKey': 'y6Mfm6JkXtyvwgKu',
  'apiSecret': 'WiJKzr38tlcmWCVS7hvyhNqngvV8hkL7',
  'version':'2017-10-07'
});

client.getAccounts({}, function(err, accounts) {
  accounts.forEach(function(acct) {
    console.log(acct.name + ': ' + acct.balance.amount + ' ' + acct.balance.currency);
    acct.getTransactions(null, function(err, txns) {
      txns.forEach(function(txn) {
        console.log('txn: ' + txn.id);
      });
    });
  });
});

module.exports = router;