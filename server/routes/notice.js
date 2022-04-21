const router = require("express").Router();

// Controllers
const { addNotice, allNotices } = require("../controllers/notice");

// AuthMiddleware
const authMiddleware = require("../middlewares/auth");

// Routes
router.post("/addNotice", authMiddleware, addNotice);
router.post("/allNotices", authMiddleware, allNotices);

module.exports = router;
