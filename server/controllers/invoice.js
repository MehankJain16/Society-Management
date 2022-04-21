const Invoice = require("../models/invoiceModel");

exports.addInvoice = async (req, res) => {
  const { sellerId, buyerId, item, price, eventId } = req.body;
  if (!sellerId || !buyerId || !item || !price || !eventId) {
    return res
      .status(400)
      .json({ success: false, error: "Please enter all the details!" });
  }

  try {
    await Invoice.create({
      sellerId,
      buyerId,
      item,
      price,
      eventId,
    });

    res.status(201).json({ success: true, error: null });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.viewInvoice = async (req, res) => {
  const id = req.user.id;
  try {
    const data = await Invoice.find({
      $or: [{ sellerId: { $eq: id } }, { buyerId: { $eq: id } }],
    }).populate("sellerId buyerId eventId");
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
