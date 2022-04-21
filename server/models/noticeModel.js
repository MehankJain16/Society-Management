const mongoose = require("mongoose");

// Notice Fields
// notice
// createdAt

const noticeSchema = new mongoose.Schema({
  notice: {
    type: String,
    required: [true, "Please provide notice"],
  },
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
});

const Notice = new mongoose.model("notice", noticeSchema);

module.exports = Notice;
