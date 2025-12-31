import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";

// Login api
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User is not register , please register and try again",
      });
    }
    // password bcript
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "password do not match",
      });
    }
    // tolen  sprit => name id email
    const token = jwt.sign(
      { id: user._id, name: user.name, user: user.email },
      "hello-this-is",
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60,
    });
    res.status(200).json({
      preferences: user.preferences,
      message: "login successfull",
    });
  } catch (error) {
    return res.status(500).json({
      message: "save error",
      error: error.message,
    });
  }
};

//tokem varify
export const verify = async (req, res) => {
  console.log(req.user);
  if (!req.user) {
  } else {
    return res.status(200).json({
      authenticated: true,
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
};
// register api
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user is already register plase ligin ",
      });
    }
    // password bcript
    const hashedPasword = await bcrypt.hash(password, 12);
    // user save name , email ,password => becript
    const newUser = await User.create({ name, email, password: hashedPasword });
    res.status(201).json({
      data: newUser,
      message: "successfully register",
    });
  } catch (error) {
    return res.status(500).json({
      message: "seve error",
      error: error.message,
    });
  }
};
// google with goole api
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    //  token sprit => name email password
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log(decodedToken);
    // checl user already register by email
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      user = new User({
        name: decodedToken.name,
        email: decodedToken.email,
        password: "google-auth",
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, user: user.email },
      "hello-this-is",
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60,
    });
    res.status(200).json({
      authenticated: true,
      id: user._id,
      email: user.email,
      name: user.name,
      preferences: user.preferences || {},
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
