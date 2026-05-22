const express = require("express");

const router = express.Router();

const {
  createResume,
    getResumes,
    deleteResume,
     getResumeById,
  updateResume,

} = require("../controllers/resumeController");

router.post("/create", createResume);
router.get("/all", getResumes);
router.delete("/delete/:id", deleteResume);
router.get("/:id", getResumeById);
router.put("/update/:id", updateResume);

module.exports = router;