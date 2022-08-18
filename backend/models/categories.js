const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    Catname:{
        type: String,
        require: true
    },
    CatId:{
        type: Number,
        require: true

    }

})

exports.Category = mongoose.model('Category', categorySchema);
