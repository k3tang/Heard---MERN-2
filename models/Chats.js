const mongoose = require("mongoose");
const chatSchema = mongoose.Schema({
  title:{
    type: String,
    trim: true
  },
  isGroupChat :{
    type: Boolean,
    default: false
  }, // add topic as a mongoose.Schema.Types.ObjectId, ref: 'Topic'
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
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',

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