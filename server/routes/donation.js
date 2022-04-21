const router = require("express").Router();

// Controllers
const { addDonation, getTotalDonation } = require("../controllers/donation");

// AuthMiddleware
const authMiddleware = require("../middlewares/auth");

// Routes
router.post("/addDonation", authMiddleware, addDonation);
router.post("/getTotalDonation", authMiddleware, getTotalDonation);

module.exports = router;
