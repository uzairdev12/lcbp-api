const express = require("express");
const {
  addgig,
  loadChunks,
  getusersgigs,
  getgigdetails,
  editgig,
  deletegig,
} = require("../Controllers/gigcontroller");
const router = express.Router();

router.post("/addgig", addgig);
router.post("/load", loadChunks);
router.post("/getgigs", getusersgigs);
router.post("/getgigdetails", getgigdetails);
router.post("/editgig", editgig);
router.post("/deletegig", deletegig);

module.exports = router;
