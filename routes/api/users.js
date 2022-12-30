const express = require("express");
const router = express.Router();

const {
  userRegisterValidation,
  userLoginValidation,
  patchUpdateSubscValidation,
  // patchUpdateAvatarValidation,
} = require("../../middlewares/validationMiddleware");

const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { signup } = require("../../controllers/signup");
const { login } = require("../../controllers/login");
const { logout } = require("../../controllers/logout");
const { updateSubsc } = require("../../controllers/updateSubsc");
const { updateAvatar } = require("../../controllers/updateAvatar");
const { verifyEmail } = require("../../controllers/verifyEmail");

router.post("/signup", userRegisterValidation, asyncWrapper(signup));

router.post("/login", userLoginValidation, asyncWrapper(login));

router.get("/logout", auth, asyncWrapper(logout));

router.get("/verify/:verificationToken", asyncWrapper(verifyEmail));

router.patch("/", auth, patchUpdateSubscValidation, asyncWrapper(updateSubsc));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  // patchUpdateAvatarValidation,
  asyncWrapper(updateAvatar)
);

module.exports = router;
