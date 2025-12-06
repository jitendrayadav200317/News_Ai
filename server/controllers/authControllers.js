import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User is not register , please register and try again",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "password do not match",
      });
    }
    const token = jwt.sign({ id: user._id, name: user.name }, "hello-this-is", {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      message: "login successfull",
    });
  } catch (error) {
    return res.status(500).json({
      message: "save error",
      error: error.message,
    });
  }
};

export const verify = async (req, res) => {
  console.log(req.user);
  if (!req.user) {
  } else {
    return res.status(200).json({
      authenticated: true,
      id: req.user.id,
      name: req.user.id,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if ((!name, !email, !password)) {
      return res.status(400).json({
        message: "file requirement",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "user is already register plase ligin ",
      });
    }
    const hashedPasword = await bcrypt.hash(password, 12);

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
