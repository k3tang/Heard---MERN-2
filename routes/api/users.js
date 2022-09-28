require("../../models/User"); // mongoose.model("User");
const { protect, admin } = require("../../middleware/authMiddleware");

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require('passport');
const { isProduction } = require('../../config/keys');

const { loginUser, restoreUser } = require("../../config/passport");
const { requireUser } = require('../../config/passport')

const asyncHandler = require("express-async-handler");

const User = mongoose.model("User");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users =  await User.find()
  res.json(users)
});

router.post('/signup', validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  })

  if (user) {
    const err = new Error("Error de validacion");
    err.statusCode = 400;
    const errors = {};
    if(user.email === req.body.email) {
      errors.email = "Ya se registro un usuario con este correo";
    }
    if(user.username === req.body.username) {
      errors.username = "Ya se registro un usuario con este nombre de usuario";
    }
    err.errors = errors;
    return next(err);
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if(err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    // debug(user, "passport user")
    if (err) return next(err);
    if (!user) {
      const err = new Error('Email or Password is Incorrect');
      err.statusCode = 400;
      err.errors = { email: "Email or Password is Incorrect" };
      err.password = { password: "Email or Password is Incorrect" }
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

// routes/api/users.js
router.get('/current', restoreUser, (req, res) => {
  // debug(user, "passport user")
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }

  if (!req.user) return res.json(null);
  res.json({
    moods: req.user.moods,
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    admin: req.user.admin
  })
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});


router.get('/:id', getUser);

const deleteUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);

  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }


  // if(req.user.admin || req.user.id === req.params.id) {
    const deletingUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletingUser);

  // } else {
    // res.status(401);
    // throw new Error("You must either be an admin or the actual user to delete the user")
    
  // }


});

router.delete('/:id', deleteUser);

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if(!user){
    res.status(400)
    throw new Error('user not found' )
  } 
  // if (req.user.admin || req.params.id === req.user.id){
  // if (req.params.password){
  // }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,
      {new: true})

  res.status(200).json(updatedUser);
 
})

router.patch('/:id', updateUser)



module.exports = router;
