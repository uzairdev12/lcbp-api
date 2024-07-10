const express = require("express");
const { getTransactions } = require("../Controllers/transactioncontrollers");

const router = express.Router();
router.post("/get", getTransactions);

module.exports = router;
