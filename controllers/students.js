const Student = require('../models/Student')

const getAllStudents = async (req, res) => {
  const students = await Student.find()
  console.log(students)

  res.status(200).json({
    success: true,
    data: students,
  })
}

const getSingleStudent = async (req, res) => {
  const studentId = req.params.id

  const student = await Student.findById(studentId)

  if (!student) {
    res.status(400).json({
      success: false,
      message: 'student with this ID does not exist',
    })
  }

  res.status(200).json({
    success: true,
    data: student,
  })
}

const addStudent = async (req, res) => {
  const studentInfo = req.body

  try {
    const student = await Student.create(studentInfo)

    res.status(201).json({
      success: true,
      message: 'student created successfully!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id
    const student = await Student.findOneAndDelete({
      _id: studentId,
    })
    console.log(student)

    res.status(200).json({
      success: true,
      message: 'student deleted successfully!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const updateStudent = async (req, res) => {
  try {
    const studentInfo = req.body

    const studentId = req.params.id
    const student = await Student.findByIdAndUpdate(studentId, studentInfo)

    res.status(200).json({
      success: true,
      message: 'student updated successfully!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  getAllStudents,
  getSingleStudent,
  addStudent,
  deleteStudent,
  updateStudent,
}
