const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const express = require("express");
const router = express.Router();

// const { randomUUID } = require("crypto");

// const Joi = require("joi");
// const schema = Joi.object({
//   name: Joi.string().alphanum().min(3).max(30).required(),
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     })
//     .required(),
//   phone: Joi.number().required(),
// });

router.get("/contacts", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {}
});

router.get("/contacts/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "User wasn`t found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/contacts", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required name field" });
    }
    // const newContact = {
    //   id: randomUUID(),
    //   name,
    //   email,
    //   phone,
    // };
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/contacts/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const contacts = await listContacts();

    const filteredContacts = contacts.filter(
      (contact) => String(contact.id) !== id
    );

    if (filteredContacts.length === contacts.length) {
      return res.status(404).json({ message: "Contact wasn`t found" });
    }
    await removeContact(filteredContacts);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/contacts/:id", async (req, res, next) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const body = {
    name,
    email,
    phone,
  };

  if (!body) {
    res.status(400).json({ message: "missing required field" });
  }
  const updatedContact = await updateContact(id, body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact wasn`t found" });
  }
});

module.exports = router;
