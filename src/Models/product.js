var mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Product', productSchema);