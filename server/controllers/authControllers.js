import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();
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
    //  password chack
    if (!isMatch) {
      return res.status(401).json({
        message: "password do not match",
      });
    }
    // tolen  sprit => name id email
    const token = jwt.sign(
      { id: user._id, name: user.name, user: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
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
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ authenticated: false, message: "unauthorize" });
    }
    return res.status(200).json({
      authenticated: true,
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({
      message: "Internal Server Error.",
      error: error.message,
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

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    // Verify Google token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    let user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      user = await User.create({
        name: decodedToken.name,
        email: decodedToken.email,
        password: crypto.randomUUID(), // placeholder (won’t be used)
        preferences: [],
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie (15 days)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      authenticated: true,
      id: user._id,
      email: user.email,
      name: user.name,
      preferences: user.preferences || [],
      message: "Login successful",
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(401).json({ message: "Google authentication failed" });
  }
};
