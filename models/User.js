const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        hashedPassword: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// const User = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);