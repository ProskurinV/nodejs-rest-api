const { Contact } = require("../db/postModel");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({ contacts });
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(400).json({
      status: "No contact found",
    });
  }

  res.json({ contact, status: "succsess" });
};

const removeContact = async (req, res) => {
  const { id } = req.params;

  await Contact.findByIdAndRemove(id);

  res.json({ status: "succsess" });
};

const addContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();

  // const contact = await Contact.create(req.body);
  // res.json({ status: "success" }, { data: contact });

  res.json({ status: "success" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  await Contact.findByIdAndUpdate(
    id,
    { name, email, phone, favorite },
    { new: true }
  );
  res.json({ status: "succsess" });
};

const updateFavoriteStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    return res.status(400).json({
      status: "missing field favorite",
    });
  }

  await Contact.findByIdAndUpdate(id, { favorite }, { new: true });

  res.json({ status: "succsess" });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
};
