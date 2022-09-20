const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { admin, protect } = require("../../middleware/authMiddleware");
const Topic = require('../../models/Topics')
const {restoreUser} = require('../../config/passport')

const getAllTopics = asyncHandler(async (req, res) => {
    console.log('req.user', req.user)
    const topics = await Topic.find()
    return res.json(topics);
})

const createTopic = asyncHandler(async (req, res) => {
    const { ownerId, title, mood } = req.body;
    if (!ownerId || !mood || !title) {
        res.status(400);
        throw new Error('please add all fields to topic');
    }
    const topic = await Topic.create({
        ownerId, title, mood
    })
    if (topic) {
        res.status(201).json(topic);
    } else {
        res.status(400);
        throw new Error('Invalid data, make sure body length is over 30 and all fields exist');
    }
});

const editTopic = asyncHandler(async (req, res) => {
    const confession = Confession.findById(req.params.id)
    if (!confession) {
        res.status(400)
        throw new Error('confession not found')
    }
    if (req.params.id === req.user.id) {
        const updatedConfession = await Confession.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.status(200).json(updatedConfession);
    } else {
        res.status(401);
        throw new Error('you must be an admin or author of confession to edit')
    }
})

const deleteTopic= asyncHandler(async (req, res) => {
    const topic = Topic.findById(req.params.id);
    if (!topic) {
        res.status(400);
        throw new Error("topic not found");
    }

    if ( req.user.id === req.params.id) {
       
            const deletingConfession = await Confession.findByIdAndDelete(req.params.id);
            res.status(200).json(deletingConfession);
        
    } else {
        res.status(401);
        throw new Error(
            "You must either be an admin confession author to delete confession"
        );
    }

})

const getUserTopics = asyncHandler(async (req, res) => {
    const confessions = await Confession.find({ userId: req.params.id })
    if (!confessions) {
        res.status(401);
        throw new Error('No confessions by this user found')
    } else {
        res.status(200).json(confessions);
    }
})



const addResponse = () =>{
return true
}

// router
//   .route("/")
//   .get(getAllConfessions)
//   .post(admin, protect, createConfession);
router
  .route("/")
  .get(restoreUser, getAllTopics)
  .post(createTopic);
router
    .route("/:id")
    .put( editTopic)
    // .post(pushTopicResponse)
    .delete(deleteTopic);
router.route("/user/:userId").get( getUserTopics);// this is api/confessions/userId and will get all confessions by user Id
router.route("/addResponse/:topicId").post(addResponse)
//addResponse needs: the topic id in the wildcard, 
//{body: "user response blah"} in the body of the request.
// {userId : banana } in the body of the request. this is the user sending the post 
module.exports = router;