var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var Order = require('./Order');
 
// CREATES A NEW USER
router.post('/:id', function (req, res) {
        var item_id = req.body.item_id;
        var name = req.body.item_name;
        var totalQty = req.body.totalQty;
        var totalPrice = req.body.totalPrice;

        console.log(item_id, name, totalQty, totalPrice);

    Order.findByIdAndUpdate( req.params.id,
        {
            $push: {"cart": {"item_id": item_id, "name": name, "totalQty": totalQty, "totalPrice": totalPrice }}
        },
        {safe: true, upsert: true, new : true},
        function (err, order) {
            if (err)  {
                var error ={};
                error.error = true;
                error.error_msg = "There was a problem inserting order.";
                return res.status(200).send(error);
            }

            var response = {};
            response.error = false;
            response.order = order;
            res.status(200).send(response);
        }
    );
});



// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    Order.find({}, function (err, orders) {

        if (err)  {
                var error ={};
                error.error = true;
                error.error_msg = "There was a problem finding orders.";
                return res.status(200).send(error);
        }

        var response = {};
        response.error = false;
        response.orders = orders;
        res.status(200).send(response);
    });
});

//RETURNS A SINGLE USER
router.get('/:id', function (req, res) {
    Order.findById(req.params.id, function (err, order) {
         
        
        if (err)  {
                var error ={};
                error.error = true;
                error.error_msg = "There was a problem finding orders.";
                return res.status(200).send(error);
        }

        if (!order){
            var error ={};
            error.error = true;
            error.error_msg = "No user found.";
            return res.status(200).send(error);   
        }
        var response = {};
        response.error = false;
        response.order = order;
        res.status(200).send(response);
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