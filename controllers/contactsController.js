const { Contact } = require("../models/contactModel");

const listContacts = async (req, res) => {
  const { _id } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner: _id, favorite },
    { __v: 0 },
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email");
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(400).json({
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
  const { _id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: _id });
  res.json({ status: "success", contact });
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

  if (!req.body) {
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
