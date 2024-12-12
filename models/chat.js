const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    msg: { type: String, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Chat', chatSchema);
