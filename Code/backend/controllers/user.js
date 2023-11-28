const express = require("express");
const User = require("../models/user");
const { generateToken } = require("../utils/generateToken");
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

    if (user) {
      const isPasswordValid = await user.matchPassword(req.body.password);

      if (isPasswordValid) {
        const token = generateToken(req.body.username);
        return res.status(200).json({ message: "You have been logged in successfully", token });
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
    return res
      .status(200)
      .json({ message: "You have been logged out successfully" });
  } catch (err) {
    throw Error.CustomAPIError("Something went wrong");
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

const getCollection = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json({ids:user.collection});
    } else {
      throw new Error.NotFoundError("No such user found");
    }
  } catch (error) {
    console.error("Error getting user's collection:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToCollection = async (req, res) => {
  try {
    console.log(req.body)
    const userId = req.body.userId;
    const recipe = req.body.recipe;
    const updatedDocument = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { collection: recipe } },
      { new: true }
    );
    if (updatedDocument) {
      console.log('Updated User colection');
    } else {
      console.log('User not found');
    }
    return res.status(200).json(updatedDocument.collection);
  } catch (error) {
    console.error("Error adding to collection:", error);
    return res.status(500).json({ error: "Internal Server Error" , req: req});
  }
};

module.exports = {
  signInGet,
  signInPost,
  signUpGet,
  signUpPost,
  signOutGet,
  userProfileGet,
  getCollection,
  addToCollection,
};
