import Education from "../models/education.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const education = new Education(req.body);
  try {
    await education.save();
    return res.status(201).json(education);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const list = async (req, res) => {
  try {
    const docs = await Education.find().exec();
    return res.json(docs);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const read = (req, res) => res.json(req.education);

const update = async (req, res) => {
  try {
    let education = req.education;
    education = extend(education, req.body);
    await education.save();
    return res.json(education);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await req.education.deleteOne();
    return res.json({ message: "Qualification deleted", deleted });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await Education.deleteMany({});
    return res.json({ message: "All qualifications removed", result });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

const educationByID = async (req, res, next, id) => {
  try {
    const doc = await Education.findById(id).exec();
    if (!doc) return res.status(404).json({ error: "Qualification not found" });
    req.education = doc;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve qualification" });
  }
};

export default { create, list, read, update, remove, removeAll, educationByID };
