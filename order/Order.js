var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var OrderSchema = new mongoose.Schema({  
  user_id: String,
  cart: [
  	{
  		item_id: String,
  		item_name: String,
  		totalQty: Number,
  		totalPrice: Number
  	}
  ]
});
mongoose.model('Order', OrderSchema);
module.exports = mongoose.model('Order');