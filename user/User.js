var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  order_id: Schema.Types.ObjectId,
  created_at: String,
  temp_password	: String,
  temp_password_time: String
});
UserSchema.methods.encryptPassword = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');