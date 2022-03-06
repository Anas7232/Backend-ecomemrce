const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    productPicture: [
        {
            img: { type: String }
        }
    ],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    craetedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);