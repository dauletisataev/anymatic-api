var mongoose = require('mongoose');  
var OrderSchema = new mongoose.Schema({  
  user: Schema.Types.ObjectId,
  cart: [
  	{
  		item_id: String,
  		item_name: String,
  		totalQty: Number,
  		totalPrice: Number
  	}
  ]
});
mongoose.model('Product', UserSchema);
module.exports = mongoose.model('Product');