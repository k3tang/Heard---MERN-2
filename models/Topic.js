const mongoose = require("mongoose");

const TopicSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        minLength: 15,
        maxLength: 60
    },
    mood: {
        type: String,
        enum: ['angry', 'loved', 'anxious', 'happy', 'sad'],
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Topic", TopicSchema);
