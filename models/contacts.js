const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

const Joi = require("joi");
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

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeById] = contacts.splice(idx, 1);

  async function updatedContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }

  await updatedContacts(contacts);

  return removeById;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = schema.validate({ id: randomUUID(), name, email, phone });
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  if (!newContact) {
    return null;
  }
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  contacts[index] = { ...body, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
