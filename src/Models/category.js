var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const categorySchema = new mongoose.Schema({
    id: String,
    name: String
});

categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', categorySchema);