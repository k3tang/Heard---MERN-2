const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { admin, protect } = require("../../middleware/authMiddleware");

router.get('/', function(req, res, next) {
    res.json({
        message: "GET /api/confessions"
    });
});

const getAllConfessions = asyncHandler(async (req, res) => {
    const confessions = await Confession.find()
    return res.json(confessions);
})

const createConfession = asyncHandler(async (req, res) => {
    const { userId, mood, body } = req.body;
    if (!userId || !mood || !body) {
        res.status(400);
        throw new Error('please add all fields to confession');
    }
    const confession = await Confession.create({
        userId, mood, body
    })
    if (confession) {
        res.status(201).json(confession);
    } else {
        res.status(400);
        throw new Error('Invalid data, make sure body length is over 30 and all fields exist');
    }
});


const editConfession = asyncHandler(async (req, res) => {
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

const deleteConfession = asyncHandler(async (req, res) => {
    const confession = Confession.findById(req.params.id);
    if (!confession) {
        res.status(400);
        throw new Error("confession not found");
    }

    if ( req.user.id === req.params.id) {
        if (confession.persist) {
            res.status(200).json({ message: "Seed confession recycled" });
        } else {
            const deletingConfession = await Confession.findByIdAndDelete(req.params.id);
            res.status(200).json(deletingConfession);
        }
    } else {
        res.status(401);
        throw new Error(
            "You must either be an admin confession author to delete confession"
        );
    }

})

const getUserConfessions = asyncHandler(async (req, res) => {
    const confessions = await Confession.find({ userId: req.params.id })
    if (!confessions) {
        res.status(401);
        throw new Error('No confessions by this user found')
    } else {
        res.status(200).json(confessions);
    }
})

const getConfessionsByMoods = asyncHandler(async (req, res) => {
    const { moods } = req.body
    const confessions = Confession.find({ mood: { "$in": moods } }) //moods should be an array 
    if (!confessions) {
        res.status(401)
        throw new Error('No confessions match these mood preferences')
    } else {
        res.status(200).json(confessions)
    }
})


// router
//   .route("/")
//   .get(getAllConfessions)
//   .post(admin, protect, createConfession);
router
    .route("/:id")
    .put(admin, protect, editConfession)
    .delete(admin, protect, deleteConfession);
router.route("/color").get(getConfessionsByMoods); // needs an array of moods in the body like moods: `${user.moods}`
router.route("/user/:userId").get(admin, protect, getUserConfessions);// this is api/confessions/userId and will get all confessions by user Id

module.exports = router;