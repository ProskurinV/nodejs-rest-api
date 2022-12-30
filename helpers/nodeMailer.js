// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "vovanfix@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "motaka3256@prolug.com",
//   from: "vovanfix@meta.ua",
//   subject: "New order",
//   html: "<p>Get new order</p>",
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
