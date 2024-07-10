const express = require("express");
const {
  addplan,
  getplans,
  getPlanDetails,
  getUsersPlan,
  userplans,
  updatevalue,
  updatePlan,
  deletePlan,
} = require("../Controllers/planscontrollers");

const router = express.Router();

router.post("/addplan", addplan);
router.post("/plans", getplans);
router.post("/details", getPlanDetails);
router.post("/userplan", getUsersPlan);
router.post("/userplans", userplans);
router.post("/updateplan", updatePlan);
router.post("/deleteplan", deletePlan);

router.post("/updatevalue", updatevalue);

module.exports = router;
