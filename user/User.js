var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  order_id: Schema.Types.ObjectId,
  isStore: Boolean
});
UserSchema.methods.encryptPassword = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');