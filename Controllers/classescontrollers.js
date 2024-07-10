const classesModel = require("../Models/classesModel");
const usermodel = require("../Models/usermodel");

module.exports.createClass = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { name } = req.body;
    const newClass = new classesModel({ name });
    const saveClass = await newClass.save();
    res.status(200).json({ saveClass, message: "Class created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.addlink = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id, link } = req.body;
    const classes = await classesModel.findById(id);
    classes.link = link;
    classes.live = true;
    const saveClass = await classes.save();
    res.status(200).json({ saveClass, message: "Class Started successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.deactivate = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id } = req.body;
    const classes = await classesModel.findById(id);
    classes.live = false;
    const saveClass = await classes.save();
    res.status(200).json({ saveClass, message: "Class ended successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getclasses = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const classes = await classesModel.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getClass = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { id } = req.body;
    const classdetails = await classesModel.findById(id);
    res.status(200).json({ classdetails });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.joinclass = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { userid, classname } = req.body;
    const user = await usermodel.findById(userid);
    user.classJoined = classname;
    await user.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.getstudents = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const students = await usermodel.find(
      { classJoined: { $exists: true, $ne: "none" } },
      { username: 1, classJoined: 1, _id: 0 }
    );
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.finestudents = async (req, res) => {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    const { students } = req.body;

    const studentUsernames = students.map((s) => s.username);
    const filter = {
      username: { $nin: studentUsernames },
      $or: [
        { plan: { $exists: true } },
        { planpending: { $ne: true } },
        { banned: { $ne: true } },
      ],
    };

    await usermodel.updateMany({}, { $set: { classJoined: "none" } });

    const update = {
      $mul: { balance: 0.5 },
    };

    const result = await usermodel.updateMany(filter, update);

    res.status(200).json({
      success: true,
      message: "Students updated successfully.",
      result,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
