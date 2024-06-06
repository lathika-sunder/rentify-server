const express = require("express");
const { User } = require("../models/usersModel");
require('dotenv').config()
const jwt = require("jsonwebtoken");

const addUser = async (request, response) => {
  const { firstName, lastName, email, phone, password, role } = request.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
  });

  
  try {
    await newUser.save();

    

    response.status(201).json({ message: "User created successfully" });
  } catch (error) {
    response.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const getUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      response.status(404).json({ message: "User not found"});
    }
    if (user.password !== password) {
      response.status(404).json({ message: "Password is incorrect" });
    }
    if (user.password === password) {

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
      );
      response.status(200).json({ message: "Login successful", user: user,token:token });
    }
  } catch (error) {
    response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  addUser,
  getUsers,
  loginUser
};
