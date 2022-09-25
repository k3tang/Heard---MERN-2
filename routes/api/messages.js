const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Message = require('../../models/Message');
const Topic = require("../../models/Topic");
const User = require("../../models/User");
const { restoreUser} = require('../../config/passport')

const createMessage = asyncHandler(async (req, res) => {

  const { topicId, content } = req.body;
  
  const userId = req.user._id
  console.log(`hellooooo in send message back end controller. userid: ${userId}, topicId: ${topicId}, content: ${content}`)
  
  if (!topicId|| !content || !userId) {
    res.status(400);
    throw new Error("invalid date or data missing. need chat id,content, and userid");
  }
  const messageInfo ={
   sender: userId,
    content,
    topicId
  };
  console.log('message info in back', messageInfo)
  try {
    const newMessage = await Message.create(messageInfo)
    
    const fullMessage = await Message.findOne({_id : newMessage._id})
    .populate('topicId')

    const foundTopic = await Topic.findById(topicId)
    console.log(`topic is ${foundTopic}`);
    if (foundTopic){
      Topic.findByIdAndUpdate(topicId, {
        messages: [...foundTopic.messages, fullMessage._id]
      })
    res.status(200).json(fullMessage)
    }
  }catch(error) {
    console.log(error);
    res.status(401).json({message: 'problem in messages controller', error: error})
  }
});

const getAllMessages = asyncHandler(async(req, res)=>{
  // console.log(req.params.topicId)
  try {
  const messages = await Message.find({topicId: req.params.topicId})
  console.log(messages)
  res.status(200).json(messages)
} catch (error) {
res.status(400).json({message: 'error in get all messages controller'})
}
})

const deleteMessage = asyncHandler(async (req,res)=>{
  try{
    const message = await Message.findByIdAndDelete(req.params.id)
    if (message){
      res.status(200).json(message)
    }
  } catch (err){
    res.json({'error in delete message' : err})
  }
})

const editMessage = asyncHandler (async (req, res)=>{
  const { content } = req.body
    try {
      const message = await Message.findByIdAndUpdate(req.params.id,{
     body: content
      });
      if (message) {
        res.status(200).json(message);
      }
    } catch (err) {
      res.json({ "error in delete message": err });
    }
})


router.route('/').post(restoreUser, createMessage)
router.route('/:topicId').get(restoreUser, getAllMessages)
router.route("/:id").delete(restoreUser, deleteMessage).put(restoreUser, editMessage)

module.exports = router