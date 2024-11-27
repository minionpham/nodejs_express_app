const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    StudentId: Number,
    Name: String,
    PhoneNumber: String,
    Birthday: Date,
    Address: String
});

module.exports = mongoose.model(
    'student', StudentSchema, 'Students');