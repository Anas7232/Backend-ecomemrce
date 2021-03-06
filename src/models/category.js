const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    categoryImage: {
        type: String
    },
    parentId: {
        type: String,
        unique: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Category', categorySchema);