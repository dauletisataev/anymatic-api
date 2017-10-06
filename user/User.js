var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  order_id: {type: Schema.Types.ObjectId, ref: 'Order'}
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');