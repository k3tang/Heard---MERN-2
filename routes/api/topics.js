const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { admin, protect } = require("../../middleware/authMiddleware");
const Topic = require('../../models/Topic')
const {restoreUser} = require('../../config/passport')

const getAllTopics = asyncHandler(async (req, res) => {
    const topics = await Topic.find()
    return res.json(topics);
})

const getTopic = asyncHandler(async (req,res) => {
    const topic = await Topic.findById(req.params.id).populate('messages');
   if (topic){
    return res.status(200).json(topic)
   } else{
    res.status(401)
    throw new Error("uh oh that topic wasn't found!")
   }
})

const createTopic = asyncHandler(async (req, res) => {
    const { title, mood } = req.body;
    const userId = req.user._id
    if (!userId || !mood || !title) {
        res.status(400);
        throw new Error('please add all fields to topic');
    }
    const topic = await Topic.create({
        userId, title, mood
    })
    if (topic) {
        res.status(201).json(topic);
    } else {
        res.status(400);
        throw new Error('Invalid data, make sure the title is between 30 and 300 characters long and that you\'ve filled out a mood');
    }
});


const editTopic = asyncHandler(async (req, res) => {
    const topic = Topic.findById(req.params.id)
    if (!topic) {
        res.status(400)
        throw new Error('topic not found')
    }
    // if (req.params.id === req.user.id) {
        const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json(updatedTopic);
    // } else {
        // res.status(401);
        // throw new Error('you must be an admin or author of confession to edit')
    // }
})

const deleteTopic = asyncHandler(async (req, res) => {
    const topic = Topic.findById(req.params.id);
    if (!topic) {
        res.status(400);
        throw new Error("topic not found");
    }

    // if ( req.user.id === req.params.id) {
       
            const deletingTopic = await Topic.findByIdAndDelete(req.params.id);
            res.status(200).json(deletingTopic);
        


})

const getUserTopics = asyncHandler(async (req, res) => {
    const topics = await Topic.find({ userId: req.params.id })
    if (!topics) {
        res.status(401);
        throw new Error('No topics by this user found')
    } else {
        res.status(200).json(topics);
    }
})



// const addResponse = asyncHandler(async (req, res) => {
//     const topic = await Topic.findById(req.params.topicId);
//     const { userId, body} = req.body;
//     if (!topic) {
//         res.status(400);
//         throw new Error("topic not found");
//     }
//     if(!userId) {
//         res.status(400);
//         throw new Error('Missing a user for your response');
//     }
    
//     if (!body) {
//         res.status(400);
//         throw new Error('please make sure you typed in a response body');
//     }

    // const newResponse = {userId, body }

    // const newResponse = TopicResponse.create(userId, body);

//     if (newResponse) {
//         res.status(201).json(newResponse); // return back latest response
//     } else {
//         res.status(400);
//         throw new Error('Could not create a topic response');
//     }

//     topic.responses = [...topic.responses, newResponse ]

//     await topic.save()
    

// });

// router
//   .route("/")
//   .get(getAllConfessions)
//   .post(admin, protect, createConfession);
router
  .route("/")
  .get(restoreUser, getAllTopics)
  .post(restoreUser, createTopic);
router
    .route("/:id")
    .put(editTopic)
    // .post(pushTopicResponse)
    .delete(deleteTopic)
    .get(getTopic)
router.route("/user/:id").get(restoreUser, getUserTopics);// this is api/confessions/userId and will get all confessions by user Id
// router.route("/addResponse/:topicId").post(addResponse)
//addResponse needs: the topic id in the wildcard, 
//{body: "user response blah"} in the body of the request.
// {userId : banana } in the body of the request. this is the user sending the post 

//WHEN ADDING A RESPONSE: route will return just the added response so it can be added to the state, 
module.exports = router;