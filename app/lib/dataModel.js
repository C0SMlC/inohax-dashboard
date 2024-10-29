import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamLeaderName: { type: String, required: true },
  teamLeaderPhone: { type: String, required: true },
  teamLeaderEmail: { type: String, required: true },
  teamMembers: [
    {
      name: { type: String, required: true },
      socialMediaLink: { type: String, required: false },
    },
  ],
  projectDomain: { type: String, required: false },
  projectLink: { type: String, required: false },
  communityReferral: { type: String, required: false },
});

// Prevent duplicate model initialization
const Project =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Project;
