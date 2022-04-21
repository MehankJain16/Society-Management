const Maintenance = require("../models/maintenanceModel");

exports.viewMaintenance = async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const records = await Maintenance.find({}).populate("user");
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

exports.payMaintenance = async (req, res) => {
  const { month, amount } = req.body;
  if (req.user.role === "resident") {
    if (!month || !amount) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter all the details!" });
    }
    try {
      const payMaintenance = await Maintenance.create({
        month,
        amount,
        user: req.user.id,
      });
      res.status(201).json({ success: true, error: null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
