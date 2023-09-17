const express = require("express");
const router = express.Router();
const studentsRouter = require("./students");

// Declaring student routes with middlewares
router.use("/students", studentsRouter);

module.exports = router;
