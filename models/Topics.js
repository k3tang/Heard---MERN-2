const mongoose = require("mongoose");

const TopicResponses = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    body: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const TopicSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    participantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }, //need to store responses? or response Id's? maybe make a responses.js?
    title: {
        type: String,
        required: true,
        minLength: 30,
        maxLength: 300
    },
    mood: {
        type: String,
        enum: ['blue', 'pink', 'green', 'yellow', 'red'],
        required: true
    },
    responses: [TopicResponses],
    persist: {
        type: Boolean,
        required: true,
        default: false  //NEED TO MAKE SURE ALL OUR SEED FILES HAVE THIS SET TO TRUE SO THAT THEY WONT AUTO DELTE. 
    },
    flagged: {
        flaggedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isFlagged: {
            type: Boolean,
            required: true,
            default: false,
        }
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Topic", TopicSchema);