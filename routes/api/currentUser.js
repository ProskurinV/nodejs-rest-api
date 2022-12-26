const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { getCurrent } = require("../../controllers/currentUserController");

const { auth } = require("../../middlewares/auth");

router.get("/current", auth, asyncWrapper(getCurrent));

module.exports = router;
