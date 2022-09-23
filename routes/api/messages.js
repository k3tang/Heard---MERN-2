const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Chat = require("../../models/Chats");
const Message = require('../../models/Messages');
const User = require("../../models/User");
const { restoreUser} = require('../../config/passport')

const sendMessage = asyncHandler(async (req, res) => {
  console.log('hellooooo in send message back end controller')
  const { chatId, content } = req.body;
  const userId = req.user._id
  if (!chatId|| !content || !userId) {
    res.status(400);
    throw new Error("invalid date or data missing. need chat id,content, and userid");
  }
  const messageInfo ={
   sender: userId,
    content,
    chatId
  };
  console.log('message unfo in back', messageInfo)
  try {
    const newMessage = await Message.create(messageInfo)
    const fullMessage = await Message.findOne({_id : newMessage._id})
    .populate('chatId')


    await Chat.findByIdAndUpdate(chatId,{
      latestMessage: newMessage
    })
    res.status(200).json(fullMessage)
  }catch(error) {
    res.status(401).json({message: 'problem in messages controller', error: error})
  }
});

const getAllMessages = asyncHandler(async(req, res)=>{
  try {
  const messages = await Message.find({chatId: req.params.chatId})
  res.status(200).json(messages)
} catch (error) {
res.status(400).json({message: 'error in get all messages controller'})
}
})


router.route('/').post(restoreUser, sendMessage)
router.route('/:chatId').get(restoreUser, getAllMessages)

module.exports = router