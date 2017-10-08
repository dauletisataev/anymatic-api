var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var OrderSchema = new mongoose.Schema({ 
  cart: [
  	{
  		created_at: { type: Date, default: Date.now },
  		totalQty: Number,
  		totalPrice: Number,
  		items:[
  			{
  				name: String,
  				price: Number,
  				count: Number
  			}
  		]
  	}
  ]
});
mongoose.model('Order', OrderSchema);
module.exports = mongoose.model('Order');