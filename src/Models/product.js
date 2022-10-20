var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


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

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);