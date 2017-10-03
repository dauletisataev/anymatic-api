var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  price: Number,
  photoUrl: String,
  ownerId: String
});
mongoose.model('Product', UserSchema);
module.exports = mongoose.model('Product');