const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "MySuperSecretKeyHere", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
