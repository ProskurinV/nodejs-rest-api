const { User } = require("../models/userModel");

const updateSubsc = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);

  const { subscription } = req.body;

  await User.findByIdAndUpdate(_id, { subscription });
  res.json({ message: "Your subscription was update" });
};

module.exports = { updateSubsc };
