const express = require("express");

const router = express.Router();

// Importing our student controllers
const {
  getAllStudents,
  getSingleStudent,
  addStudent,
  deleteStudent,
  updateStudent,
  getLexicalJSON
} = require("../controllers/students");

// Get all students
router.get("/", getLexicalJSON);

// Get one student
router.get("/:id", getSingleStudent);

// Add student
router.post("/", addStudent);

// Update one student
router.put("/:id", updateStudent);

// Delete one student
router.delete("/:id", deleteStudent);

// lexicalJSON Test
// router.delete("/lexicalJSON", getLexicalJSON);

module.exports = router;
