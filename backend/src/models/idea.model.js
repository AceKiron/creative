const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

const ideaModel = mongoose.model("Idea", ideaSchema);

module.exports = {
    schema: ideaSchema,
    model: ideaModel
}