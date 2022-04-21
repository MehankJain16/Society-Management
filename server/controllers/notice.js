const Notice = require("../models/noticeModel");

exports.addNotice = async (req, res) => {
  const { notice } = req.body;
  if (req.user.role === "admin") {
    if (!notice) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter all the details!" });
    }
    try {
      const newNotice = await Notice.create({ notice });
      res.status(201).json({ success: true, error: null });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};

exports.allNotices = async (req, res) => {
  try {
    const notices = await Notice.find({});
    res.json(notices);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
