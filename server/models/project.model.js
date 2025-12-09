import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  firstname: {
    type: String,
    trim: true,
    required: "First name is required",
  },
  lastname: {
    type: String,
    trim: true,
    required: "Last name is required",
  },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  completion: {
    type: Date,
    required: "Completion date is required",
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

ProjectSchema.pre("save", function (next) {
  this.updated = Date.now();
  next();
});

export default mongoose.model("Project", ProjectSchema, "projects");
