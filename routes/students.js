const express = require('express')

const router = express.Router()

// Importing our student controllers
const {
  getAllStudents,
  getSingleStudent,
  addStudent,
  deleteStudent,
  updateStudent,
} = require('../controllers/students')

// Get all students
router.get('/', getAllStudents)

// Get one student
router.get('/:id', getSingleStudent)

// Add student
router.post('/', addStudent)

// Update one student
router.put('/:id', updateStudent)

// Delete one student
router.delete('/:id', deleteStudent)

module.exports = router
