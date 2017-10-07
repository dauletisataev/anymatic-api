
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var User = require('./user/User');
var mongoose = require('mongoose');  

router.post('/in', (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({'email': email}, function(err, user){
        var response = {};

        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        if (err) {
            response.tag = "login";
            response.error = 1;
            response.success = 0;
            response.error_msg = "There was a problem adding the information to the database.";
            return res.status(200).send(response);
        }
         response = {};
        if (!user) {
            response.tag = "login";
            response.error = 1;
            response.success = 0;
            response.error_msg = "No user found";
            return res.status(200).send(response);
        }
         response = {};
        if(!user.validPassword(password)){
            response.tag = "login";
            response.error = 1;
            response.success = 0;
            response.error_msg = "Wrong password";
            return res.status(200).send(response);
        }
         response = {};
        response.error = false;
        response.uid = user._id;
        response.user = user;

        res.status(200).send(response);
            
    });

});


router.post('/up', (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var orderId = mongoose.Types.ObjectId();
    

   

    User.findOne({'email': email}, function(err, user){
        if (err) {
            var error = {};
            error.error = 1;
            error.error_msg = "Unknown error occurred in registration!";
            return res.status(200).send(error);;
        }
        if (user) {
            var error = {};
            error.success = 0;
            error.error = 2;
            error.error_msg = "User already existed with" + email;
            return res.status(200).send(error);;
        }

        var newUser = new User();
        newUser.email=email;
        newUser.name = name;
        newUser.password = newUser.encryptPassword(password);
        newUser.order_id = orderId;

         newUser.save(function (err, user) {
            if (err)  {
                var error = {};
                error.error = 1;
                error.err_msg = "There was a problem adding the information to the database.";
                return res.status(200).send(error);
            }
            var response = {};
            response.error = false;
            response.uid = user._id;
            response.user = user;
            res.status(200).send(response);
        });

    });

});

module.exports = router;