const mongoose = require('mongoose')
const productGraphQLSchema = mongoose.Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: mongoose.Schema.Types.String },
        price: { type: mongoose.Schema.Types.String },
        tag: { type: mongoose.Schema.Types.String },
        category: { type: mongoose.Schema.Types.String },
        description: { type: mongoose.Schema.Types.String },
        rating: { type: mongoose.Schema.Types.String },
        imageName: { type: mongoose.Schema.Types.String },
    }
)

module.exports = mongoose.model("ProductGraphQL", productGraphQLSchema)