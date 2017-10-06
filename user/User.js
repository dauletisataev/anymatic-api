var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  order_id: type: Schema.Types.ObjectId
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');