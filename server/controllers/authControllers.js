import User from "../model/User.js";

export const login = () => {};

export const register = async (req, res) => {
  const { name, password, email } = req.body;   //fatch data
  const user = await User.findOne({ email });   // check if user is already register
  if (user) {
    return res.status(404).json({
      message: "User is already register plase login",
    });
  }
  const newUser = await User.create({name,password, email});  //register newUser
  res.status(201).json({
    data: newUser,
    massage : "successfully register"
  })
};


