const router = require("express").Router();

// Controllers
const {
  updateDate,
  getDate,
  addGarbage,
  getTotalGarbageBins,
  clearGarbage,
} = require("../controllers/garbage");

// AuthMiddleware
const authMiddleware = require("../middlewares/auth");

// Routes
router.post("/updateDate", authMiddleware, updateDate);
router.post("/getDate", authMiddleware, getDate);
router.post("/addGarbage", authMiddleware, addGarbage);
router.post("/getTotalGarbageBins", authMiddleware, getTotalGarbageBins);
router.post("/clearGarbage", authMiddleware, clearGarbage);

module.exports = router;
