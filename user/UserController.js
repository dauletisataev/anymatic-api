var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');  


var passport = require('passport');
/*
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const register = require('../functions/register');
const login = require('../functions/login');
const profile = require('../functions/profile');
const password = require('../functions/password');*/

router.use(bodyParser.urlencoded({ extended: true }));
var User = require('./User');
var Order = require('../order/Order');
// CREATES A NEW USER



router.post('/', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var orderId = mongoose.Types.ObjectId();
    var newUser = new User();

    newUser.email=email;
    newUser.name = name;
    newUser.password = newUser.encryptPassword(password);
    newUser.order_id = orderId;
    newUser.isStore = req.body.isStore;
    newUser.save(function (err, user) {
            if (err)  {
                var error = {};
                error.error = 1;
                error.err_msg = "There was a problem adding the information to the database.";
                return res.status(500).send(error);
            }
            var response = {};
            response.error = false;
            response.uid = user._id;
            response.user = user;
            res.status(200).send(response);
        });
        /*User.create({
            name : req.body.name,
            email : req.body.price,
            password : User.encryptPassword(password),
            order_id : orderId
        }, 
        function (err, user) {
            if (err)  {
                var error = {};
                error.error = 1;
                error.err_msg = "There was a problem adding the information to the database.";
                return res.status(500).send(error);
            }
            response.error = false;
            responce.uid = user._id;
            response.user = user;
            res.status(200).send(response);
        });*/
    /*if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {
        res.status(400).json({message: 'Invalid Request !'});
    } else {
        register.registerUser(name, email, password, orderId)
        .then(result => {
            res.setHeader('Location', '/users/'+email);
            res.status(result.status).json({ message: result.message })
        })
        .catch(err => res.status(err.status).json({ message: err.message }));
    }*/
    

});
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {


    User.find({}, function (err, users) {
        var response = {};
        if (err) return res.status(500).send("There was a problem finding the users.");
        response.error = false;
        response.users = users;
        res.status(200).send(response);
    });
});




 
//RETURNS A SINGLE USER
router.get('/:id', function (req, res) {

    //if (checkToken(req)) {
        profile.getProfile(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(err.status).json({ message: err.message }));



    //} else {hfghfgh
   //     res.status(401).json({ message: 'Invalid Token !' });
   // }
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    
        if (checkToken(req)) {

            const oldPassword = req.body.password;
            const newPassword = req.body.newPassword;

            if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

                res.status(400).json({ message: 'Invalid Request !' });

            } else {

                password.changePassword(req.params.id, oldPassword, newPassword)

                .then(result => res.status(result.status).json({ message: result.message }))

                .catch(err => res.status(err.status).json({ message: err.message }));

            }
        } else {

            res.status(401).json({ message: 'Invalid Token !' });
        }

   /* User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });*/
});

router.post('/:id/password', (req,res) => {

    const email = req.params.id;
    const token = req.body.token;
    const newPassword = req.body.password;

    if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

        password.resetPasswordInit(email)

        .then(result => res.status(result.status).json({ message: result.message }))

        .catch(err => res.status(err.status).json({ message: err.message }));

    } else {

        password.resetPasswordFinish(email, token, newPassword)

        .then(result => res.status(result.status).json({ message: result.message }))

        .catch(err => res.status(err.status).json({ message: err.message }));
    }
});

function checkToken(req) {

    const token = req.headers['x-access-token'];

    if (token) {

        try {

            var decoded = jwt.verify(token, config.secret);

            return decoded.message === req.params.id;

        } catch(err) {

            return false;
        }

    } else {

        return false;
    }
}

module.exports = router;