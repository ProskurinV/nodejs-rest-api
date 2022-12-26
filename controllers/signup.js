const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  await User.create({
    email,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      email,
      password,
    },
  });
};

module.exports = { signup };
