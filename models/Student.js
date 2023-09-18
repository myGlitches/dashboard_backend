const mongoose = require("mongoose")

const StudentsSchema = mongoose.Schema({
  class: {
    type: Number,
    required: true
  }, 
  grade: {
    type: String,
    // required: true 
  },
  name: {
    type: String,
    required: true
  },
  is_passed: {
    type: Boolean,
    required: true
  }, 
  score: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Student', StudentsSchema)