const mongoose = require("mongoose");

// Donation Fields
// user
// flatNumber
// foodItem
// foodQnty
// createdAt

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is required"],
    ref: "user",
  },
  flatNumber: {
    type: Number,
    required: [true, "Please provide flat number!"],
  },
  foodItem: {
    type: String,
    required: [true, "Please provide food item!"],
    enum: {
      values: ["Rice", "Flour", "Biscuits", "Milk"],
      message: "Please add valid food item!",
    },
  },
  foodQnty: {
    type: Number,
    required: [true, "Please provide food quantity!"],
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
});

const Donation = new mongoose.model("dontaion", donationSchema);

module.exports = Donation;
