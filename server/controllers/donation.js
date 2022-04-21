const Donation = require("../models/donationModel");
const _ = require("lodash");

exports.addDonation = async (req, res) => {
  const { flatNumber, foodItem, foodQnty } = req.body;
  if (req.user.role === "resident") {
    if (!flatNumber || !foodItem || !foodQnty) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide all the details!" });
    }
    try {
      await Donation.create({
        user: req.user.id,
        flatNumber,
        foodItem,
        foodQnty,
      });
      res.status(201).json({ success: true, error: null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

exports.getTotalDonation = async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const data = await Donation.find({});
      const donationData = _.groupBy(data, (el) => el.foodItem);
      res.status(200).json(donationData);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
