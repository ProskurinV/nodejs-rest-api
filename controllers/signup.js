const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const avatarURL = gravatar.url(email);

  await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email,
      password,
      avatarURL,
    },
  });
};

module.exports = { signup };
