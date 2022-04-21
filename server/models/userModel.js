const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Fields
// name
// email
// pass
// createdAt
// role (resident, staff, admin, guest)
// flatNumber
// verificationDocument

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },

  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },

  passwordHash: {
    type: String,
    required: [true, "Please add a password"],
    select: false,
  },

  role: {
    type: String,
    required: [true, "Please select your role"],
    enum: {
      values: ["admin", "resident", "staff", "guest"],
      message: "Please add valid role!",
    },
  },

  status: {
    type: Boolean,
    default: false,
  },

  flatNumber: {
    type: Number,
  },

  verificationDocument: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
