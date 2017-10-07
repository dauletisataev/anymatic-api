var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  price: Number,
  photoUrl: String,
  ownerName: String
});
mongoose.model('Product', UserSchema);
module.exports = mongoose.model('Product');