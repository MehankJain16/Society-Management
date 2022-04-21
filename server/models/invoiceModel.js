const mongoose = require("mongoose");

// Backyard Sale Fields
// sellerId
// buyerId
// item
// price
// createdAt

const invoiceSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide seller id"],
    ref: "user",
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide buyer id"],
    ref: "user",
  },
  item: {
    type: String,
    required: [true, "Please provide item name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide item price"],
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    required: true,
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
});

const Invoice = new mongoose.model("invoice", invoiceSchema);

module.exports = Invoice;
