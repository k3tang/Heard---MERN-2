const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { admin, protect } = require("../../middleware/authMiddleware");
const Topic = require("../../models/Topic");
const { restoreUser, isAuthorized } = require("../../config/passport");

const getAllTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find();
  return res.json(topics);
});

const getTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id).populate("messages");
  if (topic) {
    return res.status(200).json(topic);
  } else {
    res.status(401);
    throw new Error("uh oh that topic wasn't found!");
  }
});

const createTopic = asyncHandler(async (req, res) => {
  const { title, mood } = req.body;
  const userId = req.user._id;
  if (!userId || !mood || !title) {
    res.status(400);
    throw new Error("please add all fields to topic");
  }
  const topic = await Topic.create({
    userId,
    title,
    mood,
  });
  if (topic) {
    res.status(201).json(topic);
  } else {
    res.status(400);
    throw new Error(
      "Invalid data, make sure the title is between 30 and 300 characters long and that you've filled out a mood"
    );
  }
});

const editTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    res.status(400);
    throw new Error("topic not found");
  }

  if (isAuthorized(req.user, topic.userId)) {
    const updatedTopic = await Topic.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedTopic);
  }
  if (!isAuthorized(req.user, topic.userId)) {
    if (req.user._id.equals(req.body.flagged.flaggedBy)) {
      const updatedTopic = await Topic.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );

      return res.status(200).json(updatedTopic);
    } else {
      res.status(400);
      throw new Error("not authorized to edit");
    }
  }
});

const deleteTopic = asyncHandler(async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!isAuthorized(req.user, topic.userId)) {
    res
      .status(400)
      .json({ message: "Uh oh, you have to be an admin to delete this topic" });
  }
  if (!topic) {
    res.status(400);
    throw new Error("topic not found");
  }

  const deletingTopic = await Topic.findByIdAndDelete(req.params.id);
  res.status(200).json(deletingTopic);
});

const getUserTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find({ userId: req.params.id });
  if (!topics) {
    res.status(401);
    throw new Error("No topics by this user found");
  } else {
    res.status(200).json(topics);
  }
});

router.route("/").get(restoreUser, getAllTopics).post(restoreUser, createTopic);
router
  .route("/:id")
  .patch(restoreUser, editTopic)

  .delete(restoreUser, deleteTopic)
  .get(restoreUser, getTopic);
router.route("/user/:id").get(restoreUser, getUserTopics);

module.exports = router;
