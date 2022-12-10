const mongoose = require('mongoose');
const mongoProductSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    tag: { type: String },
    rating: { type: Number },
    price: { type: Number, required: true },
    imageName: { type: String }
})

module.exports = mongoose.model("products", mongoProductSchema)