const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const StudentModel = require("./studentschema");
require("dotenv").config();

const db = process.env.MongoDb_URI;
mongoose.Promise = global.Promise;

mongoose
  .connect(db, null)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

router.get("/students", async function (req, res) {
  try {
    const students = await StudentModel.find({});
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send(err);
  }
  const { page = 1, limit = 5 } = req.query; // Phân trang
  try {
    const students = await Student.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Student.countDocuments();

    res.json({
      students,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/students/:id", async function (req, res) {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/students", async function (req, res) {
  const student = new StudentModel({
    StudentId: req.body.StudentId,
    Name: req.body.Name,
    PhoneNumber: req.body.PhoneNumber,
    Birthday: req.body.Birthday,
    Address: req.body.Address,
  });

  try {
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/students/:id", async function (req, res) {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }

    student.StudentId = req.body.StudentId;
    student.Name = req.body.Name;
    student.PhoneNumber = req.body.PhoneNumber;
    student.Birthday = req.body.Birthday;
    student.Address = req.body.Address;

    await student.save();
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/students/:id", async function (req, res) {
  try {
    const student = await StudentModel.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
