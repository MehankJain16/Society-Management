const Attendance = require("../models/attendanceModel");

exports.addAttendance = async (req, res) => {
  const { date } = req.body;
  if (req.user.role === "staff") {
    if (!date) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter all the details!" });
    }
    try {
      const markAttendance = await Attendance.create({
        date,
        user: req.user.id,
      });
      res.status(201).json({ success: true, error: null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

exports.viewAttendance = async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const records = await Attendance.find({}).populate("user");
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
