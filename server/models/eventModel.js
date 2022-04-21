const mongoose = require("mongoose");

// Event Fields
// title
// desc
// price
// eventType (community hall, backyard sale, normal event)
// eventLength
// eventDate
// createdAt
// users (list of registered users)
// createdBy

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide event title"],
  },
  desc: {
    type: String,
    required: [true, "Please provide event description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide event price"],
  },
  eventType: {
    type: String,
    required: [true, "Please provide event type"],
    enum: {
      values: ["Community Hall", "Backyard Sale", "Society Event"],
      message: "Please select valid type!",
    },
  },
  eventLength: {
    type: String,
    required: [true, "Please provide event length"],
    enum: {
      values: ["All Day", "Signle Day", "Multiple Days"],
      message: "Please select valid length!",
    },
  },
  eventStart: {
    type: Date,
  },
  eventEnd: {
    type: Date,
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Createdby is required"],
    ref: "user",
  },
});

const Event = new mongoose.model("event", eventSchema);

module.exports = Event;
