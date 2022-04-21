const router = require("express").Router();

// Controllers
const {
  payMaintenance,
  viewMaintenance,
} = require("../controllers/maintenance");

// AuthMiddleware
const authMiddleware = require("../middlewares/auth");

// Routes
router.post("/payMaintenance", authMiddleware, payMaintenance);
router.post("/viewMaintenance", authMiddleware, viewMaintenance);

module.exports = router;
