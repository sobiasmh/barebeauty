const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },

      userId: {
        type: String,
        required: true,
      },
      productId:{
        type: String,
        required: true,
      },
    


})

exports.WishList = mongoose.model('WishList', wishListSchema);
