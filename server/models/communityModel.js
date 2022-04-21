const { Schema, model } = require("mongoose");

// Community Fields
// user
// content
// upvotes
// downvotes
// createdAt

const communitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "Please provide user!"],
    ref: "user",
  },
  content: {
    type: String,
    required: [true, "Please provide content!"],
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "user", required: false }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "user", required: false }],
  createdAt: {
    type: Number,
    default: () => Date.now(),
  },
});

const Community = new model("community", communitySchema);

module.exports = Community;
