const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!user || !passCompare || !user.verify) {
    res
      .status(401)
      .json({ message: "Email or password is wrong or not verify" });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user.id, { token });
  res.json({ token });
};

module.exports = {
  login,
};
