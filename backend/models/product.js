const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    Title: {
        type: String,
        require: true,
        },
        Price: {
            type: Number,
            require: true
            },
        ProductId: {
        type: Number,
        require: true
        },
        Img:{
            type: String,
            default: '',
        },
        Quantity: {
        type: Number,
        require: true
        },
        Description: {
        type: String,
        require: true
        },
        category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
        },
        FacialColor: {
        type: String,
        require: true
        }

})

exports.Product = mongoose.model('Product', productSchema);
