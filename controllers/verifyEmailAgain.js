const { User } = require("../models/userModel");
const { sendEmail } = require("../helpers/sendEmail");

const verifyEmailAgain = async (req, res) => {
  const { email } = req.body;
  const { verificationToken } = req.params;

  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ verify: true });

  if (user) {
    res.status(400).json({ message: "Verification has already been passed" });
  }

  const mail = {
    to: email,
    subject: "Email confirmation",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Push to confirme</a>`,
  };

  await sendEmail(mail);
};

module.exports = { verifyEmailAgain };
