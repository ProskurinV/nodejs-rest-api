const { User } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uuid = require("uuid");

const { sendEmail } = require("../helpers/sendEmail");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  const verificationToken = uuid();

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const avatarURL = gravatar.url(email);

  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Push to confirme</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      password,
      avatarURL,
      verificationToken,
    },
  });
};

module.exports = { signup };
