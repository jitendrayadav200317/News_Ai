import User from "../model/User.js";

export const preferences = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences } = req.body;
    const user = await User.findById(id)
    user.preferences= [...preferences];
    user.preferences=[...user.preferences,...preferences];
    await user.save();
    res.status(200).json({
      message:"preference save"
    })
  } catch (error) {}
};
