const router = require("express").Router();

// Controllers
const {
  add,
  getAll,
  getOne,
  upvote,
  downvote,
} = require("../controllers/community");

// AuthMiddleware
const authMiddleware = require("../middlewares/auth");

// Routes
router.post("/add", authMiddleware, add);
router.post("/getAll", authMiddleware, getAll);
router.post("/getOne", authMiddleware, getOne);
router.post("/upvote", authMiddleware, upvote);
router.post("/downvote", authMiddleware, downvote);

module.exports = router;
