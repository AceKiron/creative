const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    banned: {
        type: Boolean,
        required: true,
        default: false
    }
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
    schema: userSchema,
    model: userModel
}