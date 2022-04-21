const router = require("express").Router();
const multer = require("multer");

// Controllers
const {
  register,
  login,
  logout,
  user,
  loggedin,
  allusers,
  approve,
  uploadDocument,
  emergency,
} = require("../controllers/user");

// AuthMiddleware
const authMiddleware = require("../middlewares/auth");

// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.id + "-" + file.originalname);
  },
});

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/loggedin", loggedin);
router.post("/user", authMiddleware, user);
router.post("/allusers", authMiddleware, allusers);
router.post("/approve", authMiddleware, approve);
router.post(
  "/uploadDocument",
  authMiddleware,
  multer({ storage: storage }).single("image"),
  uploadDocument
);
router.post("/emergency", authMiddleware, emergency);

module.exports = router;
