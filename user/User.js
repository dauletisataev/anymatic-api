var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  order_id: Schema.Types.ObjectId,
  created_at: String,
  temp_password	: String,
  temp_password_time: String
});
mongoose.Promise = global.Promise;
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');