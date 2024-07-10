const express = require("express");
const {
  withdraw,
  getwithdrawals,
  accept,
  reject,
} = require("../Controllers/withdrawcontrollers");

const router = express.Router();

router.post("/add", withdraw);
router.get("/get", getwithdrawals);
router.post("/accept", accept);
router.post("/reject", reject);

module.exports = router;
