
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var User = require('./user/User');


router.post('/', (req, res) => {

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
            return res.status(500).send(response);
        }
         response = {};
        if (!user) {
            response.tag = "login";
            response.error = 1;
            response.success = 0;
            response.error_msg = "No user found";
            return res.status(500).send(response);
        }
         response = {};
        if(!user.validPassword(password)){
            response.tag = "login";
            response.error = 1;
            response.success = 0;
            response.error_msg = "Wrong password";
            return res.status(500).send(response);
        }
         response = {};
        response.error = false;
        response.uid = "dasdasdasdasd";
        response.user = "adasdasdasdasd";

        res.status(200).send(response);
            
    });

});

module.exports = router;