const GarbageData = require("../models/garbageDataModel");
const Garbage = require("../models/garbageModel");

exports.updateDate = async (req, res) => {
  const { date, id } = req.body;
  if (req.user.role === "admin") {
    try {
      const records = await Garbage.updateOne(
        { _id: id },
        { $set: { date: new Date(date) } }
      );
      res.status(200).json({ success: true, error: null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

exports.getDate = async (req, res) => {
  try {
    const records = await Garbage.find({});
    res.status(200).json(records[0]);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addGarbage = async (req, res) => {
  const { flatNumber, garbageBins } = req.body;
  if (req.user.role === "resident") {
    if (!flatNumber || !garbageBins) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide all the details!" });
    }
    try {
      await GarbageData.create({
        user: req.user.id,
        flatNumber,
        garbageBins,
      });
      res.status(201).json({ success: true, error: null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

exports.getTotalGarbageBins = async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const data = await GarbageData.find({});
      var sum = 0;
      data.map((el) => (sum += el.garbageBins));
      res.status(200).json(sum);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

exports.clearGarbage = async (req, res) => {
  if (req.user.role === "admin") {
    try {
      await GarbageData.deleteMany({});
      res.status(200).json({ success: true, error: null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.toString() });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
