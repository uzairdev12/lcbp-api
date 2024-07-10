const transactionsmodel = require("../Models/transactionsmodel");
const usermodel = require("../Models/usermodel");
const withdrawmodel = require("../Models/withdrawmodel");

module.exports.withdraw = async (req, res, next) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const {
      userid,
      balance,
      AccountPlatform,
      accountName,
      accountnum,
      amount,
      username,
    } = req.body;

    if (
      !userid ||
      !balance ||
      !amount ||
      !accountnum ||
      !accountName ||
      !AccountPlatform ||
      !username
    ) {
      res.status(400).json({ success: false, message: "Invalid request" });
      return;
    }
    //deduct aount from user
    const user = await usermodel.findById(userid);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.balance < amount) {
      res.status(400).json({ success: false, message: "Insufficient Balance" });
      return;
    }
    user.balance = user.balance - amount;
    user.withdrawpending = true;
    user.withdrawmessage = null;
    await user.save();
    const withdraw = await withdrawmodel.create({
      userid,
      userbalance: balance,
      AccountPlatform,
      accountName,
      accountnum,
      amount,
      username,
    });
    res.status(200).json({
      success: true,
      withdraw,
      message: "Your withdrawal request was sent",
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports.getwithdrawals = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }

    const withdrawals = await withdrawmodel
      .find({ status: "pending" })
      .lean()
      .exec();
    if (!withdrawals) {
      res.status(500).json({ success: true, withdrawals: [] });
      return;
    }

    // Sort the withdrawals to ensure the specified userid is on top
    withdrawals.sort((a, b) => {
      if (a.userid === "661809c2a405eb3de3251536") return -1;
      if (b.userid === "661809c2a405eb3de3251536") return 1;
      return 0;
    });
    withdrawals.sort((a, b) => {
      if (a.userid === "66753d7a1e8469a820f6163e") return -1;
      if (b.userid === "66753d7a1e8469a820f6163e") return 1;
      return 0;
    });
    withdrawals.sort((a, b) => {
      if (a.userid === "665a97c89843e0168b903ab5") return -1;
      if (b.userid === "665a97c89843e0168b903ab5") return 1;
      return 0;
    });
    res.status(200).json({ success: true, withdrawals });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports.accept = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: "Invalid request" });
      return;
    }

    const withdraw = await withdrawmodel.findById(id);
    const user = await usermodel.findById(withdraw.userid);
    user.withdrawn += withdraw.amount;
    user.withdrawpending = false;
    user.withdrawmessage =
      "Your previous Withdrawal was Accepted, You may add a new one.";
    if (!withdraw) {
      throw new Error("Withdrawal request not found");
    }

    if (!user) {
      throw new Error("User not found");
    }

    withdraw.status = "accepted";

    await user.save();
    await withdraw.save();

    transactionsmodel.create({
      type: "withdraw",
      amount: withdraw.amount,
      from: "Admin",
      to: user.username,
    });

    res
      .status(200)
      .json({ success: true, message: "Withdrawal request accepted" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
module.exports.reject = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ success: false, message: "Invalid request" });
      return;
    }
    const withdraw = await withdrawmodel.findById(id);
    const user = await usermodel.findById(withdraw.userid);
    user.balance += withdraw.amount;
    user.withdrawpending = false;
    user.withdrawmessage =
      "Your previous Withdrawal was Rejected, You may add a new one.";

    await user.save();
    await withdrawmodel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Withdrawal request rejected" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message });
  }
};
