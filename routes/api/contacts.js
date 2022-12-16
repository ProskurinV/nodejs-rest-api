const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {}
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "User wasn`t found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().required(),
    });
    const validationSchema = schema.validate(req.body);
    if (validationSchema.error) {
      return res.status(400).json({
        message: "missing required field",
      });
    }
    const body = {
      name,
      email,
      phone,
    };

    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    phone: Joi.number().optional(),
  });

  const validationSchema = schema.validate(req.body);
  if (validationSchema.error) {
    return res.status(400).json({
      message: "missing required fields",
    });
  }

  const body = {
    name,
    email,
    phone,
  };

  const updatedContact = await updateContact(id, body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact wasn`t found" });
  }
  res.status(200).json(updatedContact);
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeContact(id);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
