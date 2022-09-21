const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
  title:{
    type: String,
    trim: true
  },
  isGroupChat :{
    type: Boolean,
    default: false
  },
  users : [{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  latestMessage: {
   type:mongoose.Schema.Types.ObjectId,
   ref: 'Message'
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       //need to set a defaut admin user 
  },
     mood: {
        type: String,
        enum: ['blue', 'pink', 'green', 'yellow', 'red'],
        required: true
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
},
{
  timestamps: true
}

);

module.exports = mongoose.model('Chat', chatSchema);