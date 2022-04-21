const Community = require("../models/communityModel");
const User = require("../models/userModel");
const { sendmail } = require("../utility/sendmail");

exports.getAll = async (req, res) => {
  try {
    const all = await Community.find({}).populate("user");
    return res.json(all);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getOne = async (req, res) => {
  const { id } = req.body;
  try {
    const one = await Community.findOne({ _id: id }).populate("user");
    return res.json(one);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.add = async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide all the details" });
  }

  try {
    const user = req.user.id;
    await Community.create({
      user,
      content,
      upvotes: [],
      downvotes: [],
    });
    const usersData = await User.find({ _id: { $ne: req.user.id } });
    const emailList = usersData.map((el) => el.email);
    sendmail(
      emailList.join(","),
      "New Community Post added go check it in your app!"
    );
    return res.status(201).json({ success: true, error: null });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.upvote = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide id of the post" });
  }

  try {
    // Check if the user has downvoted it already if yes remove from downvote and add it to upvote else only add to upvote
    const checkUpvote = await Community.findOne({
      upvotes: { $elemMatch: { $eq: req.user.id } },
    });

    if (checkUpvote) {
      await Community.updateOne(
        { _id: id },
        { $pull: { upvotes: req.user.id } }
      );
      return res.status(201).json({ success: true, error: "Upvote Removed!" });
    }

    const checkDownvote = await Community.findOne({
      downvotes: { $elemMatch: { $eq: req.user.id } },
    });

    if (checkDownvote) {
      await Community.updateOne(
        { _id: id },
        { $pull: { downvotes: req.user.id } }
      );
    }

    await Community.updateOne(
      { _id: id },
      { $addToSet: { upvotes: req.user.id } }
    );
    return res
      .status(201)
      .json({ success: true, error: "Upvoted Successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.downvote = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide id of the post" });
  }

  try {
    // Check if the user has downvoted it already if yes remove from downvote and add it to upvote else only add to upvote
    const checkDownvote = await Community.findOne({
      downvotes: { $elemMatch: { $eq: req.user.id } },
    });

    if (checkDownvote) {
      await Community.updateOne(
        { _id: id },
        { $pull: { downvotes: req.user.id } }
      );
      return res
        .status(201)
        .json({ success: true, error: "Downvote Removed!" });
    }

    const checkUpvote = await Community.findOne({
      upvotes: { $elemMatch: { $eq: req.user.id } },
    });

    if (checkUpvote) {
      await Community.updateOne(
        { _id: id },
        { $pull: { upvotes: req.user.id } }
      );
    }

    await Community.updateOne(
      { _id: id },
      { $addToSet: { downvotes: req.user.id } }
    );
    return res
      .status(201)
      .json({ success: true, error: "Downvoted Successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
