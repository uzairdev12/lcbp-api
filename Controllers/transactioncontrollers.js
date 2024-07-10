const transactionsmodel = require("../Models/transactionsmodel");

module.exports.getTransactions = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { username, limit } = req.body;
    const transactions = await transactionsmodel
      .find({ to: username })
      .sort({ _id: -1 })
      .limit(limit)
      .lean()
      .exec();

    res.status(200).json({ success: true, transactions });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
