import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String },
  technologies: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  projectUrl: { type: String },
  description: { type: String },
});

const Project = 
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;