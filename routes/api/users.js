const express = require("express");
const router = express.Router();

const {
  userRegisterValidation,
  userLoginValidation,
} = require("../../middlewares/validationMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { signup } = require("../../controllers/signup");
const { login } = require("../../controllers/login");

router.post("/signup", userRegisterValidation, asyncWrapper(signup));

router.post("/login", userLoginValidation, asyncWrapper(login));

module.exports = router;
