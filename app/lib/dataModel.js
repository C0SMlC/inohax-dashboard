import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    teamName: String,
    teamLeaderName: String,
    teamLeaderPhone: String,
    teamLeaderEmail: String,
    teamMembers: [
      {
        name: { type: String, required: true },
      },
    ],

    projectDomain: String,
    projectLink: String,
  },
  { timestamps: true }
);

// Prevent duplicate model initialization
const Project =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Project;
