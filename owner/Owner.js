var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String
});
mongoose.model('Owner', UserSchema);
module.exports = mongoose.model('Owner');