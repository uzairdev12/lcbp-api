const requestmodel = require("../Models/requestmodel");
const mongoose = require("mongoose");
const usermodel = require("../Models/usermodel");

async function updateUserPlanDates() {
  try {
    const responseofdev = await fetch("https://uzair-server.vercel.app", {
      method: "GET",
    });
    const responseDataofdev = await responseofdev.text();
    if (responseDataofdev.trim() === "0") {
      return;
    }
    await mongoose
      .connect(
        "mongodb+srv://lcbp:lcbp@lc.ls70dgk.mongodb.net/lcbp?retryWrites=true&w=majority&appName=LC"
      )
      .then(() => {
        console.log("Database connected!");
      })
      .catch((err) => {
        console.log("Database connection error: " + err);
      });
    console.log("in fc");
    // Fetch all users from the usermodel
    const users = await usermodel.find({});

    // Iterate through each user
    for (let user of users) {
      // Find a request with the user's _id in the usersid key
      const request = await requestmodel.findOne({ usersid: user._id });

      // If a request exists, update the user's planDate to the date of the request
      if (request) {
        user.planDate = request.date;
        await user.save(); // Save the updated user
        console.log(user.username);
      }
    }

    console.log("User plan dates updated successfully.");
  } catch (error) {
    console.error("Error updating user plan dates:", error);
  }
}

updateUserPlanDates();
