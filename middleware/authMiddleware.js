const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const User = require('../models/User')



const admin = asyncHandler(async (req, res, next) => {

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
   
      res.status(401);
      throw new Error("Not authorized, wrong token");
    }
    if (req.user.admin) {
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
    return next();
  }
  if (req.user.id === req.params.id) {
    next();
  } else {
    throw new Error("Only user can make changes to their profile");
  }
});


module.exports = { protect, admin };