const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const User = require('../models/User')

// const protect = asyncHandler(async (req, res, next) => {
//     let token;
// //authorization: 'Bearer TOKENTOKENTOKEN'
//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];

//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             req.user = await User.findById(decoded.id).select("-password")


//         } catch (error) {
//             console.log(error);
//             res.status(401);
//             throw new Error("Not authorized, wrong token");
//         }

//         if (req.user.admin || req.user.id === req.params.id) {
//             next();
//         } else {
//             throw new Error("You need to either be the user or an admin to make changes") // It's YOu and not You for debugging purposes
//         }
//     }

//     if(!token) {
//         res.status(401);
//         throw new Error("Not authorized, no token");
//     }
// })



const admin = asyncHandler(async (req, res, next) => {
  console.log('running admin!')
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, wrong token");
    }
    if (req.user.admin) {
      console.log('user is admin! admin')
      req.runProtect = false;
      next();
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});


const protect = asyncHandler(async (req, res, next) => {

  // req.runProtect ||= false
  if (!req.runProtect) {
    console.log('skipping protect')
    return next();
  }
  if (req.user.id === req.params.id) {
    next();
  } else {
    throw new Error("Only user can make changes to their profile");
  }
});


module.exports = { protect, admin };