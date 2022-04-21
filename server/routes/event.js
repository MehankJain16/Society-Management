const router = require("express").Router();

// Controllers
const {
  addEvent,
  registerEvent,
  events,
  bookedEvents,
} = require("../controllers/event");

// AuthMiddleware
const authMiddleware = require("../middlewares/auth");

// Routes
router.post("/events", authMiddleware, events);
router.post("/addEvent", authMiddleware, addEvent);
router.post("/registerEvent", authMiddleware, registerEvent);
router.post("/bookedEvents", authMiddleware, bookedEvents);

module.exports = router;
