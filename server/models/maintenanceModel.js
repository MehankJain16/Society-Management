const mongoose = require("mongoose");

// Maintenance Fields
// user
// month
// amount
// createdAt

const maintenanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is required"],
    ref: "user",
  },
  month: {
    type: String,
    required: [true, "Please provide month"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide amount"],
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
});

const Maintenance = new mongoose.model("maintenance", maintenanceSchema);

module.exports = Maintenance;
