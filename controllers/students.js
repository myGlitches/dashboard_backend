const Student = require('../models/Student')
const { createHeadlessEditor } = require('@lexical/headless')
const { $generateHtmlFromNodes } = require('@lexical/html')
const { HeadingNode, QuoteNode } = require('@lexical/rich-text')
const { ListItemNode, ListNode } = require('@lexical/list')
const { TableCellNode, TableNode, TableRowNode } = require('@lexical/table')
const { CodeHighlightNode, CodeNode } = require('@lexical/code')
const { LinkNode } = require('@lexical/link')
const { HashtagNode } = require('@lexical/hashtag')
const { MentionNode } = require('./nodes/MentionNode')
const { InlineImageNode } = require('./nodes/InlineImageNode')
const { EmojiNode } = require('./nodes/EmojiNode')
const { ImageNode } = require('./nodes/ImageNode')

const { JSDOM } = require('jsdom')

const getLexicalJSON = async (req, res) => {
  try {
    const editor = createHeadlessEditor({
      namespace: 'Editor',
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        HashtagNode,
        LinkNode,
        MentionNode,
        InlineImageNode,
        EmojiNode,
        ImageNode,
      ],
      onError: () => {},
    })

    const jsonNew = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"hello world","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

    editor.setEditorState(editor.parseEditorState(jsonNew))

    editor.update(() => {
      try {
        const { window } = new JSDOM(``, { pretendToBeVisual: true })
        global.window = window
        global.document = window.document
        console.log('html: ' + $generateHtmlFromNodes(editor, null))
      } catch (error) {
        console.log(error)
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

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
  getLexicalJSON,
}
