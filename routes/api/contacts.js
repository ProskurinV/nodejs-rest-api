const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
} = require("../../controllers/contactsController");

const express = require("express");
const router = express.Router();

const {
  addContactValidation,
  patchContactFavoriteValidation,
} = require("../../middlewares/validationMiddleware");

const { auth } = require("../../middlewares/auth");

const { asyncWrapper } = require("../../helpers/apiHelpers");

router.get("/", auth, asyncWrapper(listContacts));

router.get("/:id", asyncWrapper(getContactById));

router.post("/", auth, addContactValidation, asyncWrapper(addContact));

router.put("/:id", addContactValidation, asyncWrapper(updateContact));

router.patch(
  "/:id/favorite",
  patchContactFavoriteValidation,
  asyncWrapper(updateFavoriteStatus)
);

router.delete("/:id", asyncWrapper(removeContact));

module.exports = router;
