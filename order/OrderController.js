var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Order = require('./Order');
 
// CREATES A NEW USER
router.post('/:id', function (req, res) {
    /*Order.create({
            user_id : req.body.user_id,
            cart: [{
                item_id: "asdfadsfasdf",
                item_name: "asdfasdfasdf",
                totalQty: 12,
                totalPrice: 3232
            }]
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });*/

    Order.findByIdAndUpdate(
        req.params.id,
        {$push: {"cart": {item_id:    req.body.item_id, name: req.body.item_name, totalQty: req.body.totalQty, totalPrice: req.body.totalPrice }}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);
        }
    );
});
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Order.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

//RETURNS A SINGLE USER
router.get('/:id', function (req, res) {
    Order.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Order.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});
module.exports = router;