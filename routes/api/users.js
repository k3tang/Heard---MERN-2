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


const User = mongoose.model("User");

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users =  await User.find()
  res.json(users);
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

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

// routes/api/users.js
router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();

    res.cookie("CSRF-TOKEN", csrfToken);
  }
  // console.log(req.user);
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
})

module.exports = router;
