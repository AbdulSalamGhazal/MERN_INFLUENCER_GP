const jwt = require("jsonwebtoken");
const Influencer = require("../models/influencer");
const Business = require("../models/business");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      type = req.headers.authorization.split(" ")[2];

      const decoded = jwt.verify(token, "MySuperSecretKeyHere");
      if (type === "Influencer") {
        req.user = await Influencer.findById(decoded.id).select("-password");
        req.user.type = "Influencer";
      } else if (type === "Business") {
        req.user = await Business.findById(decoded.id).select("-password");
        req.user.type = "Business";
      } else {
        throw new Error();
      }
      next();
    } catch (error) {
      res.status(401);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token, Not authorized, no token");
  }
});

module.exports = { protect };
