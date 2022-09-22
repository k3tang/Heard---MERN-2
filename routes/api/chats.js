const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { admin, protect } = require("../../middleware/authMiddleware");
const Chat = require("../../models/Chats");
const User = require("../../models/User");

const getChats =  asyncHandler(async (req, res, next) => {
  const userId = req.params.userId
  const foundChats = await Chat.find({users:{ $elemMatch: {$eq: userId}}})

    res.json(foundChats);
  });

const getChat =  asyncHandler(async (req, res, next) => {
  const chat = await Chat.find(req.params.id)
  res.send(chat)
});

const accessChat = asyncHandler(async (req,res,next)=>{
    const { userId, currentUserId, mood } = req.body; 
    console.log('in back end access chat', req.body)
  
   if (!userId){
     return res.status(401).json({message: 'User Id not included or undefined or incorrectly formatted'})
   }
  let foundChat = await Chat.find({
    isGroupChat: false, $and: [ 
      {users:{ $elemMatch: {$eq: currentUserId}}},
        {users:{ $elemMatch: {$eq: userId}}}      // this check makes sure it is not a group chat and that the chat users array includes EITHER the current user OR the userID that was sent in from the front in the body. 
    ]
   }).populate('users',"-password").populate('latestMessage') 
     //once the chat is found, we set this user's id in the chat
     //below we add to the found chat the information we will need if it exists 

    foundChat = await User.populate(foundChat, {
      path: 'latestMessage.sender',
      select:'username, image,email',
    });

    if (foundChat.length > 0)   {
      res.send(foundChat[0])
    } else {
      const newChat = {
        title: 'sender',
        isGroupChat: false,
        users: [currentUserId, userId],
        mood: mood
      }
      try {
        const createdChat = await Chat.create(newChat)
        const fullChat = await Chat.findOne({_id:  createdChat.id}).populate('users', "-password")
        res.status(200).json(fullChat)
      }catch(error){
        res.status(401).json( {message: error, text: 'error from access chat back end'})
      }
    }
})

const addToChat = asyncHandler(async (req,res,next)=>{
    res.json({
        message: "PUT add a user to chat"
    });
})

const removeFromChat = asyncHandler(async (req,res,next)=>{
    res.json({
        message: "PUT remove a user from chat"
    });
})


// const editChatUsers = asyncHandler(async(req,res,next)=>{
//    res.json({
//         message: "add/remove users from chat"
//     });
// })



router.route("/:id").get(getChat);
router.route("/user/:userId").get(getChats)                 ///.put(editChatUsers)
router.route("/").post(accessChat) // accessChat needs a userId (spelled this way as the key) in the body from the front. it checks to see if that user already has a chat with that userID. if they have one then it will return that chat. else it will make a new chat.  
// router.route('/chatadd').put(addToChat)
// router.route("/chatremove").put(removeFromChat)
// router.route("/groupchat").post(createGroupChat)

module.exports = router ;