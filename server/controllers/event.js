const Event = require("../models/eventModel");
const User = require("../models/userModel");
const { sendmail } = require("../utility/sendmail");

exports.addEvent = async (req, res) => {
  const { title, desc, price, eventType, eventLength } = req.body;

  if (!title || !desc || price === null || price === undefined || !eventType) {
    return res
      .status(400)
      .json({ success: false, error: "Please enter all the details!" });
  }

  try {
    await Event.create({
      title,
      desc,
      price,
      eventType,
      eventLength,
      eventStart: req.body.eventStart,
      eventEnd: req.body.eventEnd,
      users: [],
      createdBy: req.user.id,
    });
    const usersData = await User.find({ _id: { $ne: req.user.id } });
    const emailList = usersData.map((el) => el.email);
    sendmail(emailList.join(","), "New Event added go check it in your app!");
    res.status(201).json({ success: true, error: null });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.registerEvent = async (req, res) => {
  const { id } = req.body;
  try {
    await Event.updateOne({ _id: id }, { $addToSet: { users: req.user.id } });
    return res.status(201).json({ success: true, error: null });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.events = async (req, res) => {
  try {
    const events = await Event.find({}).populate("createdBy");
    res.json(events);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.bookedEvents = async (req, res) => {
  try {
    const events = await Event.find({
      users: { $elemMatch: { $eq: req.user.id } },
    }).populate("createdBy");
    res.json(events);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
