const mongoose = require('mongoose');
const mongoUsersSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: [true, 'name?'], unique: true},
    password: { type: String, required: [true, 'password?'] }
})

module.exports = mongoose.model("users", mongoUsersSchema)