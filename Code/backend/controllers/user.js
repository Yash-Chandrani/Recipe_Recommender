const express = require("express");
const User = require("../models/user");
const { generateToken } = require("../utils/generateToken");
const { authenticateToken } = require("../utils/auth");
const Error = require("../errors/error");


const signUpGet = async (req, res) => {
  try {
    res.status = 200;
    res.send("Sign up page");
  } catch (err) {
    throw new Error.NotFoundError("Sign up page not found. Try again");
  }
};

const signUpPost = async (req, res) => {
  try {
    console.log(req.body.username)
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
      throw new Error.CustomAPIError("User already exists", 409);
    }
    const user = User.create({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      let token = generateToken(req.body.username);
      return res
        .status(200)
        .json({ message: "You have been signed up successfully" });
    } else {
      throw new Error.BadRequestError("Invalid user data");
    }
  } catch (err) {
    throw err;
  }
};

const signInGet = async (req, res) => {
  try {
    res.send("Sign in page");
  } catch (err) {
    throw new Error.NotFoundError("Sign in page not found. Try again");
  }
};

const signInPost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log("user:", user);

    if (user) {
      const isPasswordValid = await user.matchPassword(req.body.password);
      debugger;
      console.log("isPasswordValid:", isPasswordValid)

      if (isPasswordValid) {
        const token = await generateToken(req.body.username);
        console.log("Setting cookie with token:", token);
        const expiresIn = 60 * 60 * 24 * 7; // One week
        const expires = new Date(Date.now() + expiresIn);
        res.cookie("token", token, {expires, });  // Set the cookie after generating the token
        console.log("Cookie set: ",res.get( "Set-Cookie" ));
        return res.status(200).json({ message: "You have been logged in successfully", token, username: req.body.username });
      } else {
        return res.status(400).json({ error: "Incorrect username or password" });
      }
    } else {
      return res.status(400).json({ error: "Incorrect username or password" });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



const signOutGet = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "You have been logged out successfully" });
  } catch (err) {
    throw new Error.CustomAPIError("Something went wrong");
  }
};


const userProfileGet = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(200).send(user);
    } else {
      throw new Error.NotFoundError("No such user found");
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  signInGet,
  signInPost,
  signUpGet,
  signUpPost,
  signOutGet,
  userProfileGet,
};
