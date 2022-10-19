var mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    id: String,
    name: String
});

const Category = mongoose.model('Category', categorySchema);