const router = require("express").Router();

// Controllers
const { addInvoice, viewInvoice } = require("../controllers/invoice");

// AuthMiddleware
const authMiddleware = require("../middlewares/auth");

// Routes
router.post("/addInvoice", authMiddleware, addInvoice);
router.post("/viewInvoice", authMiddleware, viewInvoice);

module.exports = router;
