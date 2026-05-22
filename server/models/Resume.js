const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  skills: {
    type: String,
  },

  education: {
    type: String,
  },

  experience: {
    type: String,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model("Resume", resumeSchema);