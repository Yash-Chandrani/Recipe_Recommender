const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const generateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("After signing, Generated token:", token);
  return token;
};

module.exports = { generateToken };
