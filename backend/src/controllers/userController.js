const User = require("../models/User");

// GET PROFILE
const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json(user);
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = { getProfile, updateProfile };