const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Chat = require("../../models/Chats");
const Message = require('../../models/Messages');
const User = require("../../models/User");

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content, userId } = req.body;
  if (!chatId|| !content || !userId) {
    res.status(400);
    throw new Error("invalid date or data missing. need chat id,content, and userid");
  }
  const messageInfo ={
   sender: userId,
    content,
    chatId
  };
  try {
    const newMessage = await Message.create(messageInfo)
    newMessage =  await newMessage.populate('sender', 'name image') //might need .execPopulate()this is because we're calling populate on an instance of the class and not on the message class itself
    newMessage = await newMessage.populate('chat')
    newMessage = await User.populate(newMessage, {
      path: 'chat.users',
      select: 'username image email'
    })

    await Chat.findByIdAndUpdate(req.body.chatId,{
      latestMessage: newMessage
    })
    res.status(200).json(newMessage)
  }catch(error) {
    res.status(401).json({message: 'problem in messages controller'})
  }
});

const getAllMessages = asyncHandler(async(req, res)=>{
  try {
  const messages = await Message.find({chatId: req.params.chatId}).populate('sender', 'username image email').populate('chat')
  res.status(200).json(messages)
} catch (error) {
res.status(400).json({message: 'error in get all messages controller'})
}
})


router.route('/').post(sendMessage)
router.route('/:chatId').get(getAllMessages)

module.exports = router