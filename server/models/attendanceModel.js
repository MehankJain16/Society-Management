const mongoose = require("mongoose");

// Attendance Fields
// date
// user

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Please provide date"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is required"],
    ref: "user",
  },
});

const Attendance = new mongoose.model("attendance", attendanceSchema);

module.exports = Attendance;
