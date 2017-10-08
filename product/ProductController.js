var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Product = require('./Product');
 
// CREATES A NEW USER
router.post('/', function (req, res) {
    var price = parseInt(req.body.price);
    Product.create({
            name : req.body.name,
            price : price ,
            photoUrl : req.body.photoUrl,
            ownerName : req.body.ownerName
        }, 
        function (err, user) {
            if (err) {
                var error = {};
                error.error = true;
                error.error_msg = "There was a problem adding the information to the database.";
                return res.status(200).send(error);
            } 
            var response = {};
            response.error = false;
            response.user = user;
            res.status(200).send(response);
        });
});
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Product.find({}, function (err, products) {

        if (err) {
            var error = {};
            error.error = true;
            error.error_msg = "There was a problem finding the users.";
           return res.status(500).send(error_msg); 
        }
        var response = {};
        response.error = false;
        response.products = products;
        res.status(200).send(response);
    });
});

//RETURNS A SINGLE USER
router.get('/:id', function (req, res) {
    Product.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, product) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("Product  was deleted.");
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