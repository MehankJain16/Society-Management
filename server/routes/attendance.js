const router = require("express").Router();

// Controllers
const { addAttendance, viewAttendance } = require("../controllers/attendance");

// AuthMiddleware
const authMiddleware = require("../middlewares/auth");

// Routes
router.post("/addAttendance", authMiddleware, addAttendance);
router.post("/viewAttendance", authMiddleware, viewAttendance);

module.exports = router;
