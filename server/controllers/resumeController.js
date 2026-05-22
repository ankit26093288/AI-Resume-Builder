const Resume = require("../models/Resume");

const createResume = async (req, res) => {

  try {

    const {
      fullName,
      email,
      skills,
      education,
      experience,
    } = req.body;

    const resume = await Resume.create({
      fullName,
      email,
      skills,
      education,
      experience,
    });

    res.status(201).json({
      message: "Resume Saved Successfully",
      resume,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

const getResumes = async (req, res) => {

  try {

    const resumes = await Resume.find();

    res.status(200).json(resumes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
const deleteResume = async (req, res) => {

  try {

    const { id } = req.params;

    await Resume.findByIdAndDelete(id);

    res.status(200).json({
      message: "Resume Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
const getResumeById = async (req, res) => {

  try {

    const { id } = req.params;

    const resume = await Resume.findById(id);

    res.status(200).json(resume);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
const updateResume = async (req, res) => {

  try {

    const { id } = req.params;

    const updatedResume =
      await Resume.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

    res.status(200).json({
      message: "Resume Updated",
      updatedResume,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
module.exports = {
  createResume,
  getResumes,
  deleteResume,
  getResumeById,
  updateResume,
};