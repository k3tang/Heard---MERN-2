const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
// const { default: Topic } = require("../../frontend/src/components/TopicIndex/Topic");
const { admin, protect } = require("../../middleware/authMiddleware");
const Chat = require("../../models/Chats");
const User = require("../../models/User");
const Topic = require("../../models/Topic")
const { isProduction } = require("../../config/keys")
const { restoreUser } = require("../../config/passport")


const getChats =  asyncHandler(async (req, res, next) => {
  const userId = req.user._id
  const foundChats = await Chat.find({users:{ $in: [userId]}})
  console.log('are we finding the cchats',foundChats, userId)
    res.json(foundChats);
  });

const getChat =  asyncHandler(async (req, res, next) => {
  const chat = await Chat.find(req.params.id)
  res.send(chat)
});

const accessChat = asyncHandler(async (req,res,next)=>{
    const { userId, currentUserId, topicId } = req.body; 
    // console.log('in back end access chat', req.body)
  
   if (!userId){
     return res.status(401).json({message: 'User Id not included or undefined or incorrectly formatted'})
   }
  let foundChat = await Chat.find({topicId :topicId}).populate('users',"-password").populate('latestMessage') 
     //once the chat is found, we set this user's id in the chat
     //below we add to the found chat the information we will need if it exists 

    foundChat = await User.populate(foundChat, {
      path: 'latestMessage.sender',
      select:'username image email',
    });

    if (foundChat.length > 0)   {
      res.send(foundChat[0])
    } else {
      const topic = await Topic.findById(topicId)
      console.log('topic in else statement', topic, topicId)
      const newChat = {
        title: topic.title,
        isGroupChat: false,
        users: [currentUserId, userId],
        topicId: topicId
      }
      try {
        const createdChat = await Chat.create(newChat)
        const fullChat = await Chat.findOne({_id:  createdChat._id}).populate('users', "topic", "-password")
        res.status(200).json(fullChat)
      }catch(error){
        res.status(401).json( {message: error, text: 'error from access chat back end'})
      }
    }
})

const deleteChat = asyncHandler(async (req,res) =>{

  try {
   const chat = await Chat.findByIdAndDelete(req.params.id);
  
    res.status(200).json(chat)
   }catch(err){
    res.status(400)
    console.log('error from delete', err)
   }
   
})

const allChats = asyncHandler(async (req, res, next) => {
  const chats = await Chat.find();
  res.json(chats);
});


if (!isProduction) router.route('/allchats').get(restoreUser, allChats)
router.route("/:id").get(getChat).delete(restoreUser, deleteChat)
router.route("/user/:userId").get(restoreUser, getChats)                 ///.put(editChatUsers)
router.route("/").post(restoreUser, accessChat) // accessChat needs a userId (spelled this way as the key) in the body from the front. it checks to see if that user already has a chat with that userID. if they have one then it will return that chat. else it will make a new chat.  
// router.route('/chatadd').put(addToChat)
// router.route("/chatremove").put(removeFromChat)
// router.route("/groupchat").post(createGroupChat)

module.exports = router ;