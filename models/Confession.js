const mongoose = require("mongoose");
const confessionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    mood :{
        type: String,
        enum: {values: ['angry', 'loved', 'anxious', 'happy', 'sad'], message: "Please make sure that you selected one of the emotions in the dropdown"},
        required: true
    },
    body :{
        type: String,
        required: true,
        minLength: [3, "Your confession needs to be at least 3 characters long"],
        maxLength: [300, "Your confession can only be a maximum of 300 characers long"]
    },
    persist :{
        type: Boolean,
        required: true,
        default: false  //NEED TO MAKE SURE ALL OUR SEED FILES HAVE THIS SET TO TRUE SO THAT THEY WONT AUTO DELTE. 
    },
    flagged : {
        flaggedBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isFlagged :{
            type: Boolean,
            required: true,
            default: false,
        } 
    }

}, {
    timestamps: true
})
module.exports = mongoose.model("Confession", confessionSchema);

//notes: when a user flags a post three things need to happen: the flagged user has to have the flagged confession id added to the array of flagged posts every user has, the flagged confession has to persist: true, but hidden: true 
// the user who flagged the confression has to get added to the confession.flagged.flaggedBy
// all shares need to be checked for being flagged before displayed