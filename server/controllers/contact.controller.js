import Contact from "../models/contact.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    return res.status(201).json(contact);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const docs = await Contact.find().exec();
    return res.json(docs);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const read = (req, res) => {
  return res.json(req.contact);
};

const update = async (req, res) => {
  try {
    let contact = req.contact;
    contact = extend(contact, req.body);
    await contact.save();
    return res.json(contact);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await req.contact.deleteOne();
    return res.json({ message: "Contact deleted", deleted });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    return res.json({ message: "All contacts removed", result });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const contactByID = async (req, res, next, id) => {
  try {
    const doc = await Contact.findById(id).exec();
    if (!doc) return res.status(404).json({ error: "Contact not found" });
    req.contact = doc;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve contact" });
  }
};

export default { create, list, read, update, remove, removeAll, contactByID };
