const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  sender:{
        type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
  },
  content:{
    type: String, 
    trim:true
  },
  topicId: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Topic',
  }
},{
  timestamps: true,
})

module.exports = mongoose.model('Message', messageSchema);