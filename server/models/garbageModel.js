const mongoose = require("mongoose");

// Garbage Collection Fields
// date
// user
// flatNumber
// garbageBins
// createdAt

const garbageSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Please provide date"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is required"],
    ref: "user",
  },
  flatNumber: {
    type: Number,
    required: [true, "Please provide flat number!"],
  },
  garbageBins: {
    type: Number,
    required: [true, "Please provide no of bins filled!"],
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
});

const Garbage = new mongoose.model("garbage", garbageSchema);

module.exports = Garbage;
