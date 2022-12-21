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

const { asyncWrapper } = require("../../helpers/apiHelpers");

router.get("/", asyncWrapper(listContacts));

router.get("/:id", asyncWrapper(getContactById));

router.post("/", addContactValidation, asyncWrapper(addContact));

router.put("/:id", addContactValidation, asyncWrapper(updateContact));

router.patch(
  "/id/favorite",
  patchContactFavoriteValidation,
  asyncWrapper(updateFavoriteStatus)
);

router.delete("/:id", asyncWrapper(removeContact));

module.exports = router;
