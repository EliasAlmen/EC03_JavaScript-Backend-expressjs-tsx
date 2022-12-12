const mongoose = require('mongoose');
const mongoProductSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    tag: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number },
    imageName: { type: String }
})

module.exports = mongoose.model("products", mongoProductSchema)