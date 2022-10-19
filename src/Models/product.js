var mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    img_url: String,
    images: [String]
});

module.exports = mongoose.model('Product', productSchema);