const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    name: String,
    price: String

})

exports.Orders = mongoose.model('Orders', ordersSchema);
