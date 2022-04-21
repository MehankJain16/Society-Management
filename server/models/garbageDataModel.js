const mongoose = require("mongoose");

// GarbageData Collection Fields
// user
// flatNumber
// garbageBins
// createdAt

const garbageSchema = new mongoose.Schema({
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

const GarbageData = new mongoose.model("garbagedata", garbageSchema);

module.exports = GarbageData;
